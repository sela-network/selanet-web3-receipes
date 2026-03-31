/**
 * Recipe: Protocol Categories from DeFiLlama
 * Scrapes DeFi category rankings (Liquid Staking, Lending, DEXes, etc.) by TVL.
 *
 * URL: https://defillama.com/categories
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/categories.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching protocol categories from DeFiLlama...\n");
  const data = await browse("https://defillama.com/categories");
  printMarkdown(data);
}

main();
