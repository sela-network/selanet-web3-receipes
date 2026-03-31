/**
 * Selanet API Helper Utilities
 * Common Selanet API request helpers
 */

import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../../.env") });

const SELA_API_KEY = process.env.SELA_API_KEY;
const SELA_BASE_URL = "https://api.selanet.ai/v1";

function getHeaders(): Record<string, string> {
  if (!SELA_API_KEY) {
    throw new Error("SELA_API_KEY environment variable is required. See .env.example");
  }
  return {
    Authorization: `Bearer ${SELA_API_KEY}`,
    "Content-Type": "application/json",
  };
}

export async function browse(
  url: string,
  extractFormat: string = "markdown"
): Promise<any> {
  const resp = await fetch(`${SELA_BASE_URL}/browse`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ url, extract_format: extractFormat }),
  });
  if (!resp.ok) throw new Error(`Selanet API error: ${resp.status}`);
  return resp.json();
}

export async function browseParallel(
  urls: string[],
  extractFormat: string = "markdown"
): Promise<any> {
  const requests = urls.map((url) => ({ url, extract_format: extractFormat }));
  const resp = await fetch(`${SELA_BASE_URL}/browse/parallel`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ requests }),
  });
  if (!resp.ok) throw new Error(`Selanet API error: ${resp.status}`);
  return resp.json();
}

export function printMarkdown(data: any): void {
  const content = data?.extracted_content;
  if (content) {
    console.log(content);
  } else {
    console.log("No extracted_content found. Keys:", Object.keys(data));
  }
}
