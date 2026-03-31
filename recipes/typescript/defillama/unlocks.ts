/**
 * Recipe: Token Unlocks Overview from DeFiLlama
 * Scrapes upcoming token unlock schedules and amounts.
 *
 * URL: https://defillama.com/unlocks
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/unlocks.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching token unlocks from DeFiLlama...\n");
  const data = await browse("https://defillama.com/unlocks");
  printMarkdown(data);
}

main();
