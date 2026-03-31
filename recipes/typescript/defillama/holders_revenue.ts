/**
 * Recipe: Holders Revenue from DeFiLlama
 * Scrapes token holder revenue rankings (revenue accruing to token holders).
 *
 * URL: https://defillama.com/holders-revenue
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/holders_revenue.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching holders revenue from DeFiLlama...\n");
  const data = await browse("https://defillama.com/holders-revenue");
  printMarkdown(data);
}

main();
