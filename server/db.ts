import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, orders, reviews, products, favorites, comments, statistics, InsertOrder, InsertReview, Order, Review, Product, InsertProduct, Favorite, InsertFavorite, Comment, InsertComment, Statistic, InsertStatistic } from "../drizzle/schema";
import { nanoid } from "nanoid";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export async function createOrder(data: Omit<InsertOrder, "orderNumber">) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const orderNumber = "VJ-" + nanoid(8).toUpperCase();
  await db.insert(orders).values({ ...data, orderNumber });
  const result = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);
  return result[0];
}

export async function getAllOrders() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).orderBy(desc(orders.createdAt));
}

export async function updateOrderStatus(id: number, status: Order["status"]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(orders).set({ status }).where(eq(orders.id, id));
}

export async function getOrderByStripeSessionId(sessionId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(orders).where(eq(orders.stripeSessionId, sessionId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateOrderStripeSessionId(orderId: number, sessionId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(orders).set({ stripeSessionId: sessionId }).where(eq(orders.id, orderId));
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

export async function createReview(data: InsertReview) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(reviews).values(data);
}

export async function getApprovedReviews() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reviews).where(eq(reviews.approved, "approved")).orderBy(desc(reviews.createdAt));
}

export async function getAllReviews() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reviews).orderBy(desc(reviews.createdAt));
}

export async function updateReviewStatus(id: number, approved: Review["approved"]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(reviews).set({ approved }).where(eq(reviews.id, id));
}

// ─── Products ────────────────────────────────────────────────────────────────────

export async function createProduct(data: InsertProduct) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(products).values(data);
  return result;
}

export async function getAllProducts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).orderBy(desc(products.createdAt));
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result[0];
}

export async function updateProduct(id: number, data: Partial<Product>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(products).set(data).where(eq(products.id, id));
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(products).where(eq(products.id, id));
}

// ─── Favorites ────────────────────────────────────────────────────────────────────

export async function addToFavorites(userId: number, productId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(favorites).values({ userId, productId });
}

export async function removeFromFavorites(userId: number, productId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(favorites).where(and(eq(favorites.userId, userId), eq(favorites.productId, productId)));
}

export async function getUserFavorites(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(favorites).where(eq(favorites.userId, userId));
}

export async function isFavorite(userId: number, productId: number) {
  const db = await getDb();
  if (!db) return false;
  const result = await db.select().from(favorites).where(and(eq(favorites.userId, userId), eq(favorites.productId, productId))).limit(1);
  return result.length > 0;
}

// ─── Comments ────────────────────────────────────────────────────────────────────

export async function createComment(data: InsertComment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(comments).values(data);
}

export async function getProductComments(productId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(comments).where(and(eq(comments.productId, productId), eq(comments.approved, "approved"))).orderBy(desc(comments.createdAt));
}

export async function getAllComments() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(comments).orderBy(desc(comments.createdAt));
}

export async function updateCommentStatus(id: number, approved: Comment["approved"]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(comments).set({ approved }).where(eq(comments.id, id));
}

// ─── Statistics ────────────────────────────────────────────────────────────────────

export async function getOrCreateDailyStats(date: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await db.select().from(statistics).where(eq(statistics.date, date)).limit(1);
  if (existing.length > 0) return existing[0];
  const result = await db.insert(statistics).values({ date });
  return result;
}

export async function updateStatistics(date: string, data: Partial<Statistic>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(statistics).set(data).where(eq(statistics.date, date));
}

export async function getStatistics() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(statistics).orderBy(desc(statistics.date)).limit(30);
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function getAllUsers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(users).orderBy(desc(users.createdAt));
}

export async function updateUserPlasticSaved(userId: number, amount: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(users).set({ plasticSaved: amount.toString() }).where(eq(users.id, userId));
}

export type { Order, Review, Product, Favorite, Comment, Statistic };
