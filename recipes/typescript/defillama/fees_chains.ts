/**
 * Recipe: Chain Fees from DeFiLlama
 * Scrapes fee rankings by blockchain chain.
 *
 * URL: https://defillama.com/fees/chains
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/fees_chains.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching chain fees from DeFiLlama...\n");
  const data = await browse("https://defillama.com/fees/chains");
  printMarkdown(data);
}

main();
