import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import { magicLink } from "better-auth/plugins";
import { phoneNumber } from "better-auth/plugins";
import { eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";
import slugify from "slugify";
import { db } from "~/server/db"; // your drizzle instance
import * as schema from "~/server/db/schema";

const randomUsernameSuffix = customAlphabet(
  "abcdefghijklmnopqrstuvwxyz0123456789",
  4,
);

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),

  advanced: {
    database: {
      generateId: false,
    },
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const username = user.email.split("@")[0];
          const random = randomUsernameSuffix();
          await db
            .update(schema.user)
            .set({ username: slugify(`${username}${random}`) })
            .where(eq(schema.user.id, user.id));
        },
      },
    },
  },

  plugins: [
    phoneNumber(),
    expo(),
    username(),
    magicLink({ sendMagicLink: () => {} }),
    nextCookies(),
  ],
  emailAndPassword: { enabled: true },
});
