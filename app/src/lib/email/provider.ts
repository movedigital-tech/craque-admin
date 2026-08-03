/**
 * Abstraction seam over the e-mail gateway, mirroring `lib/payments/provider.ts`.
 * Application code only ever depends on `EmailProvider`, never on the Resend SDK.
 */
export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}

export interface EmailProvider {
  send(input: SendEmailInput): Promise<void>;
}
