/**
 * Recipe: Real World Assets (RWA) from DeFiLlama
 * Scrapes tokenized real world asset protocol rankings and TVL.
 *
 * URL: https://defillama.com/rwa
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/rwa.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching RWA data from DeFiLlama...\n");
  const data = await browse("https://defillama.com/rwa");
  printMarkdown(data);
}

main();
