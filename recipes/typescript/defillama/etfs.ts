/**
 * Recipe: Crypto ETFs from DeFiLlama
 * Scrapes crypto ETF inflow/outflow data.
 *
 * URL: https://defillama.com/etfs
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/etfs.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching crypto ETFs from DeFiLlama...\n");
  const data = await browse("https://defillama.com/etfs");
  printMarkdown(data);
}

main();
