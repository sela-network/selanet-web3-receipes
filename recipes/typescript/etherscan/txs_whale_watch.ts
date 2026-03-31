/**
 * Recipe: Whale Watch from Etherscan
 * Monitors large whale wallet transactions from Etherscan.
 *
 * URL: https://etherscan.io/txs
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx etherscan/txs_whale_watch.ts
 */

import "dotenv/config";
import { browse, printMarkdown } from "../utils.js";

async function main() {
  console.log("Fetching whale transactions from Etherscan...\n");
  const data = await browse("https://etherscan.io/txs?ps=100&p=1");
  printMarkdown(data);
}

main();
