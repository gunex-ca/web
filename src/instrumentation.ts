import { env } from "./env";
import { createNLSearchModel, typesense } from "./server/typesense/client";
import { schemas } from "./server/typesense/schemas";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    for (const schema of schemas) {
      try {
        await typesense.collections().create(schema);
        console.log("Created collection", schema.name);
      } catch (error) {
        if (error.name !== "ObjectAlreadyExists") {
          console.error("Error creating collection", schema.name, error);
        }
      }
    }
    if (env.OPENAI_API_KEY != null) {
      await createNLSearchModel({
        id: "gpt-4o-base",
        model_name: "openai/gpt-4o",
        api_key: env.OPENAI_API_KEY,
        max_bytes: 1024 * 1024 * 10,
        temperature: 0.1,
      });
    }
  }
}
