import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, orders, reviews, products, favorites, comments, statistics, newsletterSubscribers, campaigns, campaignAnalytics, subscriberSegments, InsertOrder, InsertReview, Order, Review, Product, InsertProduct, Favorite, InsertFavorite, Comment, InsertComment, Statistic, InsertStatistic, NewsletterSubscriber, InsertNewsletterSubscriber, Campaign, InsertCampaign, CampaignAnalytic, InsertCampaignAnalytic, SubscriberSegment, InsertSubscriberSegment } from "../drizzle/schema";
import { nanoid } from "nanoid";
import { ENV } from './_core/env';
import { sendWelcomeEmail, sendCampaignToSubscribers } from './_core/emailService';

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

// ─── Newsletter Subscribers ────────────────────────────────────────────────────

export async function subscribeToNewsletter(email: string): Promise<NewsletterSubscriber | null> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    // Try to insert new subscriber
    await db.insert(newsletterSubscribers).values({
      email,
      isActive: "active",
    });
    
    // Send welcome email
    await sendWelcomeEmail(email).catch(err => {
      console.warn(`[Newsletter] Failed to send welcome email to ${email}:`, err);
    });
    
    // Return the inserted subscriber
    const result = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email)).limit(1);
    return result[0] || null;
  } catch (error: any) {
    // If email already exists, update to active
    if (error.code === 'ER_DUP_ENTRY') {
      await db.update(newsletterSubscribers)
        .set({ isActive: "active", unsubscribedAt: null })
        .where(eq(newsletterSubscribers.email, email));
      
      // Send welcome email for re-subscription
      await sendWelcomeEmail(email).catch(err => {
        console.warn(`[Newsletter] Failed to send welcome email to ${email}:`, err);
      });
      
      const result = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email)).limit(1);
      return result[0] || null;
    }
    throw error;
  }
}

export async function getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.subscribedAt));
}

export async function getActiveNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.isActive, "active"))
    .orderBy(desc(newsletterSubscribers.subscribedAt));
}

export async function unsubscribeFromNewsletter(email: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(newsletterSubscribers)
    .set({ isActive: "inactive", unsubscribedAt: new Date() })
    .where(eq(newsletterSubscribers.email, email));
}

export type { NewsletterSubscriber };


/**
 * Campaign management functions
 */
export async function createCampaign(
  data: Omit<InsertCampaign, 'createdAt' | 'updatedAt'> & { createdBy: number }
): Promise<Campaign | null> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    await db.insert(campaigns).values({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as InsertCampaign);
    
    // Get the last inserted campaign
    const result = await db.select().from(campaigns).orderBy(desc(campaigns.id)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[Campaign] Error creating campaign:", error);
    throw error;
  }
}

export async function getCampaigns(): Promise<Campaign[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(campaigns).orderBy(desc(campaigns.createdAt));
}

export async function getCampaignById(id: number): Promise<Campaign | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(campaigns).where(eq(campaigns.id, id)).limit(1);
  return result[0] || null;
}

export async function updateCampaign(
  id: number,
  data: Partial<Omit<Campaign, 'id' | 'createdAt' | 'createdBy'>>
): Promise<Campaign | null> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    await db.update(campaigns)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(campaigns.id, id));
    
    const result = await db.select().from(campaigns).where(eq(campaigns.id, id)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[Campaign] Error updating campaign:", error);
    throw error;
  }
}

export async function sendCampaign(id: number): Promise<{ sent: number; failed: number }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    // Get campaign
    const campaign = await getCampaignById(id);
    if (!campaign) throw new Error("Campaign not found");
    
    if (campaign.status !== "draft") {
      throw new Error("Only draft campaigns can be sent");
    }
    
    // Get active subscribers
    const subscribers = await getActiveNewsletterSubscribers();
    
    // Update campaign status to sending
    await updateCampaign(id, {
      status: "sending",
      recipientCount: subscribers.length,
    });
    
    // Send campaign to all subscribers
    const result = await sendCampaignToSubscribers(
      campaign.subject,
      campaign.content,
      subscribers
    );
    
    // Update campaign with results
    await updateCampaign(id, {
      status: result.failed === 0 ? "sent" : "failed",
      sentCount: result.sent,
      failedCount: result.failed,
      sentAt: new Date(),
    });
    
    return result;
  } catch (error) {
    console.error("[Campaign] Error sending campaign:", error);
    // Update campaign status to failed
    await updateCampaign(id, { status: "failed" }).catch(() => {});
    throw error;
  }
}

export async function deleteCampaign(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    const campaign = await getCampaignById(id);
    if (campaign && campaign.status !== "draft") {
      throw new Error("Only draft campaigns can be deleted");
    }
    
    await db.delete(campaigns).where(eq(campaigns.id, id));
  } catch (error) {
    console.error("[Campaign] Error deleting campaign:", error);
    throw error;
  }
}

export type { Campaign };

// ============ Campaign Analytics Functions ============

export async function trackCampaignOpen(
  campaignId: number,
  subscriberId: number,
  email: string
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    // Check if record exists
    const existing = await db
      .select()
      .from(campaignAnalytics)
      .where(
        and(
          eq(campaignAnalytics.campaignId, campaignId),
          eq(campaignAnalytics.subscriberId, subscriberId)
        )
      )
      .limit(1);
    
    if (existing.length > 0) {
      // Update existing record
      await db
        .update(campaignAnalytics)
        .set({ opened: 1, openedAt: new Date() })
        .where(
          and(
            eq(campaignAnalytics.campaignId, campaignId),
            eq(campaignAnalytics.subscriberId, subscriberId)
          )
        );
    } else {
      // Create new record
      await db.insert(campaignAnalytics).values({
        campaignId,
        subscriberId,
        email,
        opened: 1,
        openedAt: new Date(),
        clicked: 0,
      });
    }
    
    // Update campaign open count
    const analytics = await db
      .select()
      .from(campaignAnalytics)
      .where(eq(campaignAnalytics.campaignId, campaignId));
    
    const openCount = analytics.filter((a) => a.opened === 1).length;
    await db
      .update(campaigns)
      .set({ openCount })
      .where(eq(campaigns.id, campaignId));
  } catch (error) {
    console.error("[Analytics] Error tracking open:", error);
  }
}

export async function trackCampaignClick(
  campaignId: number,
  subscriberId: number,
  email: string
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    // Check if record exists
    const existing = await db
      .select()
      .from(campaignAnalytics)
      .where(
        and(
          eq(campaignAnalytics.campaignId, campaignId),
          eq(campaignAnalytics.subscriberId, subscriberId)
        )
      )
      .limit(1);
    
    if (existing.length > 0) {
      // Update existing record
      await db
        .update(campaignAnalytics)
        .set({ clicked: 1, clickedAt: new Date() })
        .where(
          and(
            eq(campaignAnalytics.campaignId, campaignId),
            eq(campaignAnalytics.subscriberId, subscriberId)
          )
        );
    } else {
      // Create new record
      await db.insert(campaignAnalytics).values({
        campaignId,
        subscriberId,
        email,
        opened: 0,
        clicked: 1,
        clickedAt: new Date(),
      });
    }
    
    // Update campaign click count
    const analytics = await db
      .select()
      .from(campaignAnalytics)
      .where(eq(campaignAnalytics.campaignId, campaignId));
    
    const clickCount = analytics.filter((a) => a.clicked === 1).length;
    await db
      .update(campaigns)
      .set({ clickCount })
      .where(eq(campaigns.id, campaignId));
  } catch (error) {
    console.error("[Analytics] Error tracking click:", error);
  }
}

export async function getCampaignAnalytics(campaignId: number): Promise<CampaignAnalytic[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(campaignAnalytics)
    .where(eq(campaignAnalytics.campaignId, campaignId));
}

// ============ Subscriber Segmentation Functions ============

export async function addSubscriberSegment(
  subscriberId: number,
  segment: string
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    // Check if segment already exists
    const existing = await db
      .select()
      .from(subscriberSegments)
      .where(
        and(
          eq(subscriberSegments.subscriberId, subscriberId),
          eq(subscriberSegments.segment, segment)
        )
      )
      .limit(1);
    
    if (existing.length === 0) {
      await db.insert(subscriberSegments).values({
        subscriberId,
        segment,
      });
    }
  } catch (error) {
    console.error("[Segments] Error adding segment:", error);
    throw error;
  }
}

export async function removeSubscriberSegment(
  subscriberId: number,
  segment: string
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    await db
      .delete(subscriberSegments)
      .where(
        and(
          eq(subscriberSegments.subscriberId, subscriberId),
          eq(subscriberSegments.segment, segment)
        )
      );
  } catch (error) {
    console.error("[Segments] Error removing segment:", error);
    throw error;
  }
}

export async function getSubscriberSegments(subscriberId: number): Promise<string[]> {
  const db = await getDb();
  if (!db) return [];
  
  const segments = await db
    .select()
    .from(subscriberSegments)
    .where(eq(subscriberSegments.subscriberId, subscriberId));
  
  return segments.map((s) => s.segment);
}

export async function getSubscribersBySegment(segment: string): Promise<NewsletterSubscriber[]> {
  const db = await getDb();
  if (!db) return [];
  
  const subscriberIds = await db
    .select({ subscriberId: subscriberSegments.subscriberId })
    .from(subscriberSegments)
    .where(eq(subscriberSegments.segment, segment));
  
  if (subscriberIds.length === 0) return [];
  
  return db
    .select()
    .from(newsletterSubscribers)
    .where(
      and(
        eq(newsletterSubscribers.isActive, "active"),
        ...subscriberIds.map((s) => eq(newsletterSubscribers.id, s.subscriberId))
      )
    );
}
