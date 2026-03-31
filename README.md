# Selanet Web3 Recipes

A collection of recipes (example code) + dashboard UI for scraping data from major Web3 sites using the Selanet API.

## Recipes

| # | Recipe | Target | Description |
|---|--------|--------|-------------|
| 1 | Token Prices | CoinGecko | Top tokens by market cap, price changes |
| 2 | DeFi TVL | DeFiLlama | Protocol TVL rankings |
| 3 | NFT Collections | OpenSea | NFT collection floor price, volume |
| 4 | Gas Tracker | Etherscan | Ethereum gas fees |
| 5 | Whale Watch | Etherscan | Large whale wallet transactions |
| 6 | DEX Volumes | DeFiLlama | 24h trading volume by DEX |
| 7 | Token Unlocks | Token Unlocks | Token unlock schedule |
| 8 | Airdrop Tracker | Airdrops.io | Active airdrop listings |

## Quick Start

### 1. Set up API Key

```bash
cp .env.example .env
# Enter your SELA_API_KEY in the .env file
```

### 2. Run Python Recipes

```bash
cd recipes/python
pip install -r requirements.txt
export SELA_API_KEY=sk_live_your_key
python 01_token_prices.py
```

### 3. Run TypeScript Recipes

```bash
cd recipes/typescript
npm install
export SELA_API_KEY=sk_live_your_key
npx tsx coingecko/token_prices.ts
```

### 4. Run Dashboard UI

```bash
cd web
npm install
# Add SELA_API_KEY=sk_live_your_key to .env.local
npm run dev
# Open http://localhost:3000
```

## Project Structure

```
selanet-web3-recipes/
├── recipes/
│   ├── python/          # Python example code
│   └── typescript/      # TypeScript example code
├── web/                 # Next.js dashboard UI
│   ├── app/             # Pages + API Routes
│   ├── components/      # React components
│   └── lib/             # Recipe data, code snippets
└── docs/
    └── PRD.md           # Product Requirements Document
```

## Selanet API

```bash
curl -X POST https://api.selanet.ai/v1/browse \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk_live_YOUR_KEY" \
  -d '{"url":"https://www.coingecko.com","extract_format":"markdown"}'
```

- **Docs**: https://www.selanet.ai/resources/docs
- **SDK**: `pip install selanet-sdk`

## Tech Stack

- **Recipes**: Python (httpx), TypeScript (fetch)
- **UI**: Next.js 14, React, Tailwind CSS
- **API**: Selanet Browse API (`/v1/browse`)
