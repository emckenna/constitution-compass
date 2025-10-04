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
    // Create quiz_scores table with indexes in a single transaction
    const result = await sql`
      CREATE TABLE IF NOT EXISTS quiz_scores (
        id SERIAL PRIMARY KEY,
        region VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        score DECIMAL(3,2) NOT NULL CHECK (score >= 0 AND score <= 1),
        difficulty VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_quiz_scores_region ON quiz_scores(region);
      CREATE INDEX IF NOT EXISTS idx_quiz_scores_difficulty ON quiz_scores(difficulty);
      CREATE INDEX IF NOT EXISTS idx_quiz_scores_created_at ON quiz_scores(created_at);
    `;

    return res.status(200).json({
      success: true,
      message: 'Database initialized successfully',
      table: 'quiz_scores created with indexes'
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    return res.status(500).json({
      error: 'Failed to initialize database',
      message: error.message,
      details: error.stack
    });
  }
}
