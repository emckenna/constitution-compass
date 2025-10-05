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
    const changes = [];

    // Add ip_address column if it doesn't exist
    await sql`
      ALTER TABLE quiz_scores
      ADD COLUMN IF NOT EXISTS ip_address VARCHAR(45)
    `;
    changes.push('Added ip_address column to quiz_scores');

    // Create index on ip_address
    await sql`CREATE INDEX IF NOT EXISTS idx_quiz_scores_ip_address ON quiz_scores(ip_address)`;
    changes.push('Created index on ip_address');

    // Create daily_tweets table for tracking X posts
    await sql`
      CREATE TABLE IF NOT EXISTS daily_tweets (
        id SERIAL PRIMARY KEY,
        question_tweet_id VARCHAR(255) NOT NULL UNIQUE,
        answer_tweet_id VARCHAR(255),
        question_text TEXT NOT NULL,
        correct_answer VARCHAR(255) NOT NULL,
        explanation TEXT,
        posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        answered_at TIMESTAMP,
        status VARCHAR(50) DEFAULT 'question_posted'
      )
    `;
    changes.push('Created daily_tweets table');

    // Create indexes for daily_tweets
    await sql`CREATE INDEX IF NOT EXISTS idx_daily_tweets_status ON daily_tweets(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_daily_tweets_posted_at ON daily_tweets(posted_at)`;
    changes.push('Created indexes on daily_tweets table');

    return res.status(200).json({
      success: true,
      message: 'Migration completed successfully',
      changes
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
