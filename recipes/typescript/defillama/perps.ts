/**
 * Recipe: Perpetual DEX Volumes from DeFiLlama
 * Scrapes perpetual futures DEX trading volume rankings.
 *
 * URL: https://defillama.com/perps
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/perps.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching perps volumes from DeFiLlama...\n");
  const data = await browse("https://defillama.com/perps");
  printMarkdown(data);
}

main();
