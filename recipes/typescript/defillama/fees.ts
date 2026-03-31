/**
 * Recipe: Protocol Fees from DeFiLlama
 * Scrapes protocol fee rankings (24h, 7d, 30d fees).
 *
 * URL: https://defillama.com/fees
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/fees.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching protocol fees from DeFiLlama...\n");
  const data = await browse("https://defillama.com/fees");
  printMarkdown(data);
}

main();
