/**
 * Recipe: Borrow Rates from DeFiLlama
 * Scrapes borrowing rates across DeFi lending protocols.
 *
 * URL: https://defillama.com/borrow
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/borrow.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching borrow rates from DeFiLlama...\n");
  const data = await browse("https://defillama.com/borrow");
  printMarkdown(data);
}

main();
