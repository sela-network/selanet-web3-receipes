/**
 * Recipe: Search Tweets from X (Twitter)
 * Scrapes tweets matching a search query.
 * Note: Requires login session. If no session, returns empty or login_required error.
 *
 * URL: https://x.com/search?q={query}&src=typed_query&f=live
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx x/search_tweets.ts "ethereum"
 *   npx tsx x/search_tweets.ts "bitcoin defi" 20
 */

import "dotenv/config";
import { browseX, parseTweets, type Tweet } from "./utils.js";

export { parseTweets };

async function main() {
  const query = process.argv[2] || "ethereum";
  const count = parseInt(process.argv[3] || "10", 10);
  const url = `https://x.com/search?q=${encodeURIComponent(query)}&src=typed_query&f=live`;

  console.log(`Searching X for "${query}"...\n`);
  const data = await browseX(url, count);

  if (data?.page_type === "login_required") {
    console.error("Login required. Search needs an authenticated session.");
    console.error("Profile pages (x.com/{username}) work without login.");
    return;
  }

  const tweets = parseTweets(data);
  console.log(JSON.stringify(tweets, null, 2));
}

const isDirectRun = process.argv[1]?.endsWith("search_tweets.ts") || process.argv[1]?.endsWith("search_tweets.js");
if (isDirectRun) main();
