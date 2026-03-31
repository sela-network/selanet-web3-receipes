/**
 * Recipe: ETH Liquid Staking from DeFiLlama
 * Scrapes Ethereum liquid staking provider rankings and market share.
 *
 * URL: https://defillama.com/lst
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/eth_liquid_staking.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching ETH liquid staking from DeFiLlama...\n");
  const data = await browse("https://defillama.com/lst");
  printMarkdown(data);
}

main();
