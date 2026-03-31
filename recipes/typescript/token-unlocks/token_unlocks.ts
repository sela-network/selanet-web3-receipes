/**
 * Recipe: Token Unlocks from Token.Unlocks
 * Scrapes upcoming token unlock event schedules.
 *
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx token-unlocks/token_unlocks.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching token unlock schedule...\n");
  const data = await browse("https://token.unlocks.app");
  printMarkdown(data);
}

main();
