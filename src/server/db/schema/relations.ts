import { relations } from "drizzle-orm";
import { account, user } from "./auth";
import { favorite, listing, listingExternal, listingImage } from "./listing";
import { review } from "./review";

export const userRelations = relations(user, ({ many }) => ({
  account: many(account),
  listings: many(listing),
  reviewsGiven: many(review, { relationName: "reviewer" }),
  reviewsReceived: many(review, { relationName: "reviewee" }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const listingRelations = relations(listing, ({ many, one }) => ({
  seller: one(user, { fields: [listing.sellerId], references: [user.id] }),
  images: many(listingImage),
  externals: many(listingExternal),
  reviews: many(review),
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
  }),
);

export const reviewRelations = relations(review, ({ one }) => ({
  reviewer: one(user, { fields: [review.reviewerId], references: [user.id] }),
  reviewee: one(user, { fields: [review.revieweeId], references: [user.id] }),
}));

export const favoriteRelations = relations(favorite, ({ one }) => ({
  user: one(user, { fields: [favorite.userId], references: [user.id] }),
  listing: one(listing, {
    fields: [favorite.listingId],
    references: [listing.id],
  }),
}));
