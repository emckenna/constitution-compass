// Post daily Constitution question to X
// Called by GitHub Actions at 12:00 PM daily

import { TwitterApi } from 'twitter-api-v2';
import { neon } from '@neondatabase/serverless';
import { allQuestions } from '../src/data/questions.js';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify secret token (prevents unauthorized calls)
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Initialize X API client
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET,
    });

    // Select a random multiple choice question
    const multipleChoiceQuestions = allQuestions.filter(q => q.type === 'multiple_choice');
    const randomQuestion = multipleChoiceQuestions[
      Math.floor(Math.random() * multipleChoiceQuestions.length)
    ];

    // Format question for X (280 char limit)
    const optionLabels = ['A', 'B', 'C', 'D'];
    const optionsText = randomQuestion.options
      .map((opt, idx) => `${optionLabels[idx]}) ${opt}`)
      .join('\n');

    const tweetText = `📜 Daily Constitution Quiz\n\n${randomQuestion.question}\n\n${optionsText}\n\n🤔 Take a guess!\n\n#Constitution #Civics`;

    // Check if tweet exceeds 280 characters
    if (tweetText.length > 280) {
      // Fallback to shorter format
      const shortOptions = randomQuestion.options
        .map((opt, idx) => `${optionLabels[idx]}) ${opt}`)
        .slice(0, 2)
        .join(' | ');

      const shortTweet = `📜 Constitution Quiz\n\n${randomQuestion.question}\n\n${shortOptions}\n\n#Constitution`;

      if (shortTweet.length > 280) {
        throw new Error('Question too long for tweet');
      }
    }

    // Post tweet
    const tweet = await client.v2.tweet(tweetText);

    // Save to database
    const correctAnswer = randomQuestion.options[randomQuestion.correctIndex];
    await sql`
      INSERT INTO daily_tweets (
        question_tweet_id,
        question_text,
        correct_answer,
        explanation,
        status
      ) VALUES (
        ${tweet.data.id},
        ${randomQuestion.question},
        ${correctAnswer},
        ${randomQuestion.explanation},
        'question_posted'
      )
    `;

    return res.status(200).json({
      success: true,
      tweet_id: tweet.data.id,
      tweet_url: `https://x.com/USConstCompass/status/${tweet.data.id}`,
      message: 'Question posted successfully'
    });

  } catch (error) {
    console.error('Error posting question:', error);
    return res.status(500).json({
      error: 'Failed to post question',
      message: error.message
    });
  }
}
