// Database initialization script
// Run this once to create the quiz_scores table
// You can run it via: curl https://your-domain.vercel.app/api/init-db

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
    // Create quiz_scores table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS quiz_scores (
        id SERIAL PRIMARY KEY,
        region VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        score DECIMAL(3,2) NOT NULL CHECK (score >= 0 AND score <= 1),
        difficulty VARCHAR(50) NOT NULL,
        ip_address VARCHAR(45),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create indexes for quiz_scores
    await sql`CREATE INDEX IF NOT EXISTS idx_quiz_scores_region ON quiz_scores(region)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_quiz_scores_difficulty ON quiz_scores(difficulty)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_quiz_scores_created_at ON quiz_scores(created_at)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_quiz_scores_ip_address ON quiz_scores(ip_address)`;

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

    // Create indexes for daily_tweets
    await sql`CREATE INDEX IF NOT EXISTS idx_daily_tweets_status ON daily_tweets(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_daily_tweets_posted_at ON daily_tweets(posted_at)`;

    return res.status(200).json({
      success: true,
      message: 'Database initialized successfully'
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
