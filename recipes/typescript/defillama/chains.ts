/**
 * Recipe: Chain Rankings from DeFiLlama
 * Scrapes blockchain network rankings by TVL across all chains.
 *
 * URL: https://defillama.com/chains
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/chains.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching chain rankings from DeFiLlama...\n");
  const data = await browse("https://defillama.com/chains");
  printMarkdown(data);
}

main();
