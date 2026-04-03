/**
 * Node Bridge for Python IPC
 *
 * Stays alive as a long-running process.
 * Receives JSON requests via stdin, responds via stdout.
 *
 * Protocol (JSON Lines, one object per line):
 *   Request:  {"recipe": "coingecko/token_prices"}
 *   Response: {"ok": true, "result": [...]}
 *   Error:    {"ok": false, "error": "message"}
 */

import "dotenv/config";
import { createInterface } from "readline";
import { browse } from "./utils.js";

// Registry: recipe id → { url, parse function }
// Add new recipes here as they get export-enabled.
import { parseMarkdownTable as parseTokenPrices } from "./coingecko/token_prices.js";
import { parseMarkdownTable as parseCategoriesMarketCap } from "./coingecko/categories_market_cap.js";
import { parseMarkdownTable as parseChainsRanking } from "./coingecko/chains_ranking.js";
import { parseGlobalCharts } from "./coingecko/charts_global.js";
import { parseMarkdown as parseCryptoGainersLosers } from "./coingecko/crypto_gainers_losers.js";
import { parseMarkdownTable as parseExchangesCex } from "./coingecko/exchanges_cex.js";
import { parseMarkdownTable as parseExchangesDerivatives } from "./coingecko/exchanges_derivatives.js";
import { parseMarkdownTable as parseExchangesDex } from "./coingecko/exchanges_dex.js";
import { parseHighlights } from "./coingecko/highlights_trending.js";
import { parseMarkdownTable as parseNewCryptocurrencies } from "./coingecko/new_cryptocurrencies.js";
import { parseMarkdownTable as parseNftFloorPrice } from "./coingecko/nft_floor_price.js";
import { parseMarkdownTable as parseTreasuriesHoldings } from "./coingecko/treasuries_holdings.js";

import { parseMarkdownTable as parseRdExchangesRanking } from "./rootdata/exchanges_ranking.js";
import { parseMarkdownTable as parseRdFundraising } from "./rootdata/fundraising.js";
import { parseMarkdownTable as parseRdInvestors } from "./rootdata/investors.js";
import { parseMarkdownTable as parseRdPeople } from "./rootdata/people.js";
import { parseMarkdownTable as parseRdProjects } from "./rootdata/projects.js";
import { parseMarkdownTable as parseRdRankingsSoaring } from "./rootdata/rankings_soaring.js";
import { parseMarkdownTable as parseRdTokenUnlocks } from "./rootdata/token_unlocks.js";

import { parseMarkdownTable as parseEthTopAccounts } from "./etherscan/top_accounts.js";
import { parseMarkdownTable as parseEthTokens } from "./etherscan/tokens.js";
import { parseMarkdownTable as parseEthBlocks } from "./etherscan/blocks.js";
import { parseMarkdownTable as parseEthTransactions } from "./etherscan/transactions.js";
import { parseTxDetail as parseEthTxDetail } from "./etherscan/tx_detail.js";
import { parseBlockDetail as parseEthBlockDetail } from "./etherscan/block_detail.js";

import { parseAddressDetail as parseEthAddressDetail } from "./etherscan/address_detail.js";
import { parseTokenDetail as parseEthTokenDetail } from "./etherscan/token_detail.js";

import { parseMarkdownTable as parseArcAccounts } from "./arcscan/accounts.js";
import { parseMarkdownTable as parseArcBlocks } from "./arcscan/blocks.js";
import { parseMarkdownTable as parseArcTransactions } from "./arcscan/transactions.js";
import { parseAccountDetail as parseArcAccountDetail } from "./arcscan/account_detail.js";
import { parseBlockDetail as parseArcBlockDetail } from "./arcscan/block_detail.js";
import { parseTxDetail as parseArcTxDetail } from "./arcscan/tx_detail.js";
import { parseTokenDetail as parseArcTokenDetail } from "./arcscan/token_detail.js";

import { parseMarkdownTable as parseWorldBlocks } from "./worldscan/blocks.js";
import { parseMarkdownTable as parseWorldTransactions } from "./worldscan/transactions.js";
import { parseAddressDetail as parseWorldAddressDetail } from "./worldscan/address_detail.js";
import { parseBlockDetail as parseWorldBlockDetail } from "./worldscan/block_detail.js";
import { parseTxDetail as parseWorldTxDetail } from "./worldscan/tx_detail.js";
import { parseTokenDetail as parseWorldTokenDetail } from "./worldscan/token_detail.js";

import { parseTweets as parseXTweets } from "./x/profile.js";
import { parseTweets as parseXSearchTweets, buildSearchUrl } from "./x/search.js";
import { parsePost as parseXPost } from "./x/post.js";
import { browseX } from "./x/utils.js";

import { parseMarkdownTable as parseL2ScalingSummary } from "./l2beat/scaling_summary.js";
import { parseMarkdownTable as parseL2ScalingRisk } from "./l2beat/scaling_risk.js";
import { parseMarkdownTable as parseL2ScalingCosts } from "./l2beat/scaling_costs.js";
import { parseMarkdownTable as parseL2ScalingActivity } from "./l2beat/scaling_activity.js";
import { parseMarkdownTable as parseL2ScalingDA } from "./l2beat/scaling_da.js";

import { parseTokens as parseUniswapTokens } from "./uniswap/tokens.js";
import { parsePools as parseUniswapPools } from "./uniswap/pools.js";
import { parseAuctions as parseUniswapAuctions } from "./uniswap/auctions.js";
import { parsePoolDetail as parseUniswapPoolDetail } from "./uniswap/pool_detail.js";
import { parseTokenDetail as parseUniswapTokenDetail } from "./uniswap/token_detail.js";

import { parseGlobalDominance as parseCgGlobalDominance } from "./coingecko/global_dominance.js";
import { parseTokenDetail as parseCgTokenDetail } from "./coingecko/token_detail.js";

import { parseGasTracker as parseEthGasTracker } from "./etherscan/gas_tracker.js";

import { parseMarkets as parseAaveMarkets } from "./aave/markets.js";
import { parseReserveDetail as parseAaveReserveDetail } from "./aave/reserve_detail.js";

import { parseStablecoins as parseDlStablecoins } from "./defillama/stablecoins.js";
import { parseChainOverview as parseDlChainOverview } from "./defillama/chain_overview.js";

import { parseFeeds as parseChainlinkFeeds } from "./chainlink/feeds.js";
import { parseFeedDetail as parseChainlinkFeedDetail } from "./chainlink/feed_detail.js";

import { parseNameDetail as parseEnsNameDetail } from "./ens/name_detail.js";
import { parseNameCheck as parseEnsSearch } from "./ens/search.js";
import { parseReverseLookup as parseEnsReverse } from "./ens/reverse_lookup.js";

import { parseBlocks as parseFlareBlocks } from "./flare/blocks.js";
import { parseTransactions as parseFlareTransactions } from "./flare/transactions.js";
import { parseTokens as parseFlareTokens } from "./flare/tokens.js";
import { parseAddressDetail as parseFlareAddressDetail } from "./flare/address_detail.js";

import { parseBlocks as parseHederaBlocks } from "./hedera/blocks.js";
import { parseTransactions as parseHederaTransactions } from "./hedera/transactions.js";
import { parseTokens as parseHederaTokens } from "./hedera/tokens.js";
import { parseAccountDetail as parseHederaAccountDetail } from "./hedera/account_detail.js";

import { parseProjectDetail as parseRdProjectDetail } from "./rootdata/project_detail.js";

interface Recipe {
  url: string | ((params?: Record<string, string>) => string);
  parse: (data: any) => unknown;
  /** Use browseX (parse_only mode) instead of browse (markdown mode) */
  xMode?: boolean;
  /** Use check_idle: true for SPA pages that need idle detection */
  checkIdle?: boolean;
}

const recipes: Record<string, Recipe> = {
  "coingecko/token_prices": {
    url: "https://www.coingecko.com",
    parse: parseTokenPrices,
  },
  "coingecko/categories_market_cap": {
    url: "https://www.coingecko.com/en/categories",
    parse: parseCategoriesMarketCap,
  },
  "coingecko/chains_ranking": {
    url: "https://www.coingecko.com/en/chains",
    parse: parseChainsRanking,
  },
  "coingecko/charts_global": {
    url: "https://www.coingecko.com/en/charts",
    parse: parseGlobalCharts,
  },
  "coingecko/crypto_gainers_losers": {
    url: "https://www.coingecko.com/en/crypto-gainers-losers",
    parse: parseCryptoGainersLosers,
  },
  "coingecko/exchanges_cex": {
    url: "https://www.coingecko.com/en/exchanges",
    parse: parseExchangesCex,
  },
  "coingecko/exchanges_derivatives": {
    url: "https://www.coingecko.com/en/exchanges/derivatives",
    parse: parseExchangesDerivatives,
  },
  "coingecko/exchanges_dex": {
    url: "https://www.coingecko.com/en/exchanges/decentralized",
    parse: parseExchangesDex,
  },
  "coingecko/highlights_trending": {
    url: "https://www.coingecko.com/en/highlights",
    parse: parseHighlights,
  },
  "coingecko/new_cryptocurrencies": {
    url: "https://www.coingecko.com/en/new-cryptocurrencies",
    parse: parseNewCryptocurrencies,
  },
  "coingecko/nft_floor_price": {
    url: "https://www.coingecko.com/en/nft",
    parse: parseNftFloorPrice,
  },
  "coingecko/treasuries_holdings": {
    url: "https://www.coingecko.com/en/treasuries",
    parse: parseTreasuriesHoldings,
  },
  "rootdata/exchanges_ranking": {
    url: "https://www.rootdata.com/exchanges/ranking",
    parse: parseRdExchangesRanking,
  },
  "rootdata/fundraising": {
    url: "https://www.rootdata.com/Fundraising",
    parse: parseRdFundraising,
  },
  "rootdata/investors": {
    url: "https://www.rootdata.com/Investors",
    parse: parseRdInvestors,
  },
  "rootdata/people": {
    url: "https://www.rootdata.com/people",
    parse: parseRdPeople,
  },
  "rootdata/projects": {
    url: "https://www.rootdata.com/Projects",
    parse: parseRdProjects,
  },
  "rootdata/rankings_soaring": {
    url: "https://www.rootdata.com/rankings/soaring",
    parse: parseRdRankingsSoaring,
  },
  "rootdata/token_unlocks": {
    url: "https://www.rootdata.com/token-unlocks",
    parse: parseRdTokenUnlocks,
  },
  "etherscan/top_accounts": {
    url: "https://etherscan.io/accounts",
    parse: parseEthTopAccounts,
  },
  "etherscan/tokens": {
    url: "https://etherscan.io/tokens",
    parse: parseEthTokens,
  },
  "etherscan/blocks": {
    url: "https://etherscan.io/blocks",
    parse: parseEthBlocks,
  },
  "etherscan/transactions": {
    url: "https://etherscan.io/txs",
    parse: parseEthTransactions,
  },
  "etherscan/tx_detail": {
    url: (params) => `https://etherscan.io/tx/${params?.hash ?? ""}`,
    parse: parseEthTxDetail,
  },
  "etherscan/block_detail": {
    url: (params) => `https://etherscan.io/block/${params?.block ?? ""}`,
    parse: parseEthBlockDetail,
  },
  "etherscan/address_detail": {
    url: (params) => `https://etherscan.io/address/${params?.address ?? ""}`,
    parse: parseEthAddressDetail,
  },
  "etherscan/token_detail": {
    url: (params) => `https://etherscan.io/token/${params?.token ?? ""}`,
    parse: parseEthTokenDetail,
  },
  "arcscan/accounts": {
    url: "https://testnet.arcscan.app/accounts",
    parse: parseArcAccounts,
  },
  "arcscan/blocks": {
    url: "https://testnet.arcscan.app/blocks",
    parse: parseArcBlocks,
  },
  "arcscan/transactions": {
    url: "https://testnet.arcscan.app/txs",
    parse: parseArcTransactions,
  },
  "arcscan/account_detail": {
    url: (params) => `https://testnet.arcscan.app/address/${params?.address ?? ""}`,
    parse: parseArcAccountDetail,
  },
  "arcscan/block_detail": {
    url: (params) => `https://testnet.arcscan.app/block/${params?.block ?? ""}`,
    parse: parseArcBlockDetail,
  },
  "arcscan/tx_detail": {
    url: (params) => `https://testnet.arcscan.app/tx/${params?.hash ?? ""}`,
    parse: parseArcTxDetail,
  },
  "arcscan/token_detail": {
    url: (params) => `https://testnet.arcscan.app/token/${params?.token ?? ""}`,
    parse: parseArcTokenDetail,
  },
  "worldscan/blocks": {
    url: "https://worldscan.org/blocks",
    parse: parseWorldBlocks,
  },
  "worldscan/transactions": {
    url: "https://worldscan.org/txs",
    parse: parseWorldTransactions,
  },
  "worldscan/address_detail": {
    url: (params) => `https://worldscan.org/address/${params?.address ?? ""}`,
    parse: parseWorldAddressDetail,
  },
  "worldscan/block_detail": {
    url: (params) => `https://worldscan.org/block/${params?.block ?? ""}`,
    parse: parseWorldBlockDetail,
  },
  "worldscan/tx_detail": {
    url: (params) => `https://worldscan.org/tx/${params?.hash ?? ""}`,
    parse: parseWorldTxDetail,
  },
  "worldscan/token_detail": {
    url: (params) => `https://worldscan.org/token/${params?.token ?? ""}`,
    parse: parseWorldTokenDetail,
  },
  "l2beat/scaling_summary": {
    url: "https://l2beat.com/scaling/summary",
    parse: parseL2ScalingSummary,
  },
  "l2beat/scaling_risk": {
    url: "https://l2beat.com/scaling/risk",
    parse: parseL2ScalingRisk,
  },
  "l2beat/scaling_costs": {
    url: "https://l2beat.com/scaling/costs",
    parse: parseL2ScalingCosts,
  },
  "l2beat/scaling_activity": {
    url: "https://l2beat.com/scaling/activity",
    parse: parseL2ScalingActivity,
  },
  "l2beat/scaling_da": {
    url: "https://l2beat.com/scaling/data-availability",
    parse: parseL2ScalingDA,
  },
  "uniswap/tokens": {
    url: (params) =>
      `https://app.uniswap.org/explore/tokens/${params?.chain ?? "ethereum"}?lng=en`,
    parse: parseUniswapTokens,
    checkIdle: true,
  },
  "uniswap/pools": {
    url: (params) =>
      `https://app.uniswap.org/explore/pools/${params?.chain ?? "ethereum"}?lng=en`,
    parse: parseUniswapPools,
    checkIdle: true,
  },
  "uniswap/auctions": {
    url: (params) =>
      `https://app.uniswap.org/explore/auctions/${params?.chain ?? "ethereum"}?lng=en`,
    parse: parseUniswapAuctions,
    checkIdle: true,
  },
  "uniswap/pool_detail": {
    url: (params) =>
      `https://app.uniswap.org/explore/pools/${params?.chain ?? "ethereum"}/${params?.address ?? ""}?lng=en`,
    parse: parseUniswapPoolDetail,
    checkIdle: true,
  },
  "uniswap/token_detail": {
    url: (params) =>
      `https://app.uniswap.org/explore/tokens/${params?.chain ?? "ethereum"}/${params?.token ?? ""}?lng=en`,
    parse: parseUniswapTokenDetail,
    checkIdle: true,
  },
  "coingecko/global_dominance": {
    url: "https://www.coingecko.com/en/global-charts",
    parse: parseCgGlobalDominance,
  },
  "coingecko/token_detail": {
    url: (params) => `https://www.coingecko.com/en/coins/${params?.coin ?? "bitcoin"}`,
    parse: parseCgTokenDetail,
  },
  "etherscan/gas_tracker": {
    url: "https://etherscan.io/gastracker",
    parse: parseEthGasTracker,
  },
  "aave/markets": {
    url: (params) => {
      const qs = params?.market ? `?marketName=${params.market}` : "";
      return `https://app.aave.com/markets/${qs}`;
    },
    parse: parseAaveMarkets,
    checkIdle: true,
  },
  "aave/reserve_detail": {
    url: (params) =>
      `https://app.aave.com/reserve-overview/?underlyingAsset=${params?.asset ?? ""}&marketName=${params?.market ?? "proto_aave_v3"}`,
    parse: parseAaveReserveDetail,
    checkIdle: true,
  },
  "defillama/stablecoins": {
    url: "https://defillama.com/stablecoins",
    parse: parseDlStablecoins,
    checkIdle: true,
  },
  "defillama/chain_overview": {
    url: (params) => `https://defillama.com/chain/${params?.chain ?? "ethereum"}`,
    parse: (md: string) => parseDlChainOverview(md, "ethereum"),
    checkIdle: true,
  },
  "chainlink/feeds": {
    url: "https://data.chain.link/feeds",
    parse: parseChainlinkFeeds,
    checkIdle: true,
  },
  "chainlink/feed_detail": {
    url: (params) => params?.url ?? "https://data.chain.link/feeds/ethereum/mainnet/btc-usd",
    parse: (md: string) => parseChainlinkFeedDetail(md, ""),
    checkIdle: true,
  },
  "ens/name_detail": {
    url: (params) => `https://app.ens.domains/${params?.name ?? "vitalik.eth"}`,
    parse: (md: string) => parseEnsNameDetail(md, "", ""),
    checkIdle: true,
  },
  "ens/search": {
    url: (params) => `https://app.ens.domains/?search=${encodeURIComponent(params?.query ?? "")}`,
    parse: (md: string) => parseEnsSearch(md, "", ""),
    checkIdle: true,
  },
  "ens/reverse_lookup": {
    url: (params) => `https://app.ens.domains/${params?.address ?? ""}`,
    parse: (md: string) => parseEnsReverse(md, ""),
    checkIdle: true,
  },
  "flare/blocks": {
    url: "https://flare-explorer.flare.network/blocks",
    parse: parseFlareBlocks,
    checkIdle: true,
  },
  "flare/transactions": {
    url: "https://flare-explorer.flare.network/txs",
    parse: parseFlareTransactions,
    checkIdle: true,
  },
  "flare/tokens": {
    url: "https://flare-explorer.flare.network/tokens",
    parse: parseFlareTokens,
    checkIdle: true,
  },
  "flare/address_detail": {
    url: (params) => `https://flare-explorer.flare.network/address/${params?.address ?? ""}`,
    parse: (md: string) => parseFlareAddressDetail(md, "", ""),
    checkIdle: true,
  },
  "hedera/blocks": {
    url: "https://hashscan.io/mainnet/blocks",
    parse: parseHederaBlocks,
    checkIdle: true,
  },
  "hedera/transactions": {
    url: "https://hashscan.io/mainnet/transactions",
    parse: parseHederaTransactions,
    checkIdle: true,
  },
  "hedera/tokens": {
    url: "https://hashscan.io/mainnet/tokens",
    parse: parseHederaTokens,
    checkIdle: true,
  },
  "hedera/account_detail": {
    url: (params) => `https://hashscan.io/mainnet/account/${params?.account ?? ""}`,
    parse: (md: string) => parseHederaAccountDetail(md, "", ""),
    checkIdle: true,
  },
  "rootdata/project_detail": {
    url: (params) => `https://www.rootdata.com/Projects/detail/${encodeURIComponent(params?.slug ?? "")}`,
    parse: parseRdProjectDetail,
  },
  "x/profile": {
    url: (params) => `https://x.com/${params?.username ?? "VitalikButerin"}`,
    parse: parseXTweets,
    xMode: true,
  },
  "x/search": {
    url: (params) => buildSearchUrl({
      query: params?.query ?? "ethereum",
      from: params?.from,
      to: params?.to,
      mention: params?.mention,
      min_faves: params?.min_faves ? parseInt(params.min_faves, 10) : undefined,
      min_replies: params?.min_replies ? parseInt(params.min_replies, 10) : undefined,
      min_retweets: params?.min_retweets ? parseInt(params.min_retweets, 10) : undefined,
      since: params?.since,
      until: params?.until,
      lang: params?.lang,
      filter: params?.filter,
      exclude: params?.exclude,
    }),
    parse: parseXSearchTweets,
    xMode: true,
  },
  "x/post": {
    url: (params) => params?.url ?? `https://x.com/${params?.username ?? ""}/${params?.id ? `status/${params.id}` : ""}`,
    parse: parseXPost,
    xMode: true,
  },
};

// -- IPC loop --

const rl = createInterface({ input: process.stdin });

function respond(obj: unknown) {
  process.stdout.write(JSON.stringify(obj) + "\n");
}

rl.on("line", async (line) => {
  let req: { recipe?: string; params?: Record<string, string> };
  try {
    req = JSON.parse(line);
  } catch {
    respond({ ok: false, error: "Invalid JSON" });
    return;
  }

  const id = req.recipe;
  if (!id || !recipes[id]) {
    respond({
      ok: false,
      error: `Unknown recipe: ${id}. Available: ${Object.keys(recipes).join(", ")}`,
    });
    return;
  }

  try {
    const recipe = recipes[id];
    const url = typeof recipe.url === "function" ? recipe.url(req.params) : recipe.url;
    let result: unknown;
    if (recipe.xMode) {
      const count = parseInt(req.params?.count ?? "10", 10);
      const data = await browseX(url, count);
      result = recipe.parse(data);
    } else {
      const data = await browse(url, recipe.checkIdle ? { check_idle: true } : "markdown");
      const markdown = data?.extracted_content ?? "";
      result = recipe.parse(markdown);
    }
    respond({ ok: true, result });
  } catch (err: any) {
    respond({ ok: false, error: err.message ?? String(err) });
  }
});

// Signal ready
respond({ ok: true, ready: true });
