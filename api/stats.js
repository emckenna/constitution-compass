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

    // Exclude owner's IP address from analytics
    const OWNER_IP = '108.48.37.101';

    // Build the base query for regional statistics
    let query = sql`
      SELECT
        region,
        country,
        difficulty,
        COUNT(*) as total_attempts,
        ROUND(AVG(score)::numeric, 2) as avg_score,
        ROUND(MIN(score)::numeric, 2) as min_score,
        ROUND(MAX(score)::numeric, 2) as max_score
      FROM quiz_scores
    `;

    // Add filters (always exclude owner IP)
    const conditions = [sql`(ip_address IS NULL OR ip_address != ${OWNER_IP})`];

    if (difficulty) {
      conditions.push(sql`difficulty = ${difficulty}`);
    }
    if (region) {
      conditions.push(sql`region = ${region}`);
    }

    // Combine conditions with WHERE clause
    query = sql`${query} WHERE ${sql.join(conditions, sql` AND `)}`;

    // Group by region, country, and difficulty
    query = sql`
      ${query}
      GROUP BY region, country, difficulty
      ORDER BY total_attempts DESC, avg_score DESC
      LIMIT ${parseInt(limit)}
    `;

    const result = await query;

    // Also get overall statistics (excluding owner IP)
    const overallStats = await sql`
      SELECT
        COUNT(*) as total_scores,
        COUNT(DISTINCT region) as total_regions,
        ROUND(AVG(score)::numeric, 2) as overall_avg_score
      FROM quiz_scores
      WHERE (ip_address IS NULL OR ip_address != ${OWNER_IP})
      ${difficulty ? sql`AND difficulty = ${difficulty}` : sql``}
    `;

    // Get difficulty breakdown
    const difficultyStats = await sql`
      SELECT
        difficulty,
        COUNT(*) as total_attempts,
        ROUND(AVG(score)::numeric, 2) as avg_score
      FROM quiz_scores
      WHERE (ip_address IS NULL OR ip_address != ${OWNER_IP})
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
