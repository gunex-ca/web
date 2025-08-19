import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { magicLink } from "better-auth/plugins";
import { db } from "~/server/db"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),

  advanced: {
    database: {
      generateId: false,
    },
  },

  plugins: [
    expo(),
    username(),
    magicLink({ sendMagicLink: () => {} }),
    nextCookies(),
  ],
  emailAndPassword: { enabled: true },
});
