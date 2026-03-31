/**
 * Recipe: Digital Asset Treasuries (DATs) from DeFiLlama
 * Scrapes corporate and institutional digital asset treasury holdings.
 *
 * URL: https://defillama.com/digital-asset-treasuries
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/digital_asset_treasuries.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching digital asset treasuries from DeFiLlama...\n");
  const data = await browse("https://defillama.com/digital-asset-treasuries");
  printMarkdown(data);
}

main();
