/**
 * Recipe: Stablecoins Overview from DeFiLlama
 * Scrapes stablecoin market cap rankings and peg data.
 *
 * URL: https://defillama.com/stablecoins
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/stablecoins.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching stablecoins overview from DeFiLlama...\n");
  const data = await browse("https://defillama.com/stablecoins");
  printMarkdown(data);
}

main();
