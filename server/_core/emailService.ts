import { ENV } from "./env";
import { TRPCError } from "@trpc/server";
import nodemailer from "nodemailer";

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

// Create Nodemailer transporter for Gmail
let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (!transporter) {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
      console.warn("[Email] Gmail credentials not configured");
      return null;
    }

    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }
  return transporter;
}

/**
 * Sends an email using Gmail SMTP via Nodemailer
 * Returns true if successful, false if service is unavailable
 */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  if (!payload.to || !payload.subject || !payload.html) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Email payload is incomplete (to, subject, html required)",
    });
  }

  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[Email] Email service not configured");
    return false;
  }

  try {
    console.log(`[Email] Sending to ${payload.to} via Gmail SMTP`);

    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
    });

    console.log(`[Email] Email sent successfully to ${payload.to}. Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error("[Email] Error sending email:", error);
    return false;
  }
}

/**
 * Sends a campaign email to a single subscriber
 */
export async function sendCampaignEmail(
  email: string,
  subject: string,
  html: string
): Promise<boolean> {
  return sendEmail({
    to: email,
    subject,
    html,
  });
}

/**
 * Sends a campaign to all active newsletter subscribers
 */
export async function sendCampaignToSubscribers(
  subject: string,
  html: string,
  subscribers: Array<{ email: string }>
): Promise<{ sent: number; failed: number }> {
  let sent = 0;
  let failed = 0;

  for (const subscriber of subscribers) {
    try {
      const success = await sendCampaignEmail(subscriber.email, subject, html);
      if (success) {
        sent++;
      } else {
        failed++;
      }
    } catch (error) {
      console.error(`[Campaign] Error sending to ${subscriber.email}:`, error);
      failed++;
    }
  }

  console.log(`[Campaign] Sent ${sent} emails, ${failed} failed`);
  return { sent, failed };
}

/**
 * Sends a welcome email to a new newsletter subscriber
 */
export async function sendWelcomeEmail(email: string): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1a5f3f; color: white; padding: 20px; text-align: center; border-radius: 5px; }
          .content { padding: 20px; background-color: #f9f9f9; margin-top: 20px; border-radius: 5px; }
          .highlight { background-color: #e8f5e9; padding: 15px; border-left: 4px solid #1a5f3f; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          .button { display: inline-block; padding: 10px 20px; background-color: #1a5f3f; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px; }
          a { color: #1a5f3f; }
          .green-text { color: #1a5f3f; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Спасибо за присоединение! 🌍</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px;">Вы стали частью движения за спасение планеты</p>
          </div>
          
          <div class="content">
            <p style="font-size: 16px; font-weight: bold; color: #1a5f3f;">Добро пожаловать в "Вторая жизнь"! 🌿</p>
            
            <p>Мы искренне благодарны вам за поддержку нашего бренда. Выбирая украшения "Вторая жизнь", вы не просто приобретаете красивое изделие — вы становитесь активным участником глобального движения по спасению планеты.</p>
            
            <p><strong>Каждое украшение — это история спасения:</strong></p>
            <ul>
              <li>♻️ Переработанный пластик получает вторую жизнь вместо того, чтобы загрязнять океаны и природу</li>
              <li>🌱 Мы помогаем сохранить экосистему и природные ресурсы для будущих поколений</li>
              <li>💎 Каждое изделие создано вручную с любовью и заботой о планете</li>
              <li>🌿 Вместе мы создаём более зелёный и чистый мир</li>
            </ul>
            
            <div class="highlight">
              <p><strong>Знаете ли вы?</strong> Одно украшение из нашей коллекции спасает примерно 50 граммов пластика от попадания в окружающую среду. Ваша поддержка имеет реальное значение!</p>
            </div>
            
            <p><strong>Подписываясь на нашу рассылку, вы будете первыми узнавать о:</strong></p>
            <ul>
              <li>✨ Новых коллекциях эко-украшений</li>
              <li>🎉 Специальных предложениях для наших сторонников</li>
              <li>🌍 Экологических инициативах и историях успеха</li>
              <li>💚 Том, как вместе мы спасаем пластик и помогаем природе</li>
            </ul>
            
            <p style="text-align: center;">
              <a href="https://2lifejewels-3huq5uhq.manus.space/" class="button">Исследовать коллекцию</a>
            </p>
            
            <p>С благодарностью и заботой о планете,<br><strong>Команда "Вторая жизнь"</strong><br><em>Украшения из переработанного пластика</em></p>
          </div>
          
          <div class="footer">
            <p>© 2026 Вторая жизнь. Украшения из переработанного пластика.</p>
            <p>Вы получили это письмо, потому что подписались на нашу рассылку.</p>
            <p><a href="#">Отписаться от рассылки</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: "Добро пожаловать в Вторая жизнь! 🌿",
    html,
  });
}
