# Selanet Web3 Recipes — Product Requirements Document

## 1. Overview

**Project Name**: Selanet Web3 Recipes
**Goal**: A recipe (example code) + dashboard UI project that demonstrates how Web3 project teams can collect and query useful data from major Web3 sites (CoinGecko, DeFiLlama, OpenSea, Etherscan, etc.) using the Selanet API.

**Target Users**: Web3 project developers, researchers, data analysts
**Outcome**: Provide copy-paste-ready example code to drive Selanet API adoption.

---

## 2. Background

### What is Selanet API?
Selanet is a web scraping API service built on a P2P Agent Node network. It remotely controls browser sessions to navigate pages and extract structured data (schema) or unstructured data (markdown/html).

### Core API
| Endpoint | Description |
|----------|-------------|
| `POST /v1/browse` | Scrape a single URL. `extract_format`: schema, markdown, html |
| `POST /v1/browse/parallel` | Scrape up to 100 URLs concurrently |

### Authentication
- `Authorization: Bearer sk_live_xxx` header
- Python SDK: `pip install selanet-sdk`

---

## 3. Requirements

### 3.1 Recipe Example Code (Must Have)
- Provide recipes in both **Python + TypeScript**
- Each recipe is a standalone single-file executable
- Consistent pattern for loading API keys from `.env`
- Copy-paste and immediately runnable

| # | Recipe | Target Site | Data |
|---|--------|-------------|------|
| 1 | Token Prices | CoinGecko | Top tokens by market cap, 24h price change |
| 2 | DeFi TVL | DeFiLlama | Protocol TVL rankings |
| 3 | NFT Collections | OpenSea | Popular NFT collection floor price, volume |
| 4 | Gas Tracker | Etherscan | Current gas fees, recommended gas prices |
| 5 | Whale Watch | Etherscan | Large whale wallet transactions |
| 6 | DEX Volumes | DeFiLlama | 24h trading volume by DEX |
| 7 | Token Unlocks | Token Unlocks | Upcoming token unlock events |
| 8 | Airdrop Tracker | Airdrops.io | Active airdrop listings |

### 3.2 Dashboard UI (Must Have)
- Next.js 14 App Router + Tailwind CSS
- **Home page**: Recipe card grid, key Web3 metric widgets
- **Recipe detail page**:
  - Python / TypeScript tab-switching code view (with copy button)
  - Live Demo — click button to call Selanet API and display results in real-time
- **API Routes**: Securely proxy Selanet API key on the server side

### 3.3 Documentation (Must Have)
- README.md: Installation, usage, and structure guide
- Usage comments at the top of each recipe file

### 3.4 Nice to Have
- Recipe result caching
- Dark mode
- Recipe search/filter

---

## 4. Technical Architecture

```
User -> Next.js UI -> API Route -> Selanet API (api.selanet.ai/v1/browse)
                                        |
                                P2P Agent Nodes -> Target Website
                                        |
                                Structured Data (JSON)
```

### Tech Stack
- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes (Selanet API proxy)
- **Recipe Code**: Python (httpx), TypeScript (fetch)
- **Deployment**: Vercel (recommended)

---

## 5. API Usage Pattern

### cURL (Reference)
```bash
curl -X POST https://api.selanet.ai/v1/browse \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk_live_xxx" \
  -d '{"url":"https://www.coingecko.com","extract_format":"markdown"}'
```

### Python
```python
import httpx, os
resp = httpx.post("https://api.selanet.ai/v1/browse",
    headers={"Authorization": f"Bearer {os.getenv('SELA_API_KEY')}",
             "Content-Type": "application/json"},
    json={"url": "https://www.coingecko.com", "extract_format": "markdown"})
data = resp.json()
```

### TypeScript
```typescript
const resp = await fetch("https://api.selanet.ai/v1/browse", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.SELA_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ url: "https://www.coingecko.com", extract_format: "markdown" }),
});
const data = await resp.json();
```

---

## 6. Success Metrics
- Web3 teams can copy a recipe and make their first API call within 5 minutes
- Dashboard Live Demo shows real-time data
- Growth in GitHub repository stars and forks
