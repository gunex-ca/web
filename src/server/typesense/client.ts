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
