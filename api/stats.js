import { sql } from '@vercel/postgres';

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

    // Add filters if provided
    const conditions = [];
    if (difficulty) {
      conditions.push(sql`difficulty = ${difficulty}`);
    }
    if (region) {
      conditions.push(sql`region = ${region}`);
    }

    // Combine conditions with WHERE clause
    if (conditions.length > 0) {
      query = sql`${query} WHERE ${sql.join(conditions, sql` AND `)}`;
    }

    // Group by region, country, and difficulty
    query = sql`
      ${query}
      GROUP BY region, country, difficulty
      ORDER BY total_attempts DESC, avg_score DESC
      LIMIT ${parseInt(limit)}
    `;

    const result = await query;

    // Also get overall statistics
    const overallStats = await sql`
      SELECT
        COUNT(*) as total_scores,
        COUNT(DISTINCT region) as total_regions,
        ROUND(AVG(score)::numeric, 2) as overall_avg_score
      FROM quiz_scores
      ${difficulty ? sql`WHERE difficulty = ${difficulty}` : sql``}
    `;

    return res.status(200).json({
      success: true,
      overall: overallStats.rows[0],
      regional: result.rows,
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
