import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock DB and notification modules
vi.mock("./db", () => ({
  createOrder: vi.fn().mockResolvedValue({ id: 1, orderNumber: "ORD-001" }),
  getAllOrders: vi.fn().mockResolvedValue([]),
  updateOrderStatus: vi.fn().mockResolvedValue(undefined),
  createReview: vi.fn().mockResolvedValue({ id: 1 }),
  getApprovedReviews: vi.fn().mockResolvedValue([]),
  getAllReviews: vi.fn().mockResolvedValue([]),
  updateReviewStatus: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createAdminCtx(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@example.com",
      name: "Admin",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createUserCtx(): TrpcContext {
  return {
    user: {
      id: 2,
      openId: "regular-user",
      email: "user@example.com",
      name: "User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

const sampleOrderInput = {
  customerName: "Анна Иванова",
  customerEmail: "anna@example.com",
  customerPhone: "+375291234567",
  deliveryMethod: "courier",
  deliveryAddress: "г. Минск, ул. Примерная, 1",
  paymentMethod: "card",
  items: [{ id: 1, name: 'Колье "Гармония"', price: 21, quantity: 1, image: "https://example.com/img.jpg" }],
  subtotal: 21,
  deliveryCost: 5,
  total: 26,
  notes: "Без примечаний",
};

describe("orders.create", () => {
  it("creates an order and returns orderNumber", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const result = await caller.orders.create(sampleOrderInput);
    expect(result.success).toBe(true);
    expect(result.orderNumber).toBe("ORD-001");
  });
});

describe("orders.list", () => {
  it("returns orders for admin", async () => {
    const caller = appRouter.createCaller(createAdminCtx());
    const result = await caller.orders.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("throws FORBIDDEN for non-admin", async () => {
    const caller = appRouter.createCaller(createUserCtx());
    await expect(caller.orders.list()).rejects.toThrow();
  });
});

describe("reviews.submit", () => {
  it("submits a review successfully", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const result = await caller.reviews.submit({
      name: "Мария К.",
      rating: 5,
      text: "Отличные украшения, очень довольна покупкой!",
      product: 'Колье "Гармония"',
    });
    expect(result.success).toBe(true);
  });

  it("rejects short review text", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    await expect(
      caller.reviews.submit({ name: "Тест", rating: 5, text: "ОК" })
    ).rejects.toThrow();
  });
});

describe("reviews.listApproved", () => {
  it("returns approved reviews publicly", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const result = await caller.reviews.listApproved();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("reviews.listAll", () => {
  it("returns all reviews for admin", async () => {
    const caller = appRouter.createCaller(createAdminCtx());
    const result = await caller.reviews.listAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it("throws FORBIDDEN for non-admin", async () => {
    const caller = appRouter.createCaller(createUserCtx());
    await expect(caller.reviews.listAll()).rejects.toThrow();
  });
});

describe("reviews.updateStatus", () => {
  it("allows admin to update review status", async () => {
    const caller = appRouter.createCaller(createAdminCtx());
    const result = await caller.reviews.updateStatus({ id: 1, approved: "approved" });
    expect(result.success).toBe(true);
  });

  it("throws FORBIDDEN for non-admin", async () => {
    const caller = appRouter.createCaller(createUserCtx());
    await expect(
      caller.reviews.updateStatus({ id: 1, approved: "approved" })
    ).rejects.toThrow();
  });
});
