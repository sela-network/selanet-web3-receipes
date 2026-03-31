/**
 * Recipe: Chain Revenue from DeFiLlama
 * Scrapes revenue rankings by blockchain chain.
 *
 * URL: https://defillama.com/revenue/chains
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/revenue_chains.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching chain revenue from DeFiLlama...\n");
  const data = await browse("https://defillama.com/revenue/chains");
  printMarkdown(data);
}

main();
