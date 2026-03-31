/**
 * Recipe: Profile Tweets from X (Twitter)
 * Scrapes recent tweets from a user's profile.
 *
 * URL: https://x.com/{username}
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx x/profile_tweets.ts VitalikButerin
 *   npx tsx x/profile_tweets.ts ethereum
 */

import "dotenv/config";
import { browseX, parseTweets, type Tweet } from "./utils.js";

export { parseTweets };

async function main() {
  const username = process.argv[2] || "VitalikButerin";
  const count = parseInt(process.argv[3] || "10", 10);
  const url = `https://x.com/${username}`;

  console.log(`Fetching tweets from @${username}...\n`);
  const data = await browseX(url, count);
  const tweets = parseTweets(data);
  console.log(JSON.stringify(tweets, null, 2));
}

const isDirectRun = process.argv[1]?.endsWith("profile_tweets.ts") || process.argv[1]?.endsWith("profile_tweets.js");
if (isDirectRun) main();
