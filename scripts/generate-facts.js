#!/usr/bin/env node

/**
 * Generate Constitutional Facts for X/Twitter Posts
 *
 * Usage: node scripts/generate-facts.js
 *
 * Generates 200 constitutional facts using Gemini AI (in batches of 50) and saves them to data/constitutional-facts.yaml
 * Run this manually when you want to refresh the facts for the month.
 */

const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function generateFactsBatch(client, batchNum, batchSize) {
  console.log(`📡 Generating batch ${batchNum} (${batchSize} facts)...`);

  const prompt = `Generate exactly ${batchSize} interesting and educational facts about the U.S. Constitution.

Requirements:
- Each fact should be concise (under 240 characters to fit X/Twitter with room for hashtags)
- Mix of facts about: Articles, Amendments, Founding Fathers, historical context, lesser-known provisions, interesting trivia
- Make them engaging and shareable for social media
- Ensure factual accuracy
- Vary the tone: some serious, some interesting/surprising
- Include Bluebook citations where applicable (e.g., "U.S. Const. art. I, § 8")
- Include URLs to constitution.congress.gov where applicable
- DO NOT include hashtags, emojis, or app URLs in the fact text (we'll add those when posting)
- DO NOT include citations in the fact text itself - put them in the citation field

CRITICAL: Return ONLY valid JSON. No markdown, no code blocks, no extra text.
Escape all quotes in text with backslash. No line breaks in text fields.

{
  "facts": [
    {
      "text": "The Constitution was signed on September 17, 1787, now celebrated as Constitution Day.",
      "citation": "U.S. Const.",
      "citationUrl": "https://constitution.congress.gov/"
    }
  ]
}`;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: prompt
    });

    const text = response.text;

    // Parse response
    let parsedResponse;
    try {
      // Remove markdown code blocks if present
      const cleanedText = text
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsedResponse = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('❌ Failed to parse batch', batchNum);
      console.error('Raw response (first 500 chars):', text.substring(0, 500));
      throw parseError;
    }

    // Validate
    if (!parsedResponse.facts || !Array.isArray(parsedResponse.facts)) {
      throw new Error('Invalid response format: expected facts array');
    }

    console.log(`✅ Batch ${batchNum}: Generated ${parsedResponse.facts.length} facts`);
    return parsedResponse.facts;

  } catch (error) {
    console.error(`❌ Error in batch ${batchNum}:`, error.message);
    throw error;
  }
}

async function generateFacts() {
  console.log('🏛️  Generating 200 Constitutional Facts...\n');

  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ Error: GEMINI_API_KEY not found in .env.local');
    process.exit(1);
  }

  const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const TOTAL_FACTS = 200;
  const BATCH_SIZE = 25; // Smaller batches to avoid JSON parsing issues
  const NUM_BATCHES = TOTAL_FACTS / BATCH_SIZE;

  let allFacts = [];

  try {
    // Generate in batches
    for (let i = 1; i <= NUM_BATCHES; i++) {
      const batchFacts = await generateFactsBatch(client, i, BATCH_SIZE);
      allFacts = allFacts.concat(batchFacts);

      // Wait 2 seconds between batches to avoid rate limiting
      if (i < NUM_BATCHES) {
        console.log('⏳ Waiting 2 seconds before next batch...\n');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.log(`\n✅ Total facts generated: ${allFacts.length}`);

    // Convert to YAML
    const yaml = generateYAML(allFacts);

    // Save to file
    const dataDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const outputPath = path.join(dataDir, 'constitutional-facts.yaml');
    fs.writeFileSync(outputPath, yaml, 'utf8');

    console.log(`💾 Saved to: ${outputPath}`);
    console.log(`\n🎉 Done! Ready to post to @USConstCompass`);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

function generateYAML(facts) {
  let yaml = '# Constitutional Facts for X/Twitter Posts\n';
  yaml += '# Generated: ' + new Date().toISOString() + '\n';
  yaml += '# Total Facts: ' + facts.length + '\n';
  yaml += '# \n';
  yaml += '# Each fact has:\n';
  yaml += '#   - id: unique identifier\n';
  yaml += '#   - text: the fact content (under 240 chars)\n';
  yaml += '#   - citation: Bluebook citation (optional)\n';
  yaml += '#   - citationUrl: link to source (optional)\n';
  yaml += '#   - posted: whether this fact has been posted\n';
  yaml += '#   - postedAt: timestamp when posted\n';
  yaml += '\n';
  yaml += 'facts:\n';

  facts.forEach((fact, index) => {
    yaml += `  - id: ${index + 1}\n`;
    yaml += `    text: "${fact.text.replace(/"/g, '\\"').replace(/\n/g, ' ')}"\n`;
    if (fact.citation) {
      yaml += `    citation: "${fact.citation}"\n`;
    }
    if (fact.citationUrl) {
      yaml += `    citationUrl: "${fact.citationUrl}"\n`;
    }
    yaml += `    posted: false\n`;
    yaml += `    postedAt: null\n`;
    yaml += '\n';
  });

  return yaml;
}

// Run it
generateFacts();
