/**
 * Recipe: NFT Marketplaces from DeFiLlama
 * Scrapes NFT marketplace volume rankings.
 *
 * URL: https://defillama.com/nfts/marketplaces
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/nfts_marketplaces.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching NFT marketplaces from DeFiLlama...\n");
  const data = await browse("https://defillama.com/nfts/marketplaces");
  printMarkdown(data);
}

main();
