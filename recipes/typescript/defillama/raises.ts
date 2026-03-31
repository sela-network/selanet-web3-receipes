/**
 * Recipe: Fundraising Raises from DeFiLlama
 * Scrapes recent crypto project fundraising rounds and amounts.
 *
 * URL: https://defillama.com/raises
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/raises.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching fundraising raises from DeFiLlama...\n");
  const data = await browse("https://defillama.com/raises");
  printMarkdown(data);
}

main();
