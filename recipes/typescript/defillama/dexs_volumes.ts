/**
 * Recipe: DEX Volumes from DeFiLlama
 * Scrapes 24-hour trading volumes by DEX from DeFiLlama.
 *
 * URL: https://defillama.com/dexs
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/dexs_volumes.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching DEX volumes from DeFiLlama...\n");
  const data = await browse("https://defillama.com/dexs");
  printMarkdown(data);
}

main();
