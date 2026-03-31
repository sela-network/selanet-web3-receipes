/**
 * Recipe: Recently Listed Protocols from DeFiLlama
 * Scrapes recently listed DeFi protocols on DeFiLlama.
 *
 * URL: https://defillama.com/recent
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/recently_listed.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching recently listed protocols from DeFiLlama...\n");
  const data = await browse("https://defillama.com/recent");
  printMarkdown(data);
}

main();
