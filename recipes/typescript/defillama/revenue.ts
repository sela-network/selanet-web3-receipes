/**
 * Recipe: Protocol Revenue from DeFiLlama
 * Scrapes protocol revenue rankings (24h, 7d, 30d revenue).
 *
 * URL: https://defillama.com/revenue
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/revenue.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching protocol revenue from DeFiLlama...\n");
  const data = await browse("https://defillama.com/revenue");
  printMarkdown(data);
}

main();
