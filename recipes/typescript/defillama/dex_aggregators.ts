/**
 * Recipe: DEX Aggregator Volumes from DeFiLlama
 * Scrapes DEX aggregator trading volume rankings.
 *
 * URL: https://defillama.com/dex-aggregators
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/dex_aggregators.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching DEX aggregator volumes from DeFiLlama...\n");
  const data = await browse("https://defillama.com/dex-aggregators");
  printMarkdown(data);
}

main();
