import { Client } from "typesense";
import { env } from "~/env";

export const typesense = new Client({
  nodes: [
    {
      host: env.TYPESENSE_HOST,
      port: env.TYPESENSE_PORT,
      protocol: "http",
    },
  ],
  apiKey: env.TYPESENSE_API_KEY,
  connectionTimeoutSeconds: 2,
});

export async function createNLSearchModel(body: {
  id: string;
  model_name: string;
  api_key: string;
  max_bytes: number;
  temperature: number;
}) {
  const url = `http://${env.TYPESENSE_HOST}:${env.TYPESENSE_PORT}/nl_search_models`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "X-TYPESENSE-API-KEY": env.TYPESENSE_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Failed to create Gemini NL Search Model: ${res.status} ${text}`,
    );
  }

  return res.json();
}
