import { relations } from "drizzle-orm";
import { users, wishlists, wishlistShares, siteAnalytics } from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  wishlists: many(wishlists),
  wishlistShares: many(wishlistShares),
}));

export const wishlistsRelations = relations(wishlists, ({ one }) => ({
  user: one(users, {
    fields: [wishlists.userId],
    references: [users.id],
  }),
}));

export const wishlistSharesRelations = relations(wishlistShares, ({ one }) => ({
  user: one(users, {
    fields: [wishlistShares.userId],
    references: [users.id],
  }),
}));
