#!/usr/bin/env node

/**
 * Post Constitutional Fact to X/Twitter
 *
 * Usage: node scripts/post-fact.js
 *
 * Reads data/constitutional-facts.yaml, finds first unposted fact, posts to X, marks as posted
 * Called by GitHub Actions 5x daily at optimal US times
 */

const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

async function postFact() {
  console.log('📜 Posting constitutional fact to X...\n');

  // Check for required env vars
  const required = ['TWITTER_API_KEY', 'TWITTER_API_SECRET', 'TWITTER_ACCESS_TOKEN', 'TWITTER_ACCESS_SECRET'];
  for (const key of required) {
    if (!process.env[key]) {
      console.error(`❌ Error: ${key} not found in environment`);
      process.exit(1);
    }
  }

  try {
    // Initialize Twitter client
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET,
    });

    // Read the YAML file
    const yamlPath = path.join(__dirname, '..', 'data', 'constitutional-facts.yaml');

    if (!fs.existsSync(yamlPath)) {
      console.error('❌ Error: constitutional-facts.yaml not found');
      console.error('Run: node scripts/generate-facts.js');
      process.exit(1);
    }

    const fileContents = fs.readFileSync(yamlPath, 'utf8');
    const data = yaml.load(fileContents);

    // Find the first unposted fact
    const unpostedFact = data.facts.find(fact => !fact.posted);

    if (!unpostedFact) {
      console.log('⚠️  No unposted facts available');
      console.log('Run: node scripts/generate-facts.js');
      process.exit(0);
    }

    console.log(`📝 Fact #${unpostedFact.id}: ${unpostedFact.text.substring(0, 60)}...`);

    // Build the tweet
    let tweetText = `📜 ${unpostedFact.text}`;

    // Add citation if available
    if (unpostedFact.citation && unpostedFact.citationUrl) {
      tweetText += `\n\n${unpostedFact.citation}\n${unpostedFact.citationUrl}`;
    }

    // Add app link and hashtags
    tweetText += `\n\n🧭 constitution-compass.vercel.app\n\n#Constitution #CivicEducation #USHistory`;

    // Check length
    if (tweetText.length > 280) {
      console.warn(`⚠️  Tweet too long (${tweetText.length} chars), truncating...`);
      // Simplified version if too long
      tweetText = `📜 ${unpostedFact.text}\n\n🧭 constitution-compass.vercel.app\n\n#Constitution`;

      if (tweetText.length > 280) {
        // Still too long, truncate the fact text
        const maxLength = 200;
        const truncated = unpostedFact.text.substring(0, maxLength) + '...';
        tweetText = `📜 ${truncated}\n\n🧭 constitution-compass.vercel.app\n\n#Constitution`;
      }
    }

    console.log(`\n📤 Posting tweet (${tweetText.length} chars):\n`);
    console.log(tweetText);
    console.log('\n');

    // Post the tweet
    const tweet = await client.v2.tweet(tweetText);

    console.log(`✅ Posted! Tweet ID: ${tweet.data.id}`);
    console.log(`🔗 https://twitter.com/USConstCompass/status/${tweet.data.id}`);

    // Mark fact as posted
    unpostedFact.posted = true;
    unpostedFact.postedAt = new Date().toISOString();

    // Write back to YAML file
    const updatedYaml = yaml.dump(data, {
      lineWidth: -1, // Don't wrap lines
      noRefs: true   // Don't use anchors/aliases
    });
    fs.writeFileSync(yamlPath, updatedYaml, 'utf8');

    console.log(`\n💾 Updated ${yamlPath}`);
    console.log(`📊 Remaining facts: ${data.facts.filter(f => !f.posted).length}`);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.data) {
      console.error('Twitter API Error:', JSON.stringify(error.data, null, 2));
    }
    process.exit(1);
  }
}

// Run it
postFact();
