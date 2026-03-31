/**
 * Recipe: Stablecoin Pool Yields from DeFiLlama
 * Scrapes yield opportunities for stablecoin pools.
 *
 * URL: https://defillama.com/yields/stablecoins
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/yields_stablecoins.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching stablecoin pool yields from DeFiLlama...\n");
  const data = await browse("https://defillama.com/yields/stablecoins");
  printMarkdown(data);
}

main();
