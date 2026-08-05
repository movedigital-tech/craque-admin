import type { SubscriptionStatus } from '@/generated/prisma/client';

/**
 * Abstraction seam over the payment gateway (Stripe). Application code only
 * ever depends on `PaymentProvider`, never on the Stripe SDK directly.
 */
export interface CreateCheckoutSessionInput {
  organizationId: string;
}

export interface CreateCheckoutSessionResult {
  url: string;
}

export interface CreateBillingPortalSessionInput {
  organizationId: string;
}

export interface CreateBillingPortalSessionResult {
  url: string;
}

/**
 * Gateway-agnostic shape a webhook event is normalized into. Deliberately
 * has no `organizationId` — the provider only knows gateway-side identifiers
 * (customer id), resolving that to an org is the caller's job (it owns the
 * Prisma lookup).
 */
export interface NormalizedWebhookEvent {
  eventId: string;
  type: string;
  gatewayCustomerId?: string;
  subscriptionStatus?: SubscriptionStatus;
  currentPeriodEnd?: Date;
  lastPaymentStatus?: string;
}

export interface PaymentProvider {
  createCheckoutSession(input: CreateCheckoutSessionInput): Promise<CreateCheckoutSessionResult>;

  /** Requires an existing gateway customer (i.e. a checkout must have happened before). */
  createBillingPortalSession(input: CreateBillingPortalSessionInput): Promise<CreateBillingPortalSessionResult>;

  /** Verifies the request actually came from the gateway and normalizes it. Returns null if the signature is invalid. */
  parseWebhookEvent(rawBody: string, signatureHeader: string | null): NormalizedWebhookEvent | null;
}
