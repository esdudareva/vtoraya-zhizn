import express, { Express, Request, Response } from "express";
import Stripe from "stripe";
import { updateOrderStatus, getOrderByStripeSessionId } from "../db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export function registerStripeWebhook(app: Express) {
  // CRITICAL: Must use express.raw() BEFORE express.json() to preserve request body for signature verification
  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    async (req: Request, res: Response) => {
      const sig = req.headers["stripe-signature"] as string;

      if (!sig) {
        console.error("[Webhook] Missing stripe-signature header");
        return res.status(400).json({ error: "Missing stripe-signature header" });
      }

      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          webhookSecret
        );
      } catch (err) {
        console.error("[Webhook] Signature verification failed:", err);
        return res.status(400).json({ error: "Webhook signature verification failed" });
      }

      // Handle test events (for development/testing)
      if (event.id.startsWith("evt_test_")) {
        console.log("[Webhook] Test event detected, returning verification response");
        return res.json({ verified: true });
      }

      console.log(`[Webhook] Processing event: ${event.type} (${event.id})`);

      try {
        switch (event.type) {
          case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            console.log(`[Webhook] Checkout session completed: ${session.id}`);
            console.log(`[Webhook] Payment status: ${session.payment_status}`);
            console.log(`[Webhook] Customer email: ${session.customer_email}`);
            console.log(`[Webhook] Amount total: ${session.amount_total}`);
            console.log(`[Webhook] Metadata:`, session.metadata);

            // If payment was successful, mark the order as processing
            if (session.payment_status === "paid") {
              try {
                // Look up the order by Stripe session ID
                const order = await getOrderByStripeSessionId(session.id);
                
                if (order) {
                  await updateOrderStatus(order.id, "processing");
                  console.log(
                    `[Webhook] Order ${order.orderNumber} marked as processing`
                  );
                } else {
                  console.warn(
                    `[Webhook] No order found for Stripe session ${session.id}`
                  );
                }
              } catch (err) {
                console.error(
                  "[Webhook] Error updating order status:",
                  err
                );
              }
            }
            break;
          }

          case "payment_intent.succeeded": {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log(`[Webhook] Payment intent succeeded: ${paymentIntent.id}`);
            break;
          }

          case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log(`[Webhook] Payment intent failed: ${paymentIntent.id}`);
            break;
          }

          case "charge.refunded": {
            const charge = event.data.object as Stripe.Charge;
            console.log(`[Webhook] Charge refunded: ${charge.id}`);
            break;
          }

          default:
            console.log(`[Webhook] Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });
      } catch (error) {
        console.error("[Webhook] Error processing event:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  );
}
