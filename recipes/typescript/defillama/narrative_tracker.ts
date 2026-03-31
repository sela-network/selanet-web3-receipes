/**
 * Recipe: Narrative Tracker from DeFiLlama
 * Scrapes crypto narrative/trend tracking data.
 *
 * URL: https://defillama.com/narrative-tracker
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/narrative_tracker.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching narrative tracker from DeFiLlama...\n");
  const data = await browse("https://defillama.com/narrative-tracker");
  printMarkdown(data);
}

main();
