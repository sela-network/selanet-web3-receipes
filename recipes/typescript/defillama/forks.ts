/**
 * Recipe: Protocol Forks from DeFiLlama
 * Scrapes forked protocols and their TVL rankings.
 *
 * URL: https://defillama.com/forks
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/forks.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching protocol forks from DeFiLlama...\n");
  const data = await browse("https://defillama.com/forks");
  printMarkdown(data);
}

main();
