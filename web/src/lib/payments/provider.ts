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
}
