import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customAlphabet } from "nanoid";
import { user } from "./auth";

const listingId = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 12);

// Enums
export const categoryEnum = pgEnum("category", [
  "firearm",
  "ammunition",
  "accessory",
  "parts",
  "optics",
  "apparel",
  "service",
]);

export const firearmTypeEnum = pgEnum("firearm_type", [
  "rifle",
  "shotgun",
  "handgun",
  "carbine",
  "other",
]);

export const firearmClassEnum = pgEnum("firearm_class", [
  // Canadian classifications
  "non_restricted",
  "restricted",
  "prohibited",
]);

export const conditionEnum = pgEnum("condition", [
  "new",
  "excellent",
  "good",
  "fair",
  "poor",
]);

export const listingStatusEnum = pgEnum("listing_status", [
  "draft",
  "active",
  "sold",
  "archived",
  "removed",
]);

export const offerStatusEnum = pgEnum("offer_status", [
  "pending",
  "accepted",
  "declined",
  "withdrawn",
  "expired",
]);

export const externalLinkStatusEnum = pgEnum("external_link_status", [
  "linked",
  "imported",
  "synced",
  "failed",
  "unpublished",
]);

export const userStatusEnum = pgEnum("user_status", [
  "active",
  "suspended",
  "deleted",
]);

export const provinceEnum = pgEnum("province", [
  // Provinces and territories
  "AB",
  "BC",
  "MB",
  "NB",
  "NL",
  "NS",
  "NT",
  "NU",
  "ON",
  "PE",
  "QC",
  "SK",
  "YT",
]);

// Minimal demo table to keep existing TRPC router working
export const posts = pgTable("post", (t) => ({
  id: t.uuid("id").primaryKey().defaultRandom().notNull(),
  name: t.varchar("name", { length: 256 }).notNull(),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
}));

// Listings
export const listing = pgTable(
  "listing",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    publicId: varchar("public_id", { length: 12 })
      .notNull()
      .unique()
      .$defaultFn(() => listingId()),
    sellerId: uuid("seller_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    category: categoryEnum("category").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),

    // Pricing
    price: numeric("price", { precision: 10, scale: 2 }),

    // Item meta
    condition: conditionEnum("condition"),

    // Location
    province: provinceEnum("province"),
    city: varchar("city", { length: 120 }),

    // Category-specific properties (caliber, action, brand, etc.)
    properties: jsonb("properties"),

    status: listingStatusEnum("status").default("draft").notNull(),

    // Cross-post/import flags
    imported: boolean("imported").default(false).notNull(),
    importedAt: timestamp("imported_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("listings_seller_id_idx").on(table.sellerId),
    index("listings_category_idx").on(table.category),
    index("listings_status_idx").on(table.status),
    index("listings_province_idx").on(table.province),
    index("listings_price_idx").on(table.price),
    uniqueIndex("listings_public_id_uk").on(table.publicId),
  ]
);

export type ListingInsert = InferInsertModel<typeof listing>;
export type ListingSelect = InferSelectModel<typeof listing>;

export const listingSelectSchema = createSelectSchema(listing);
export const listingInsertSchema = createInsertSchema(listing);

// Listing view events (for analytics and deduplication)
export const listingView = pgTable(
  "listing_view",
  (t) => ({
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    listingId: uuid("listing_id")
      .notNull()
      .references(() => listing.id, { onDelete: "cascade" }),
    viewerId: uuid("viewer_id").references(() => user.id, {
      onDelete: "set null",
    }),
    ipHash: varchar("ip_hash", { length: 64 }),
    userAgent: varchar("user_agent", { length: 256 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  }),
  (table) => [
    index("listing_view_listing_id_idx").on(table.listingId),
    index("listing_view_viewer_id_idx").on(table.viewerId),
  ]
);

// Listing images
export const listingImage = pgTable(
  "listing_image",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    listingId: uuid("listing_id")
      .notNull()
      .references(() => listing.id, { onDelete: "cascade" }),
    url: varchar("url", { length: 2048 }).notNull(),
    alt: varchar("alt", { length: 255 }),
    sortOrder: integer("sort_order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("listing_images_listing_id_idx").on(table.listingId)]
);

// Cross-post/external references
export const listingExternal = pgTable(
  "listing_external",
  (t) => ({
    id: t.uuid("id").primaryKey().notNull().defaultRandom(),
    listingId: t
      .uuid("listing_id")
      .notNull()
      .references(() => listing.id, { onDelete: "cascade" }),
    platform: t.varchar("platform", { length: 64 }).notNull(),
    externalId: t.varchar("external_id", { length: 128 }),
    url: t.varchar("url", { length: 2048 }),
    meta: t.jsonb("meta"),
    firstSeenAt: t.timestamp("first_seen_at").defaultNow().notNull(),
    lastSyncedAt: t.timestamp("last_synced_at"),
    createdAt: t.timestamp("created_at").defaultNow().notNull(),
    updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
  }),
  (table) => [
    index("listing_external_listing_id_idx").on(table.listingId),
    index("listing_external_platform_idx").on(table.platform),
    uniqueIndex("listing_external_platform_external_id_uk").on(
      table.platform,
      table.externalId
    ),
  ]
);

// Favorites (wishlists)
export const favorite = pgTable(
  "favorite",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    listingId: uuid("listing_id")
      .notNull()
      .references(() => listing.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("favorites_user_listing_uk").on(table.userId, table.listingId),
  ]
);

// Messages (simple listing-based messaging)
export const message = pgTable(
  "message",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    listingId: uuid("listing_id")
      .notNull()
      .references(() => listing.id, { onDelete: "cascade" }),
    senderId: uuid("sender_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    receiverId: uuid("receiver_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    readAt: timestamp("read_at"),
  },
  (table) => [
    index("messages_listing_id_idx").on(table.listingId),
    index("messages_sender_id_idx").on(table.senderId),
    index("messages_receiver_id_idx").on(table.receiverId),
  ]
);

export const listingReport = pgTable(
  "listing_report",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    reporterId: uuid("reporter_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    listingId: uuid("listing_id").references(() => listing.id, {
      onDelete: "cascade",
    }),
    messageId: uuid("message_id").references(() => message.id, {
      onDelete: "cascade",
    }),
    reason: text("reason").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("reports_reporter_id_idx").on(table.reporterId)]
);

export const listingRelations = relations(listing, ({ many }) => ({
  images: many(listingImage),
  externals: many(listingExternal),
}));

export const listingImageRelations = relations(listingImage, ({ one }) => ({
  listing: one(listing, {
    fields: [listingImage.listingId],
    references: [listing.id],
  }),
}));

export const listingExternalRelations = relations(
  listingExternal,
  ({ one }) => ({
    listing: one(listing, {
      fields: [listingExternal.listingId],
      references: [listing.id],
    }),
  })
);
