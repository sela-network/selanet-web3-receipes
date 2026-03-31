/**
 * Recipe: Protocol Treasuries from DeFiLlama
 * Scrapes DeFi protocol treasury holdings and valuations.
 *
 * URL: https://defillama.com/treasuries
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/treasuries.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching protocol treasuries from DeFiLlama...\n");
  const data = await browse("https://defillama.com/treasuries");
  printMarkdown(data);
}

main();
