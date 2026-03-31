# Selanet Web3 Recipes

A collection of example code for scraping data from major Web3 sites using the Selanet Browse API.

## Supported Platforms

### CoinGecko
| Recipe | Description |
|--------|-------------|
| `token_prices.ts` | Top tokens by market cap, price changes |
| `categories_market_cap.ts` | Category-level market caps (DeFi, Layer 1, Meme, etc.) |
| `chains_ranking.ts` | Blockchain network rankings by market cap and TVL |
| `charts_global.ts` | Global crypto market charts |
| `crypto_gainers_losers.ts` | Biggest gainers and losers |
| `exchanges_cex.ts` | Centralized exchange trust scores and volume |
| `exchanges_dex.ts` | Decentralized exchange rankings |
| `exchanges_derivatives.ts` | Derivatives exchange rankings |
| `highlights_trending.ts` | Trending tokens, most searched coins |
| `new_cryptocurrencies.ts` | Recently added cryptocurrencies |
| `nft_floor_price.ts` | NFT collection floor prices |
| `treasuries_holdings.ts` | Treasury holdings data |

### DeFiLlama
| Recipe | Description |
|--------|-------------|
| `defi_tvl.ts` | Protocol TVL rankings |
| `chains.ts` | Chain TVL rankings |
| `categories.ts` | Protocol categories by TVL |
| `oracles.ts` | Oracle provider rankings |
| `top_protocols.ts` | Top DeFi protocols |
| `bridged_tvl.ts` | Bridged TVL by chain |
| `forks.ts` | Forked protocol rankings |
| `yields_overview.ts` | Yield farming opportunities |
| `yields_stablecoins.ts` | Stablecoin pool yields |
| `yields_leveraged_lending.ts` | Leveraged lending strategies |
| `yields_delta_neutral.ts` | Delta neutral strategies |
| `yields_long_short.ts` | Long/short strategies |
| `fees.ts` | Protocol fee rankings |
| `fees_chains.ts` | Chain fee rankings |
| `revenue.ts` | Protocol revenue rankings |
| `revenue_chains.ts` | Chain revenue rankings |
| `holders_revenue.ts` | Token holder revenue |
| `earnings.ts` | Protocol earnings |
| `dexs_volumes.ts` | DEX trading volumes |
| `dexs_chains.ts` | DEX volumes by chain |
| `perps.ts` | Perpetual futures DEX volumes |
| `perps_chains.ts` | Perps volumes by chain |
| `open_interest.ts` | Open interest rankings |
| `dex_aggregators.ts` | DEX aggregator volumes |
| `perps_aggregators.ts` | Perps aggregator volumes |
| `bridge_aggregators.ts` | Bridge aggregator volumes |
| `options_premium.ts` | Options premium volume |
| `options_notional.ts` | Options notional volume |
| `stablecoins.ts` | Stablecoin market cap rankings |
| `stablecoins_chains.ts` | Stablecoins by chain |
| `bridges.ts` | Bridge volume rankings |
| `bridges_chains.ts` | Bridge volumes by chain |
| `hacks.ts` | DeFi hack/exploit history |
| `airdrops.ts` | Airdrop listings |
| `nfts_collections.ts` | NFT collection rankings |
| `nfts_marketplaces.ts` | NFT marketplace rankings |
| `etfs.ts` | Crypto ETF inflows/outflows |
| `equities.ts` | Crypto-related equities |
| `digital_asset_treasuries.ts` | Corporate crypto holdings |
| `unlocks.ts` | Token unlock schedules |
| `treasuries.ts` | Protocol treasury holdings |
| `raises.ts` | Fundraising rounds |
| `raises_investors.ts` | Investor rankings |
| `cex_transparency.ts` | CEX proof-of-reserves |
| `recently_listed.ts` | Recently listed protocols |
| `narrative_tracker.ts` | Crypto narrative tracking |
| `eth_liquid_staking.ts` | ETH liquid staking providers |
| `governance.ts` | Governance proposals |
| `rwa.ts` | Real world assets |
| `token_liquidity.ts` | Token liquidity depth |
| `borrow.ts` | Borrow rates |

## Quick Start

```bash
# 1. Set up API Key
cp .env.example .env
# Enter your SELA_API_KEY in the .env file

# 2. Install dependencies
cd recipes/typescript
npm install

# 3. Run a recipe
export SELA_API_KEY=sk_live_your_key
npx tsx coingecko/token_prices.ts
npx tsx defillama/fees.ts
```

## Project Structure

```
selanet-web3-recipes/
└── recipes/
    └── typescript/
        ├── coingecko/     # CoinGecko recipes
        ├── defillama/     # DeFiLlama recipes
        └── utils.ts       # Shared Selanet API helpers
```

## Selanet API

```bash
curl -X POST https://api.selanet.ai/v1/browse \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk_live_YOUR_KEY" \
  -d '{"url":"https://www.coingecko.com","extract_format":"markdown"}'
```

- **Docs**: https://www.selanet.ai/resources/docs
