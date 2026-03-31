/**
 * Recipe: Perps Aggregator Volumes from DeFiLlama
 * Scrapes perpetual futures aggregator volume rankings.
 *
 * URL: https://defillama.com/perps-aggregators
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/perps_aggregators.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching perps aggregator volumes from DeFiLlama...\n");
  const data = await browse("https://defillama.com/perps-aggregators");
  printMarkdown(data);
}

main();
