/**
 * Recipe: Bridge Aggregator Volumes from DeFiLlama
 * Scrapes bridge aggregator volume rankings.
 *
 * URL: https://defillama.com/bridge-aggregators
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/bridge_aggregators.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching bridge aggregator volumes from DeFiLlama...\n");
  const data = await browse("https://defillama.com/bridge-aggregators");
  printMarkdown(data);
}

main();
