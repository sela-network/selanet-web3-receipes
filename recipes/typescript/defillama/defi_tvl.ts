/**
 * Recipe: DeFi TVL Rankings from DeFiLlama
 * Scrapes protocol TVL (Total Value Locked) rankings from DeFiLlama homepage.
 *
 * URL: https://defillama.com
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx defillama/defi_tvl.ts
 */

import "dotenv/config";
import { browse } from "../utils.js";

interface DefiTvl {
  name: string;
  slug: string;
  url: string;
  image: string;
  chains: string;
  category: string;
  tvl: string;
  change_1d: string;
  change_7d: string;
  change_1m: string;
  mcap_tvl: string;
  fees_24h: string;
  revenue_24h: string;
}

function parseProtocols(markdown: string): DefiTvl[] {
  const lines = markdown.split("\n");
  const results: DefiTvl[] = [];

  // Find protocol rows: lines containing defillama.com/protocol/
  const protocolPattern =
    /!\[Logo of ([^\]]*)\]\(([^)]+)\)\[([^\]]+)\]\((https:\/\/defillama\.com\/protocol\/([^)]+))\)(\d+\s+chains?)?/;

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(protocolPattern);
    if (!match) continue;

    const name = match[3];
    const image = match[2];
    const url = match[4];
    const slug = match[5];
    const chains = match[6]?.trim() || "";

    // Next lines are: optional category, then values
    let j = i + 1;
    // Skip empty lines
    while (j < lines.length && lines[j].trim() === "") j++;

    // Check if next non-empty line is a category link
    let category = "";
    if (j < lines.length && /^\[.+\]\(https:\/\/defillama\.com\/protocols\//.test(lines[j].trim())) {
      const catMatch = lines[j].match(/\[([^\]]+)\]/);
      category = catMatch ? catMatch[1] : "";
      j++;
    }

    // Collect value lines (skip empty)
    const values: string[] = [];
    while (j < lines.length && values.length < 43) {
      const trimmed = lines[j].trim();
      if (trimmed === "") {
        j++;
        continue;
      }
      // Stop if we hit another protocol row
      if (protocolPattern.test(trimmed)) break;
      values.push(trimmed);
      j++;
    }

    // Column order: TVL, 1d Change, 7d Change, 1m Change, Mcap/TVL, Fees 24h, Revenue 24h, ...
    // "Hide child protocols" rows may skip 1d/7d/1m change columns
    // Detect by checking if values[1] contains % or +/- sign
    const tvl = values[0] || "";
    let change_1d = "";
    let change_7d = "";
    let change_1m = "";
    let restStart = 1;

    if (values[1] && /[%+-]/.test(values[1])) {
      change_1d = values[1];
      change_7d = values[2] || "";
      change_1m = values[3] || "";
      restStart = 4;
    }

    results.push({
      name,
      slug,
      url,
      image,
      chains,
      category,
      tvl,
      change_1d,
      change_7d,
      change_1m,
      mcap_tvl: values[restStart] || "",
      fees_24h: values[restStart + 1] || "",
      revenue_24h: values[restStart + 2] || "",
    });
  }

  return results;
}

async function main() {
  console.log("Fetching DeFi TVL rankings from DeFiLlama...\n");
  const data = await browse("https://defillama.com");
  const markdown = data?.extracted_content ?? "";
  const protocols = parseProtocols(markdown);
  console.log(JSON.stringify(protocols, null, 2));
}

main();
