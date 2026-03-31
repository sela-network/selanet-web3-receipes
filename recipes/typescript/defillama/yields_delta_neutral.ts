/**
 * Recipe: Delta Neutral Yield Strategies from DeFiLlama
 * Scrapes delta neutral yield farming strategies.
 *
 * URL: https://defillama.com/yields/strategy
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/yields_delta_neutral.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching delta neutral strategies from DeFiLlama...\n");
  const data = await browse("https://defillama.com/yields/strategy");
  printMarkdown(data);
}

main();
