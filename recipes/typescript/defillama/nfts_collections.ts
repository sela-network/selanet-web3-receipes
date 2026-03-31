/**
 * Recipe: NFT Collections from DeFiLlama
 * Scrapes NFT collection volume and floor price rankings.
 *
 * URL: https://defillama.com/nfts
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/nfts_collections.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching NFT collections from DeFiLlama...\n");
  const data = await browse("https://defillama.com/nfts");
  printMarkdown(data);
}

main();
