/**
 * Recipe: Perps Volumes by Chain from DeFiLlama
 * Scrapes perpetual futures trading volumes grouped by blockchain chain.
 *
 * URL: https://defillama.com/perps/chains
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/perps_chains.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching perps volumes by chain from DeFiLlama...\n");
  const data = await browse("https://defillama.com/perps/chains");
  printMarkdown(data);
}

main();
