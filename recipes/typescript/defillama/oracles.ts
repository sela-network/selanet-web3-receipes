/**
 * Recipe: Oracle Rankings from DeFiLlama
 * Scrapes oracle provider rankings by total secured value.
 *
 * URL: https://defillama.com/oracles
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/oracles.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching oracle rankings from DeFiLlama...\n");
  const data = await browse("https://defillama.com/oracles");
  printMarkdown(data);
}

main();
