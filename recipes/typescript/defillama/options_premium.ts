/**
 * Recipe: Options Premium Volume from DeFiLlama
 * Scrapes options protocol premium volume rankings.
 *
 * URL: https://defillama.com/options/premium-volume
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/options_premium.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching options premium volume from DeFiLlama...\n");
  const data = await browse("https://defillama.com/options/premium-volume");
  printMarkdown(data);
}

main();
