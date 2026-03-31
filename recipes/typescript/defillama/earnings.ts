/**
 * Recipe: Protocol Earnings from DeFiLlama
 * Scrapes protocol earnings rankings (revenue minus token incentives).
 *
 * URL: https://defillama.com/earnings
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/earnings.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching protocol earnings from DeFiLlama...\n");
  const data = await browse("https://defillama.com/earnings");
  printMarkdown(data);
}

main();
