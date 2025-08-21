import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { user } from "./auth";

export const formSubmission = pgTable(
  "form_submission",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    endpoint: varchar("endpoint", { length: 64 }).notNull(),
    type: varchar("type", { length: 64 }),
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    data: jsonb("data").$type<Record<string, any>>().notNull(),
    ip: varchar("ip", { length: 64 }),
    userAgent: varchar("user_agent", { length: 256 }),
    referer: text("referer"),
    userId: uuid("user_id").references(() => user.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("form_submission_user_id_idx").on(table.userId)],
);

export type FormSubmissionInsert = InferInsertModel<typeof formSubmission>;
export type FormSubmissionSelect = InferSelectModel<typeof formSubmission>;

export const formSubmissionInsertSchema = createInsertSchema(formSubmission);
export const formSubmissionSelectSchema = createSelectSchema(formSubmission);
