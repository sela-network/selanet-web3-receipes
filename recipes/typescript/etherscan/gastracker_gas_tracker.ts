/**
 * Recipe: Gas Tracker from Etherscan
 * Scrapes current Ethereum gas fees and recommended gas prices from Etherscan.
 *
 * URL: https://etherscan.io/gastracker
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx etherscan/gastracker_gas_tracker.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching gas prices from Etherscan...\n");
  const data = await browse("https://etherscan.io/gastracker");
  printMarkdown(data);
}

main();
