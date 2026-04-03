# Selanet Web3 Recipes

A collection of example code for scraping data from major Web3 sites using the Selanet Browse API.

## Supported Platforms

### CoinGecko
| Recipe | Description |
|--------|-------------|
| `token_prices.ts` | Top tokens by market cap, price changes |
| `token_detail.ts` | Detailed info for a specific token (price, market cap, ATH/ATL) |
| `categories_market_cap.ts` | Category-level market caps (DeFi, Layer 1, Meme, etc.) |
| `chains_ranking.ts` | Blockchain network rankings by market cap and TVL |
| `charts_global.ts` | Global crypto market charts |
| `global_dominance.ts` | BTC/ETH dominance, total market cap, volume |
| `crypto_gainers_losers.ts` | Biggest gainers and losers |
| `exchanges_cex.ts` | Centralized exchange trust scores and volume |
| `exchanges_dex.ts` | Decentralized exchange rankings |
| `exchanges_derivatives.ts` | Derivatives exchange rankings |
| `highlights_trending.ts` | Trending tokens, most searched coins |
| `new_cryptocurrencies.ts` | Recently added cryptocurrencies |
| `nft_floor_price.ts` | NFT collection floor prices |
| `treasuries_holdings.ts` | Treasury holdings data |

### Etherscan
| Recipe | Description |
|--------|-------------|
| `top_accounts.ts` | Top Ethereum accounts by ETH balance |
| `tokens.ts` | Top ERC-20 tokens by market cap |
| `blocks.ts` | Recent Ethereum blocks with gas and rewards |
| `transactions.ts` | Recent Ethereum transactions |
| `gas_tracker.ts` | Real-time gas prices and transaction cost estimates |
| `tx_detail.ts` | Detailed info for a specific transaction |
| `block_detail.ts` | Detailed info for a specific block |
| `address_detail.ts` | Detailed info for a specific address |
| `token_detail.ts` | Detailed info for a specific ERC-20 token |

### Aave
| Recipe | Description |
|--------|-------------|
| `markets.ts` | Lending/borrowing markets with supply APY, borrow APY, TVL |
| `reserve_detail.ts` | Detailed reserve info (utilization, liquidation threshold, LTV) |

### DefiLlama
| Recipe | Description |
|--------|-------------|
| `stablecoins.ts` | Stablecoin market cap rankings and peg data |
| `chain_overview.ts` | Chain-level DeFi metrics (TVL, fees, DEX volume, addresses) |

### Uniswap
| Recipe | Description |
|--------|-------------|
| `pools.ts` | Top pools with TVL, APR, volume |
| `pool_detail.ts` | Detailed pool info (fee tier, TVL, recent transactions) |
| `tokens.ts` | Top tokens with price and trading data |
| `token_detail.ts` | Detailed token info (price, TVL, market cap, FDV) |
| `auctions.ts` | Auction data |
| `transactions.ts` | Recent transactions |

### Chainlink
| Recipe | Description |
|--------|-------------|
| `feeds.ts` | Price feed listings with deviation, heartbeat, asset class |
| `feed_detail.ts` | Detailed info for a specific Chainlink feed |

### ENS
| Recipe | Description |
|--------|-------------|
| `name_detail.ts` | ENS name detail (owner, expiry, records, linked accounts) |
| `search.ts` | Search ENS name availability |
| `reverse_lookup.ts` | Address to ENS name reverse lookup |

### L2Beat
| Recipe | Description |
|--------|-------------|
| `scaling_summary.ts` | L2 scaling solutions with TVL and activity data |
| `scaling_risk.ts` | L2 risk assessments (state validation, DA, exit window) |
| `scaling_activity.ts` | L2 daily transaction counts and UOPS comparison |
| `scaling_da.ts` | L2 data availability solutions comparison |
| `scaling_costs.ts` | L2 onchain cost comparison |

### RootData
| Recipe | Description |
|--------|-------------|
| `projects.ts` | Project listings with tags and indices |
| `project_detail.ts` | Detailed project info (team, investors, fundraising) |
| `exchanges_ranking.ts` | Exchange transparency scores and rankings |
| `fundraising.ts` | Recent crypto fundraising rounds |
| `investors.ts` | Crypto investor/VC rankings |
| `people.ts` | Crypto industry leaders directory |
| `rankings_soaring.ts` | Trending/soaring project rankings |
| `token_unlocks.ts` | Upcoming token unlock schedules |

### Arcscan (Arc Testnet)
| Recipe | Description |
|--------|-------------|
| `accounts.ts` | Top accounts by balance |
| `blocks.ts` | Recent blocks |
| `transactions.ts` | Recent transactions |
| `account_detail.ts` | Detailed info for a specific address |
| `block_detail.ts` | Detailed info for a specific block |
| `tx_detail.ts` | Detailed info for a specific transaction |
| `token_detail.ts` | Detailed info for a specific token |

### Worldscan (World Chain)
| Recipe | Description |
|--------|-------------|
| `blocks.ts` | Recent blocks |
| `transactions.ts` | Recent transactions |
| `address_detail.ts` | Detailed info for a specific address with token holdings |
| `block_detail.ts` | Detailed info for a specific block |
| `tx_detail.ts` | Detailed info for a specific transaction |
| `token_detail.ts` | Detailed info for a specific token |

### Flare
| Recipe | Description |
|--------|-------------|
| `blocks.ts` | Recent blocks with gas and rewards |
| `transactions.ts` | Recent transactions with from/to, value, fee |
| `tokens.ts` | Token listings with holders |
| `address_detail.ts` | Detailed info for a specific address |

### Hedera
| Recipe | Description |
|--------|-------------|
| `blocks.ts` | Recent blocks |
| `transactions.ts` | Recent transactions |
| `tokens.ts` | Token listings |
| `account_detail.ts` | Detailed info for a specific account |

### X (Twitter)
| Recipe | Description |
|--------|-------------|
| `profile.ts` | Recent posts from a user profile |
| `search.ts` | Search posts with advanced operators (from:, $TICKER, min_faves:, since:, etc.) |
| `post.ts` | Single post detail with replies |

## Quick Start

### TypeScript

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

# Examples with arguments
npx tsx coingecko/token_detail.ts bitcoin
npx tsx aave/markets.ts ethereum
npx tsx defillama/chain_overview.ts solana
npx tsx etherscan/gas_tracker.ts
npx tsx ens/reverse_lookup.ts 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
npx tsx l2beat/scaling_activity.ts
npx tsx uniswap/pool_detail.ts 0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640
```

### Python

The Python SDK uses the Node bridge to run all recipes:

```bash
cd recipes/python
export SELA_API_KEY=sk_live_your_key

# Run all recipes
python example_bridge.py

# Run specific recipes
python example_bridge.py token_prices
python example_bridge.py aave/markets defillama/stablecoins
python example_bridge.py etherscan/gas_tracker l2beat/scaling_activity
```

## Project Structure

```
selanet-web3-recipes/
└── recipes/
    ├── python/
    │   ├── selanet.py           # Node bridge SDK
    │   └── example_bridge.py    # Usage example
    └── typescript/
        ├── aave/          # Aave lending protocol
        ├── arcscan/       # Arc Testnet explorer
        ├── chainlink/     # Chainlink oracle feeds
        ├── coingecko/     # CoinGecko market data
        ├── defillama/     # DefiLlama DeFi analytics
        ├── ens/           # Ethereum Name Service
        ├── etherscan/     # Ethereum explorer
        ├── flare/         # Flare network explorer
        ├── hedera/        # Hedera network explorer
        ├── l2beat/        # L2 scaling analytics
        ├── rootdata/      # Crypto project & VC data
        ├── uniswap/       # Uniswap DEX data
        ├── worldscan/     # World Chain explorer
        ├── x/             # X (Twitter) social data
        ├── bridge.ts      # Node bridge for Python IPC
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
