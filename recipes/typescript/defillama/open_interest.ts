/**
 * Recipe: Open Interest from DeFiLlama
 * Scrapes open interest rankings across perpetual futures DEXes.
 *
 * URL: https://defillama.com/open-interest
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/open_interest.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching open interest from DeFiLlama...\n");
  const data = await browse("https://defillama.com/open-interest");
  printMarkdown(data);
}

main();
