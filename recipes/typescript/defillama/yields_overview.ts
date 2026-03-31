/**
 * Recipe: Yield Farming Overview from DeFiLlama
 * Scrapes yield farming opportunities across DeFi protocols.
 *
 * URL: https://defillama.com/yields
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/yields_overview.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching yield farming overview from DeFiLlama...\n");
  const data = await browse("https://defillama.com/yields");
  printMarkdown(data);
}

main();
