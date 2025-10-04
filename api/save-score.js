import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { region, country, score, difficulty } = req.body;

    if (!region || score === undefined || !difficulty) {
      return res.status(400).json({ error: 'Missing required fields: region, score, difficulty' });
    }

    // Validate score is between 0 and 1
    if (score < 0 || score > 1) {
      return res.status(400).json({ error: 'Score must be between 0 and 1' });
    }

    const scoreValue = parseFloat(score.toFixed(2));
    const countryValue = country || 'Unknown';

    // Get the user's IP address
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0] : req.connection.remoteAddress;
    const ipAddress = ip === '::1' || ip === '127.0.0.1' ? null : ip;

    // Insert score into Postgres database
    const result = await sql`
      INSERT INTO quiz_scores (region, country, score, difficulty, ip_address)
      VALUES (${region}, ${countryValue}, ${scoreValue}, ${difficulty}, ${ipAddress})
      RETURNING id, region, country, score, difficulty, ip_address, created_at
    `;

    return res.status(200).json({
      success: true,
      message: 'Score saved successfully',
      data: result[0]
    });
  } catch (error) {
    console.error('Error saving score:', error);

    // If table doesn't exist, provide helpful error message
    if (error.message && error.message.includes('relation "quiz_scores" does not exist')) {
      return res.status(500).json({
        error: 'Database not initialized',
        message: 'Please run /api/init-db to create the database table first',
        details: error.message
      });
    }

    return res.status(500).json({
      error: 'Failed to save score',
      message: error.message
    });
  }
}
