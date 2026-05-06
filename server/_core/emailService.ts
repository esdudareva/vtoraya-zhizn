import { ENV } from "./env";
import { TRPCError } from "@trpc/server";

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

/**
 * Sends an email using the Manus Email Service
 * Returns true if successful, false if service is unavailable
 */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  if (!payload.to || !payload.subject || !payload.html) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Email payload is incomplete (to, subject, html required)",
    });
  }

  if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
    console.warn("[Email] Email service not configured");
    return false;
  }

  try {
    const endpoint = new URL("v1/email/send", ENV.forgeApiUrl).toString();

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ENV.forgeApiKey}`,
      },
      body: JSON.stringify({
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Email] Failed to send email (${response.status})${
          detail ? `: ${detail}` : ""
        }`
      );
      return false;
    }

    console.log(`[Email] Welcome email sent to ${payload.to}`);
    return true;
  } catch (error) {
    console.error("[Email] Error sending email:", error);
    return false;
  }
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
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          .button { display: inline-block; padding: 10px 20px; background-color: #1a5f3f; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px; }
          a { color: #1a5f3f; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Добро пожаловать в "Вторая жизнь"! 🌿</h1>
          </div>
          
          <div class="content">
            <p>Спасибо за подписку на нашу рассылку!</p>
            
            <p>Теперь вы будете первыми узнавать о:</p>
            <ul>
              <li>✨ Новых коллекциях украшений из переработанного пластика</li>
              <li>🎉 Специальных предложениях и скидках</li>
              <li>🌍 Экологических инициативах и новостях</li>
              <li>💚 Историях о том, как мы спасаем пластик</li>
            </ul>
            
            <p>Каждое украшение "Вторая жизнь" — это история переработанного пластика, который получил вторую жизнь в виде красивого и уникального изделия ручной работы.</p>
            
            <p style="text-align: center;">
              <a href="https://2lifejewels-3huq5uhq.manus.space/" class="button">Перейти в каталог</a>
            </p>
            
            <p>С уважением,<br>Команда "Вторая жизнь"</p>
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
