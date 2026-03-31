/**
 * Recipe: Options Notional Volume from DeFiLlama
 * Scrapes options protocol notional volume rankings.
 *
 * URL: https://defillama.com/options/notional-volume
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/options_notional.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching options notional volume from DeFiLlama...\n");
  const data = await browse("https://defillama.com/options/notional-volume");
  printMarkdown(data);
}

main();
