/**
 * Recipe: L2 Scaling Risk Analysis from L2Beat
 * Scrapes Layer 2 risk assessments (state validation, DA, exit window, etc.).
 *
 * URL: https://l2beat.com/scaling/risk
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx l2beat/scaling_risk.ts
 */

import "dotenv/config";
import { browse } from "../utils.js";

interface L2ScalingRisk {
  rank: number;
  name: string;
  slug: string;
  url: string;
  image: string;
  state_validation: string;
  data_availability: string;
  exit_window: string;
  sequencer_failure: string;
  proposer_failure: string;
}

function cleanCell(cell: string): string {
  return cell.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").trim();
}

export function parseMarkdownTable(markdown: string): L2ScalingRisk[] {
  const lines = markdown.split("\n");
  const results: L2ScalingRisk[] = [];

  for (const line of lines) {
    if (!line.startsWith("|")) continue;

    const cells = line.split("|").map((c) => c.trim());
    // cells: [empty, rank, icon, name, state_val, da, exit_window, seq_failure, prop_failure, empty]

    const rank = parseInt(cells[1], 10);
    if (isNaN(rank)) continue;

    const iconCell = cells[2] || "";
    const imgMatch = iconCell.match(/!\[[^\]]*\]\(([^)]+)\)/);

    const nameCell = cells[3] || "";
    const nameMatch = nameCell.match(
      /\[([^\]]+)\]\((https:\/\/l2beat\.com\/scaling\/projects\/([^)#]+))/
    );
    if (!nameMatch) continue;

    results.push({
      rank,
      name: nameMatch[1],
      slug: nameMatch[3],
      url: nameMatch[2],
      image: imgMatch ? imgMatch[1] : "",
      state_validation: cleanCell(cells[4] || ""),
      data_availability: cleanCell(cells[5] || ""),
      exit_window: cleanCell(cells[6] || ""),
      sequencer_failure: cleanCell(cells[7] || ""),
      proposer_failure: cleanCell(cells[8] || ""),
    });
  }

  return results;
}

async function main() {
  console.log("Fetching L2 scaling risk analysis from L2Beat...\n");
  const data = await browse("https://l2beat.com/scaling/risk");
  const markdown = data?.extracted_content ?? "";
  const risks = parseMarkdownTable(markdown);
  console.log(JSON.stringify(risks, null, 2));
}

const isDirectRun = process.argv[1]?.endsWith("scaling_risk.ts") || process.argv[1]?.endsWith("scaling_risk.js");
if (isDirectRun) main();
