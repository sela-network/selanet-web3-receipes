/**
 * Recipe: Governance from DeFiLlama
 * Scrapes DeFi protocol governance proposals and voting data.
 *
 * URL: https://defillama.com/governance
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/governance.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching governance data from DeFiLlama...\n");
  const data = await browse("https://defillama.com/governance");
  printMarkdown(data);
}

main();
