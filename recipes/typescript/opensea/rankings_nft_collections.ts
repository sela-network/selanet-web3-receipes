/**
 * Recipe: NFT Collections from OpenSea
 * Scrapes popular NFT collection floor prices and volumes from OpenSea.
 *
 * URL: https://opensea.io/rankings
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx opensea/rankings_nft_collections.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching NFT collections from OpenSea...\n");
  const data = await browse("https://opensea.io/rankings");
  printMarkdown(data);
}

main();
