import { Resend } from 'resend';
import type { EmailProvider, SendEmailInput } from './provider';

/**
 * Sends via Resend when RESEND_API_KEY is configured. Without it (local dev,
 * tests, CI) it logs and no-ops instead of throwing, so those flows don't
 * need a real Resend account to run.
 */
export class ResendEmailProvider implements EmailProvider {
  async send({ to, subject, html }: SendEmailInput): Promise<void> {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM;

    if (!apiKey || !from) {
      console.warn(`[email] RESEND_API_KEY/EMAIL_FROM not set — skipping send of "${subject}" to ${to}`);
      return;
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({ from, to, subject, html });
    if (error) throw new Error(`Resend error: ${error.message}`);
  }
}

export const emailProvider: EmailProvider = new ResendEmailProvider();
