import { describe, it, expect, vi } from "vitest";
import { createCampaign, getCampaigns, sendCampaign } from "./db";
import { sendCampaignToSubscribers } from "./_core/emailService";

// Mock the email service
vi.mock("./_core/emailService", () => ({
  sendCampaignToSubscribers: vi.fn().mockResolvedValue({ sent: 5, failed: 0 }),
}));

describe("Campaign Management", () => {
  describe("createCampaign", () => {
    it("should create a campaign with draft status", async () => {
      const campaign = await createCampaign({
        title: "Test Campaign",
        subject: "Test Subject",
        content: "Test Content",
        status: "draft",
        createdBy: 1,
      });

      expect(campaign).toBeDefined();
      expect(campaign.title).toBe("Test Campaign");
      expect(campaign.subject).toBe("Test Subject");
      expect(campaign.content).toBe("Test Content");
      expect(campaign.status).toBe("draft");
      expect(campaign.createdBy).toBe(1);
    });

    it("should create multiple campaigns", async () => {
      const campaign1 = await createCampaign({
        title: "Campaign 1",
        subject: "Subject 1",
        content: "Content 1",
        status: "draft",
        createdBy: 1,
      });

      const campaign2 = await createCampaign({
        title: "Campaign 2",
        subject: "Subject 2",
        content: "Content 2",
        status: "draft",
        createdBy: 1,
      });

      expect(campaign1.id).not.toBe(campaign2.id);
      expect(campaign1.title).toBe("Campaign 1");
      expect(campaign2.title).toBe("Campaign 2");
    });
  });

  describe("getCampaigns", () => {
    it("should retrieve all campaigns", async () => {
      await createCampaign({
        title: "Campaign A",
        subject: "Subject A",
        content: "Content A",
        status: "draft",
        createdBy: 1,
      });

      await createCampaign({
        title: "Campaign B",
        subject: "Subject B",
        content: "Content B",
        status: "draft",
        createdBy: 1,
      });

      const campaigns = await getCampaigns();
      expect(campaigns.length).toBeGreaterThanOrEqual(2);
      expect(campaigns.some((c) => c.title === "Campaign A")).toBe(true);
      expect(campaigns.some((c) => c.title === "Campaign B")).toBe(true);
    });

    it("should return array of campaigns", async () => {
      const campaigns = await getCampaigns();
      expect(Array.isArray(campaigns)).toBe(true);
    });
  });

  describe("sendCampaign", () => {
    it("should send campaign and return result", async () => {
      const campaign = await createCampaign({
        title: "Send Test Campaign",
        subject: "Send Test Subject",
        content: "Send Test Content",
        status: "draft",
        createdBy: 1,
      });

      const result = await sendCampaign(campaign.id);

      expect(result).toBeDefined();
      expect(result).toHaveProperty("sent");
      expect(result).toHaveProperty("failed");
      expect(typeof result.sent).toBe("number");
      expect(typeof result.failed).toBe("number");
      expect(sendCampaignToSubscribers).toHaveBeenCalled();
    });

    it("should call email service when sending campaign", async () => {
      const campaign = await createCampaign({
        title: "Email Test Campaign",
        subject: "Email Test Subject",
        content: "Email Test Content",
        status: "draft",
        createdBy: 1,
      });

      await sendCampaign(campaign.id);

      expect(sendCampaignToSubscribers).toHaveBeenCalled();
    });
  });
});
