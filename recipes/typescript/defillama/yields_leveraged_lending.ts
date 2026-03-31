/**
 * Recipe: Leveraged Lending Yields from DeFiLlama
 * Scrapes leveraged lending (loop) yield strategies.
 *
 * URL: https://defillama.com/yields/loop
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/yields_leveraged_lending.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching leveraged lending yields from DeFiLlama...\n");
  const data = await browse("https://defillama.com/yields/loop");
  printMarkdown(data);
}

main();
