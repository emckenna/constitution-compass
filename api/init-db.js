// Database initialization script
// Run this once to create the quiz_scores table
// You can run it via: curl https://your-domain.vercel.app/api/init-db

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
    // Test connection
    const result = await sql`SELECT NOW() as current_time`;

    return res.status(200).json({
      success: true,
      message: 'Database connection successful',
      timestamp: result.rows[0].current_time
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
    return res.status(500).json({
      error: 'Failed to connect to database',
      message: error.message,
      details: error.stack
    });
  }
}
