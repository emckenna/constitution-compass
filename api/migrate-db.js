// Database migration script
// Run this to add ip_address column to existing quiz_scores table
// You can run it via: curl https://your-domain.vercel.app/api/migrate-db

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
    // Add ip_address column if it doesn't exist
    await sql`
      ALTER TABLE quiz_scores
      ADD COLUMN IF NOT EXISTS ip_address VARCHAR(45)
    `;

    // Create index on ip_address
    await sql`CREATE INDEX IF NOT EXISTS idx_quiz_scores_ip_address ON quiz_scores(ip_address)`;

    return res.status(200).json({
      success: true,
      message: 'Migration completed successfully',
      changes: ['Added ip_address column', 'Created index on ip_address']
    });
  } catch (error) {
    console.error('Error running migration:', error);
    return res.status(500).json({
      error: 'Failed to run migration',
      message: error.message,
      details: error.stack
    });
  }
}
