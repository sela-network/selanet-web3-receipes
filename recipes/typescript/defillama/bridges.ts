/**
 * Recipe: Bridges Overview from DeFiLlama
 * Scrapes cross-chain bridge volume and TVL rankings.
 *
 * URL: https://defillama.com/bridges
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/bridges.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching bridges overview from DeFiLlama...\n");
  const data = await browse("https://defillama.com/bridges");
  printMarkdown(data);
}

main();
