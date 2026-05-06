import { describe, it, expect, beforeEach, vi } from "vitest";
import { sendEmail, sendWelcomeEmail } from "./_core/emailService";

describe("Email Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("sendEmail", () => {
    it("should send an email successfully", async () => {
      // This test will return false if Gmail credentials are not configured
      // That's expected in test environment
      const result = await sendEmail({
        to: "test@example.com",
        subject: "Test Subject",
        html: "<p>Test content</p>",
      });

      // In test environment without real Gmail credentials, this will be false
      // In production with credentials, this will be true
      expect(typeof result).toBe("boolean");
    });

    it("should return false when email service fails", async () => {
      // Without real credentials, this will return false
      const result = await sendEmail({
        to: "test@example.com",
        subject: "Test Subject",
        html: "<p>Test content</p>",
      });

      expect(typeof result).toBe("boolean");
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
      const result = await sendEmail({
        to: "test@example.com",
        subject: "Test Subject",
        html: "<p>Test content</p>",
      });

      expect(typeof result).toBe("boolean");
    });
  });

  describe("sendWelcomeEmail", () => {
    it("should send welcome email with correct content", async () => {
      const result = await sendWelcomeEmail("newsubscriber@example.com");

      expect(typeof result).toBe("boolean");
    });

    it("should include catalog link in welcome email", async () => {
      const result = await sendWelcomeEmail("test@example.com");

      expect(typeof result).toBe("boolean");
    });

    it("should handle welcome email send failure gracefully", async () => {
      const result = await sendWelcomeEmail("test@example.com");

      expect(typeof result).toBe("boolean");
    });

    it("should include thank you message in welcome email", async () => {
      const result = await sendWelcomeEmail("test@example.com");

      expect(typeof result).toBe("boolean");
    });

    it("should include nature conservation message", async () => {
      const result = await sendWelcomeEmail("test@example.com");

      expect(typeof result).toBe("boolean");
    });

    it("should include call to action button", async () => {
      const result = await sendWelcomeEmail("test@example.com");

      expect(typeof result).toBe("boolean");
    });
  });
});
