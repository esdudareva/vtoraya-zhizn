import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  createReview,
  getApprovedReviews,
  getAllReviews,
  updateReviewStatus,
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addToFavorites,
  removeFromFavorites,
  getUserFavorites,
  isFavorite,
  createComment,
  getProductComments,
  getAllComments,
  updateCommentStatus,
  getStatistics,
  getAllUsers,
  updateUserPlasticSaved,
} from "./db";
import { notifyOwner } from "./_core/notification";

// Utility: Send email notifications
async function sendEmailNotification(subject: string, body: string) {
  try {
    await notifyOwner({ title: subject, content: body });
  } catch (e) {
    console.error("[Email] Failed to send notification:", e);
  }
}

const orderItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  image: z.string().optional(),
});

const ordersRouter = router({
  create: publicProcedure
    .input(
      z.object({
        customerName: z.string().min(1),
        customerEmail: z.string().email(),
        customerPhone: z.string().min(1),
        deliveryMethod: z.string().min(1),
        deliveryAddress: z.string().optional(),
        paymentMethod: z.string().min(1),
        items: z.array(orderItemSchema),
        subtotal: z.number(),
        deliveryCost: z.number(),
        total: z.number(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const order = await createOrder({
        customerName: input.customerName,
        customerEmail: input.customerEmail,
        customerPhone: input.customerPhone,
        deliveryMethod: input.deliveryMethod,
        deliveryAddress: input.deliveryAddress ?? null,
        paymentMethod: input.paymentMethod,
        items: input.items,
        subtotal: String(input.subtotal),
        deliveryCost: String(input.deliveryCost),
        total: String(input.total),
        notes: input.notes ?? null,
      });

      const itemsList = input.items
        .map((i) => `• ${i.name} × ${i.quantity} = ${(i.price * i.quantity).toFixed(2)} BYN`)
        .join("\n");

      await sendEmailNotification(
        `Новый заказ #${order?.orderNumber} — Вторая жизнь`,
        `Новый заказ на сайте «Вторая жизнь»!\n\n` +
        `Номер заказа: ${order?.orderNumber}\n` +
        `Покупатель: ${input.customerName}\n` +
        `Email: ${input.customerEmail}\n` +
        `Телефон: ${input.customerPhone}\n\n` +
        `Товары:\n${itemsList}\n\n` +
        `Доставка: ${input.deliveryMethod} — ${input.deliveryCost} BYN\n` +
        `Итого: ${input.total} BYN\n\n` +
        `Способ оплаты: ${input.paymentMethod}\n` +
        (input.deliveryAddress ? `Адрес: ${input.deliveryAddress}\n` : "") +
        (input.notes ? `Примечание: ${input.notes}\n` : "")
      );

      return { success: true, orderNumber: order?.orderNumber };
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
    }
    return getAllOrders();
  }),

  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "processing", "shipped", "delivered", "cancelled"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      }
      await updateOrderStatus(input.id, input.status);
      return { success: true };
    }),
});

const reviewsRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        rating: z.number().min(1).max(5),
        text: z.string().min(5).max(2000),
        product: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await createReview({
        name: input.name,
        rating: input.rating,
        text: input.text,
        productName: input.product ?? null,
        approved: "pending",
      });

      await sendEmailNotification(
        `Новый отзыв от ${input.name} — Вторая жизнь`,
        `Новый отзыв на сайте «Вторая жизнь»!\n\n` +
        `Автор: ${input.name}\n` +
        `Оценка: ${input.rating}/5\n` +
        (input.product ? `Товар: ${input.product}\n` : "") +
        `\nТекст отзыва:\n${input.text}\n\n` +
        `Отзыв ожидает модерации в админ-панели.`
      );

      return { success: true };
    }),

  listApproved: publicProcedure.query(async () => {
    return getApprovedReviews();
  }),

  listAll: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
    }
    return getAllReviews();
  }),

  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        approved: z.enum(["pending", "approved", "rejected"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      }
      await updateReviewStatus(input.id, input.approved);
      return { success: true };
    }),
});

const productsRouter = router({
  list: publicProcedure.query(async () => getAllProducts()),
  get: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => getProductById(input.id)),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        category: z.string().min(1),
        price: z.string().min(1),
        image: z.string().min(1),
        material: z.string().optional(),
        plasticWeight: z.string().optional(),
        featured: z.enum(["yes", "no"]).default("no"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      await createProduct(input);
      return { success: true };
    }),
  update: protectedProcedure
    .input(z.object({ id: z.number(), ...z.object({ name: z.string().optional() }).shape }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      const { id, ...data } = input;
      await updateProduct(id, data);
      return { success: true };
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      await deleteProduct(input.id);
      return { success: true };
    }),
});

const favoritesRouter = router({
  add: protectedProcedure
    .input(z.object({ productId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await addToFavorites(ctx.user.id, input.productId);
      return { success: true };
    }),
  remove: protectedProcedure
    .input(z.object({ productId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await removeFromFavorites(ctx.user.id, input.productId);
      return { success: true };
    }),
  list: protectedProcedure.query(async ({ ctx }) => getUserFavorites(ctx.user.id)),
  isFavorite: protectedProcedure
    .input(z.object({ productId: z.number() }))
    .query(async ({ ctx, input }) => isFavorite(ctx.user.id, input.productId)),
});

const commentsRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        productId: z.number(),
        userName: z.string().min(1),
        text: z.string().min(5),
        rating: z.number().min(1).max(5).optional(),
      })
    )
    .mutation(async ({ input }) => {
      await createComment({
        productId: input.productId,
        userName: input.userName,
        text: input.text,
        rating: input.rating,
        approved: "pending",
      });
      return { success: true };
    }),
  listByProduct: publicProcedure
    .input(z.object({ productId: z.number() }))
    .query(async ({ input }) => getProductComments(input.productId)),
  listAll: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
    return getAllComments();
  }),
  updateStatus: protectedProcedure
    .input(z.object({ id: z.number(), approved: z.enum(["pending", "approved", "rejected"]) }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      await updateCommentStatus(input.id, input.approved);
      return { success: true };
    }),
});

const statsRouter = router({
  list: publicProcedure.query(async () => getStatistics()),
});

const usersRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
    return getAllUsers();
  }),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  orders: ordersRouter,
  reviews: reviewsRouter,
  products: productsRouter,
  favorites: favoritesRouter,
  comments: commentsRouter,
  stats: statsRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
