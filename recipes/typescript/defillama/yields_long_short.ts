/**
 * Recipe: Long/Short Yield Strategies from DeFiLlama
 * Scrapes long/short yield farming strategies.
 *
 * URL: https://defillama.com/yields/strategy-long-short
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/yields_long_short.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching long/short strategies from DeFiLlama...\n");
  const data = await browse("https://defillama.com/yields/strategy-long-short");
  printMarkdown(data);
}

main();
