/**
 * Recipe: Top Protocols from DeFiLlama
 * Scrapes the top DeFi protocols ranked by TVL.
 *
 * URL: https://defillama.com/top-protocols
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/top_protocols.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching top protocols from DeFiLlama...\n");
  const data = await browse("https://defillama.com/top-protocols");
  printMarkdown(data);
}

main();
