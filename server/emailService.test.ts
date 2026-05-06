import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendEmail, sendWelcomeEmail } from "./_core/emailService";

// Mock the fetch function
global.fetch = vi.fn();

describe("Email Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("sendEmail", () => {
    it("should send an email successfully", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
      });

      const result = await sendEmail({
        to: "test@example.com",
        subject: "Test Subject",
        html: "<p>Test content</p>",
      });

      expect(result).toBe(true);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("should return false when email service is unavailable", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => "Internal Server Error",
      });

      const result = await sendEmail({
        to: "test@example.com",
        subject: "Test Subject",
        html: "<p>Test content</p>",
      });

      expect(result).toBe(false);
    });

    it("should throw error for incomplete payload", async () => {
      await expect(
        sendEmail({
          to: "",
          subject: "Test",
          html: "<p>Test</p>",
        })
      ).rejects.toThrow("Email payload is incomplete");
    });

    it("should handle network errors gracefully", async () => {
      (global.fetch as any).mockRejectedValueOnce(
        new Error("Network error")
      );

      const result = await sendEmail({
        to: "test@example.com",
        subject: "Test Subject",
        html: "<p>Test content</p>",
      });

      expect(result).toBe(false);
    });
  });

  describe("sendWelcomeEmail", () => {
    it("should send welcome email with correct content", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
      });

      const result = await sendWelcomeEmail("newsubscriber@example.com");

      expect(result).toBe(true);
      expect(global.fetch).toHaveBeenCalledTimes(1);

      const callArgs = (global.fetch as any).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);

      expect(body.to).toBe("newsubscriber@example.com");
      expect(body.subject).toContain("Добро пожаловать");
      expect(body.html).toContain("Вторая жизнь");
      expect(body.html).toContain("Новых коллекциях");
    });

    it("should include catalog link in welcome email", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
      });

      await sendWelcomeEmail("test@example.com");

      const callArgs = (global.fetch as any).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);

      expect(body.html).toContain("Исследовать коллекцию");
    });

    it("should handle welcome email send failure gracefully", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => "Service unavailable",
      });

      const result = await sendWelcomeEmail("test@example.com");

      expect(result).toBe(false);
    });

    it("should include thank you message in welcome email", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
      });

      await sendWelcomeEmail("test@example.com");

      const callArgs = (global.fetch as any).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);

      expect(body.html).toContain("Спасибо за присоединение");
      expect(body.html).toContain("Вторая жизнь");
      expect(body.html).toContain("благодарны");
    });
  });
});
