/**
 * Recipe: Airdrops from DeFiLlama
 * Scrapes upcoming and past crypto airdrop listings.
 *
 * URL: https://defillama.com/airdrops
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/airdrops.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching airdrops from DeFiLlama...\n");
  const data = await browse("https://defillama.com/airdrops");
  printMarkdown(data);
}

main();
