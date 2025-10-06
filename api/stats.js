import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get query parameters
    const { difficulty, region, limit = '50' } = req.query;

    // Exclude blacklisted IPs from analytics (e.g., owner's IP for testing)
    const BLACKLIST_IPS = process.env.BLACKLIST_IPS
      ? process.env.BLACKLIST_IPS.split(',').map(ip => ip.trim()).filter(ip => ip.length > 0)
      : [];

    // Helper to build IP exclusion condition
    const getIpFilter = () => {
      if (BLACKLIST_IPS.length === 0) {
        return sql`1=1`; // No filter if no blacklist
      }
      return sql`(ip_address IS NULL OR ip_address NOT IN ${sql(BLACKLIST_IPS)})`;
    };

    // Build the query for regional statistics
    let result;
    if (difficulty && region) {
      result = await sql`
        SELECT
          region,
          country,
          difficulty,
          COUNT(*) as total_attempts,
          ROUND(AVG(score)::numeric, 2) as avg_score,
          ROUND(MIN(score)::numeric, 2) as min_score,
          ROUND(MAX(score)::numeric, 2) as max_score
        FROM quiz_scores
        WHERE ${getIpFilter()}
          AND difficulty = ${difficulty}
          AND region = ${region}
        GROUP BY region, country, difficulty
        ORDER BY total_attempts DESC, avg_score DESC
        LIMIT ${parseInt(limit)}
      `;
    } else if (difficulty) {
      result = await sql`
        SELECT
          region,
          country,
          difficulty,
          COUNT(*) as total_attempts,
          ROUND(AVG(score)::numeric, 2) as avg_score,
          ROUND(MIN(score)::numeric, 2) as min_score,
          ROUND(MAX(score)::numeric, 2) as max_score
        FROM quiz_scores
        WHERE ${getIpFilter()}
          AND difficulty = ${difficulty}
        GROUP BY region, country, difficulty
        ORDER BY total_attempts DESC, avg_score DESC
        LIMIT ${parseInt(limit)}
      `;
    } else if (region) {
      result = await sql`
        SELECT
          region,
          country,
          difficulty,
          COUNT(*) as total_attempts,
          ROUND(AVG(score)::numeric, 2) as avg_score,
          ROUND(MIN(score)::numeric, 2) as min_score,
          ROUND(MAX(score)::numeric, 2) as max_score
        FROM quiz_scores
        WHERE ${getIpFilter()}
          AND region = ${region}
        GROUP BY region, country, difficulty
        ORDER BY total_attempts DESC, avg_score DESC
        LIMIT ${parseInt(limit)}
      `;
    } else {
      result = await sql`
        SELECT
          region,
          country,
          difficulty,
          COUNT(*) as total_attempts,
          ROUND(AVG(score)::numeric, 2) as avg_score,
          ROUND(MIN(score)::numeric, 2) as min_score,
          ROUND(MAX(score)::numeric, 2) as max_score
        FROM quiz_scores
        WHERE ${getIpFilter()}
        GROUP BY region, country, difficulty
        ORDER BY total_attempts DESC, avg_score DESC
        LIMIT ${parseInt(limit)}
      `;
    }

    // Also get overall statistics (excluding blacklisted IPs)
    const overallStats = await sql`
      SELECT
        COUNT(*) as total_scores,
        COUNT(DISTINCT region) as total_regions,
        ROUND(AVG(score)::numeric, 2) as overall_avg_score
      FROM quiz_scores
      WHERE ${getIpFilter()}
      ${difficulty ? sql`AND difficulty = ${difficulty}` : sql``}
    `;

    // Get difficulty breakdown
    const difficultyStats = await sql`
      SELECT
        difficulty,
        COUNT(*) as total_attempts,
        ROUND(AVG(score)::numeric, 2) as avg_score
      FROM quiz_scores
      WHERE ${getIpFilter()}
      GROUP BY difficulty
      ORDER BY
        CASE difficulty
          WHEN 'easy' THEN 1
          WHEN 'medium' THEN 2
          WHEN 'hard' THEN 3
        END
    `;

    return res.status(200).json({
      success: true,
      overall: overallStats[0],
      byDifficulty: difficultyStats,
      regional: result,
      filters: {
        difficulty: difficulty || 'all',
        region: region || 'all',
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);

    if (error.message && error.message.includes('relation "quiz_scores" does not exist')) {
      return res.status(500).json({
        error: 'Database not initialized',
        message: 'Please run /api/init-db to create the database table first',
        details: error.message
      });
    }

    return res.status(500).json({
      error: 'Failed to fetch statistics',
      message: error.message
    });
  }
}
