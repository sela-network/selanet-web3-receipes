/**
 * Recipe: Token Prices from CoinGecko
 * Scrapes top tokens by market cap with prices and 24h price changes.
 *
 * URL: https://www.coingecko.com
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx coingecko/token_prices.ts
 */

import "dotenv/config";
import { browse } from "../utils.js";

interface TokenPrice {
  rank: number;
  name: string;
  symbol: string;
  slug: string;
  url: string;
  image: string;
  price: number;
  change_1h: number;
  change_24h: number;
  change_7d: number;
  change_30d: number;
  volume_24h: number;
  market_cap: number;
  fdv: number;
  market_cap_fdv_ratio: number;
  sparkline: string;
}

export function parseMarkdownTable(markdown: string): TokenPrice[] {
  const lines = markdown.split("\n");
  const results: TokenPrice[] = [];

  for (const line of lines) {
    if (!line.startsWith("|")) continue;

    const cells = line.split("|").map((c) => c.trim());
    // cells: [empty, icon, rank, coin_link, buy, price, 1h, 24h, 7d, 30d, volume, market_cap, fdv, mcap_fdv, sparkline, empty]

    const rank = parseInt(cells[2], 10);
    if (isNaN(rank)) continue;

    // Parse coin cell: [![SYM](img) Name SYM](url)
    const coinCell = cells[3] || "";
    const coinMatch = coinCell.match(
      /\[!\[([^\]]*)\]\(([^)]+)\)\s+(.+?)\s+([A-Z0-9]+)\]\((https:\/\/www\.coingecko\.com\/en\/coins\/([^)]+))\)/
    );

    const symbol = coinMatch ? coinMatch[4] : "";
    const name = coinMatch ? coinMatch[3] : "";
    const image = coinMatch ? coinMatch[2] : "";
    const url = coinMatch ? coinMatch[5] : "";
    const slug = coinMatch ? coinMatch[6] : "";

    const parsePercent = (s: string): number => {
      const n = parseFloat(s?.replace(/%/g, "").trim());
      return isNaN(n) ? 0 : n;
    };

    const parseUsd = (s: string): number => {
      const cleaned = s?.replace(/[$,\s]/g, "");
      const n = parseFloat(cleaned);
      return isNaN(n) ? 0 : n;
    };

    // Extract sparkline URL
    const sparklineCell = cells[14] || "";
    const sparkMatch = sparklineCell.match(
      /\(https:\/\/www\.coingecko\.com\/coins\/[^)]+\/sparkline\.svg\)/
    );
    const sparkline = sparkMatch ? sparkMatch[0].slice(1, -1) : "";

    results.push({
      rank,
      name,
      symbol,
      slug,
      url,
      image,
      price: parseUsd(cells[5]),
      change_1h: parsePercent(cells[6]),
      change_24h: parsePercent(cells[7]),
      change_7d: parsePercent(cells[8]),
      change_30d: parsePercent(cells[9]),
      volume_24h: parseUsd(cells[10]),
      market_cap: parseUsd(cells[11]),
      fdv: parseUsd(cells[12]),
      market_cap_fdv_ratio: parseFloat(cells[13]) || 0,
      sparkline,
    });
  }

  return results;
}

async function main() {
  console.log("Fetching token prices from CoinGecko...\n");
  const data = await browse("https://www.coingecko.com");
  const markdown = data?.extracted_content ?? "";
  const tokens = parseMarkdownTable(markdown);
  console.log(JSON.stringify(tokens, null, 2));
}

// Run main() only when executed directly (not when imported by bridge)
const isDirectRun = process.argv[1]?.endsWith("token_prices.ts") || process.argv[1]?.endsWith("token_prices.js");
if (isDirectRun) main();
