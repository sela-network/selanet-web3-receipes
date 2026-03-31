/**
 * Recipe: DEX Volumes by Chain from DeFiLlama
 * Scrapes DEX trading volume rankings grouped by blockchain chain.
 *
 * URL: https://defillama.com/dexs/chains
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/dexs_chains.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching DEX volumes by chain from DeFiLlama...\n");
  const data = await browse("https://defillama.com/dexs/chains");
  printMarkdown(data);
}

main();
