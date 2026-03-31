/**
 * Recipe: Crypto Equities from DeFiLlama
 * Scrapes crypto-related public equities and stock data.
 *
 * URL: https://defillama.com/equities
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/equities.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching crypto equities from DeFiLlama...\n");
  const data = await browse("https://defillama.com/equities");
  printMarkdown(data);
}

main();
