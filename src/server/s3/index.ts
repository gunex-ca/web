import { S3Client } from "@aws-sdk/client-s3";
import { env } from "~/env";

export const s3 = new S3Client({
  region: env.AWS_REGION,
  endpoint: env.S3_ENDPOINT,
  forcePathStyle: true,
  credentials:
    env.AWS_ACCESS_KEY_ID && env.AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: env.AWS_ACCESS_KEY_ID,
          secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        }
      : undefined,
});

/**
 * Builds a public S3 URL from an objectKey
 * @param objectKey - The S3 object key (e.g., "raw/uuid-here")
 * @returns Complete URL to the S3 object
 */
export function buildImageUrl(objectKey: string): string {
  const baseUrl = env.S3_ENDPOINT;
  const bucket = env.LISTING_IMAGES_BUCKET;
  return `${baseUrl}/${bucket}/${objectKey}`;
}
