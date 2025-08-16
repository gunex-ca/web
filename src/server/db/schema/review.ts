import { index, pgTable, uniqueIndex } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const review = pgTable(
  "review",
  (t) => ({
    id: t.uuid("id").primaryKey().defaultRandom().notNull(),
    reviewerId: t
      .uuid("reviewer_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    revieweeId: t
      .uuid("reviewee_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    rating: t.integer("rating").notNull(),
    title: t.varchar("title", { length: 120 }),
    content: t.text("content"),
    createdAt: t.timestamp("created_at").defaultNow().notNull(),
    updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
  }),
  (table) => [
    index("review_reviewer_id_idx").on(table.reviewerId),
    index("review_reviewee_id_idx").on(table.revieweeId),
    uniqueIndex("review_reviewer_reviewee_uk").on(
      table.reviewerId,
      table.revieweeId
    ),
  ]
);
