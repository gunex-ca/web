import { typesense } from "./server/typesense/client";
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
  }
}
