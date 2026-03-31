/**
 * Recipe: CEX Transparency from DeFiLlama
 * Scrapes centralized exchange proof-of-reserves and transparency data.
 *
 * URL: https://defillama.com/cexs
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/cex_transparency.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching CEX transparency data from DeFiLlama...\n");
  const data = await browse("https://defillama.com/cexs");
  printMarkdown(data);
}

main();
