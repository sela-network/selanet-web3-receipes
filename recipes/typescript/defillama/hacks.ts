/**
 * Recipe: DeFi Hacks from DeFiLlama
 * Scrapes historical DeFi hack/exploit data with amounts lost.
 *
 * URL: https://defillama.com/hacks
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/hacks.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching DeFi hacks from DeFiLlama...\n");
  const data = await browse("https://defillama.com/hacks");
  printMarkdown(data);
}

main();
