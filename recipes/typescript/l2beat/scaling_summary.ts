/**
 * Recipe: L2 Scaling Summary from L2Beat
 * Scrapes Layer 2 scaling solutions with TVL and activity data.
 *
 * URL: https://l2beat.com/scaling/summary
 * Usage:
 *   export SELA_API_KEY=sk_live_xxx
 *   npx tsx l2beat/scaling_summary.ts
 */

import "dotenv/config";
import { browse } from "../utils.js";

interface L2ScalingSummary {
  rank: number;
  name: string;
  slug: string;
  url: string;
  image: string;
  proof_system: string;
  stage: string;
  total_value_secured: string;
  past_day_uops: string;
}

export function parseMarkdownTable(markdown: string): L2ScalingSummary[] {
  const lines = markdown.split("\n");
  const results: L2ScalingSummary[] = [];

  for (const line of lines) {
    if (!line.startsWith("|")) continue;

    const cells = line.split("|").map((c) => c.trim());
    // cells: [empty, rank, icon, name, risks, proof_system, stage, tvs, uops, empty]

    const rank = parseInt(cells[1], 10);
    if (isNaN(rank)) continue;

    const iconCell = cells[2] || "";
    const imgMatch = iconCell.match(/!\[[^\]]*\]\(([^)]+)\)/);
    const image = imgMatch ? imgMatch[1] : "";

    const nameCell = cells[3] || "";
    const nameMatch = nameCell.match(
      /\[([^\]]+)\]\((https:\/\/l2beat\.com\/scaling\/projects\/([^)#]+))/
    );
    if (!nameMatch) continue;

    // Proof system: "[Optimistic  BoLD](url)"
    const proofCell = cells[5] || "";
    const proofText = proofCell.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").trim();

    // Stage: "[Stage 1](url)"
    const stageCell = cells[6] || "";
    const stageMatch = stageCell.match(/\[([^\]]+)\]/);
    const stage = stageMatch ? stageMatch[1] : stageCell;

    // TVS: "[$15.48 B4.51%](url)"
    const tvsCell = cells[7] || "";
    const tvsMatch = tvsCell.match(/\[([^\]]+)\]/);
    const tvs = tvsMatch ? tvsMatch[1] : tvsCell;

    // UOPS: "[17.8937.5%](url)"
    const uopsCell = cells[8] || "";
    const uopsMatch = uopsCell.match(/\[([^\]]+)\]/);
    const uops = uopsMatch ? uopsMatch[1] : uopsCell;

    results.push({
      rank,
      name: nameMatch[1],
      slug: nameMatch[3],
      url: nameMatch[2],
      image,
      proof_system: proofText,
      stage,
      total_value_secured: tvs,
      past_day_uops: uops,
    });
  }

  return results;
}

async function main() {
  console.log("Fetching L2 scaling summary from L2Beat...\n");
  const data = await browse("https://l2beat.com/scaling/summary");
  const markdown = data?.extracted_content ?? "";
  const l2s = parseMarkdownTable(markdown);
  console.log(JSON.stringify(l2s, null, 2));
}

const isDirectRun = process.argv[1]?.endsWith("scaling_summary.ts") || process.argv[1]?.endsWith("scaling_summary.js");
if (isDirectRun) main();
