// Post answer to today's Constitution question on X
// Called by Vercel Cron at 2:00 PM EST (19:00 UTC) daily (2 hours after question)

import { TwitterApi } from 'twitter-api-v2';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // Vercel Cron sends GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Initialize X API client
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET,
    });

    // Get the most recent unanswered question from database
    const result = await sql`
      SELECT *
      FROM daily_tweets
      WHERE status = 'question_posted'
        AND answer_tweet_id IS NULL
      ORDER BY posted_at DESC
      LIMIT 1
    `;

    if (result.length === 0) {
      return res.status(404).json({
        error: 'No unanswered question found'
      });
    }

    const questionRecord = result[0];

    // Format answer tweet
    const answerText = `✅ Answer: ${questionRecord.correct_answer}\n\n${questionRecord.explanation} 🇺🇸\n\nWant to test your Constitutional knowledge?\nTake the full quiz → constitution-compass.vercel.app\n\n#USHistory #CivicEducation`;

    // Check length
    if (answerText.length > 280) {
      // Shorter fallback
      const shortAnswer = `✅ Answer: ${questionRecord.correct_answer}\n\n${questionRecord.explanation}\n\nTake the quiz: constitution-compass.vercel.app\n\n#Constitution`;

      if (shortAnswer.length > 280) {
        throw new Error('Answer too long for tweet');
      }
    }

    // Reply to the original question tweet
    const answerTweet = await client.v2.reply(
      answerText,
      questionRecord.question_tweet_id
    );

    // Update database
    await sql`
      UPDATE daily_tweets
      SET answer_tweet_id = ${answerTweet.data.id},
          answered_at = NOW(),
          status = 'answered'
      WHERE question_tweet_id = ${questionRecord.question_tweet_id}
    `;

    return res.status(200).json({
      success: true,
      answer_tweet_id: answerTweet.data.id,
      answer_tweet_url: `https://x.com/USConstCompass/status/${answerTweet.data.id}`,
      message: 'Answer posted successfully'
    });

  } catch (error) {
    console.error('Error posting answer:', error);
    return res.status(500).json({
      error: 'Failed to post answer',
      message: error.message
    });
  }
}
