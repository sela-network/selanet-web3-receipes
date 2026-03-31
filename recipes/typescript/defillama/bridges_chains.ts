/**
 * Recipe: Bridge Volumes by Chain from DeFiLlama
 * Scrapes bridge volume data grouped by blockchain chain.
 *
 * URL: https://defillama.com/bridges/chains
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/bridges_chains.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching bridge volumes by chain from DeFiLlama...\n");
  const data = await browse("https://defillama.com/bridges/chains");
  printMarkdown(data);
}

main();
