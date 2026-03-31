/**
 * Recipe: Stablecoins by Chain from DeFiLlama
 * Scrapes stablecoin market cap distribution across chains.
 *
 * URL: https://defillama.com/stablecoins/chains
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/stablecoins_chains.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching stablecoins by chain from DeFiLlama...\n");
  const data = await browse("https://defillama.com/stablecoins/chains");
  printMarkdown(data);
}

main();
