/**
 * Recipe: Token Liquidity from DeFiLlama
 * Scrapes token liquidity depth data across DEXes.
 *
 * URL: https://defillama.com/liquidity
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/token_liquidity.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching token liquidity from DeFiLlama...\n");
  const data = await browse("https://defillama.com/liquidity");
  printMarkdown(data);
}

main();
