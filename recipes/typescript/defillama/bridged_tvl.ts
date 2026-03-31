/**
 * Recipe: Bridged TVL from DeFiLlama
 * Scrapes bridged TVL data showing how much value is bridged to each chain.
 *
 * URL: https://defillama.com/bridged
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/bridged_tvl.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching bridged TVL from DeFiLlama...\n");
  const data = await browse("https://defillama.com/bridged");
  printMarkdown(data);
}

main();
