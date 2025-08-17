import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { magicLink } from "better-auth/plugins";
import { db } from "~/server/db"; // your drizzle instance

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  generateId: false,
  plugins: [expo(), username(), magicLink({ sendMagicLink: () => {} })],
  emailAndPassword: { enabled: true },
});
