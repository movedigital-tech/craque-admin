import { randomUUID } from 'node:crypto';
import type { CreateCheckoutSessionInput, CreateCheckoutSessionResult, NormalizedWebhookEvent, PaymentProvider } from './provider';

/**
 * Placeholder implementation kept as a dev-mode reference now that
 * `stripe-provider.ts` is the real implementation. No longer imported by
 * the app's consumers.
 */
export class StubPaymentProvider implements PaymentProvider {
  async createCheckoutSession({ organizationId }: CreateCheckoutSessionInput): Promise<CreateCheckoutSessionResult> {
    return { url: `/billing/checkout-stub?org=${organizationId}` };
  }

  // No real gateway to verify against — accepts everything and echoes back a
  // fake event id so the caller's dedupe-by-eventId logic still has something to work with.
  parseWebhookEvent(rawBody: string): NormalizedWebhookEvent | null {
    try {
      const payload = JSON.parse(rawBody);
      return { eventId: payload.eventId ?? randomUUID(), type: payload.type ?? 'unknown' };
    } catch {
      return null;
    }
  }
}

export const paymentProvider: PaymentProvider = new StubPaymentProvider();
