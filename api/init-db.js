// Database initialization script
// Run this once to create the quiz_scores table
// You can run it via: curl https://your-domain.vercel.app/api/init-db

import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    // Create quiz_scores table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS quiz_scores (
        id SERIAL PRIMARY KEY,
        region VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        score DECIMAL(3,2) NOT NULL CHECK (score >= 0 AND score <= 1),
        difficulty VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create index on region for faster queries
    await sql`
      CREATE INDEX IF NOT EXISTS idx_quiz_scores_region
      ON quiz_scores(region)
    `;

    // Create index on difficulty for faster queries
    await sql`
      CREATE INDEX IF NOT EXISTS idx_quiz_scores_difficulty
      ON quiz_scores(difficulty)
    `;

    // Create index on created_at for time-based queries
    await sql`
      CREATE INDEX IF NOT EXISTS idx_quiz_scores_created_at
      ON quiz_scores(created_at)
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
      message: error.message
    });
  }
}
