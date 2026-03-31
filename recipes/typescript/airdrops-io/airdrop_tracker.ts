/**
 * Recipe: Airdrop Tracker from Airdrops.io
 * Scrapes active crypto airdrop listings.
 *
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx airdrops-io/airdrop_tracker.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching active airdrops...\n");
  const data = await browse("https://airdrops.io");
  printMarkdown(data);
}

main();
