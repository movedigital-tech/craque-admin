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
}

export const paymentProvider: PaymentProvider = new StubPaymentProvider();
