/**
 * Recipe: Crypto Investors from DeFiLlama
 * Scrapes investor rankings by number of investments and portfolio.
 *
 * URL: https://defillama.com/raises/investors
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/raises_investors.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching crypto investors from DeFiLlama...\n");
  const data = await browse("https://defillama.com/raises/investors");
  printMarkdown(data);
}

main();
