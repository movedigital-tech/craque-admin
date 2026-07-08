import type { CreateCheckoutSessionInput, CreateCheckoutSessionResult, PaymentProvider } from './provider';

/**
 * Placeholder implementation used until a real gateway is chosen (see
 * decisões pendentes). Returns a URL to an internal page that stands in
 * for the gateway's hosted checkout, so the rest of the app can be built
 * against the real seam today.
 */
export class StubPaymentProvider implements PaymentProvider {
  async createCheckoutSession({ organizationId }: CreateCheckoutSessionInput): Promise<CreateCheckoutSessionResult> {
    return { url: `/billing/checkout-stub?org=${organizationId}` };
  }

  // No real gateway to verify against yet — accepts everything. A concrete
  // provider replaces this with an HMAC/signature check against its secret.
  verifyWebhookSignature(): boolean {
    return true;
  }
}

export const paymentProvider: PaymentProvider = new StubPaymentProvider();
