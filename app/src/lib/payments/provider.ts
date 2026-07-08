/**
 * Abstraction seam over the (not yet chosen) payment gateway. Concrete
 * providers (Stripe, Mercado Pago, Pagar.me, ...) implement this interface;
 * application code only ever depends on `PaymentProvider`, never on a
 * specific gateway SDK.
 */
export interface CreateCheckoutSessionInput {
  organizationId: string;
}

export interface CreateCheckoutSessionResult {
  url: string;
}

export interface PaymentProvider {
  createCheckoutSession(input: CreateCheckoutSessionInput): Promise<CreateCheckoutSessionResult>;

  /** Verifies a webhook request actually came from the gateway before it's trusted. */
  verifyWebhookSignature(rawBody: string, signatureHeader: string | null): boolean;
}
