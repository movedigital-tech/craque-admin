import Stripe from 'stripe';
import { db } from '@/lib/db';
import type { SubscriptionStatus } from '@/generated/prisma/client';
import type {
  CreateCheckoutSessionInput,
  CreateCheckoutSessionResult,
  NormalizedWebhookEvent,
  PaymentProvider,
} from './provider';

const STRIPE_STATUS_MAP: Record<Stripe.Subscription.Status, SubscriptionStatus> = {
  trialing: 'TRIALING',
  active: 'ACTIVE',
  past_due: 'PAST_DUE',
  canceled: 'CANCELED',
  incomplete: 'INCOMPLETE',
  incomplete_expired: 'INCOMPLETE',
  unpaid: 'PAST_DUE',
  paused: 'PAST_DUE',
};

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} não está configurada`);
  return value;
}

export class StripeProvider implements PaymentProvider {
  private client(): Stripe {
    return new Stripe(requiredEnv('STRIPE_SECRET_KEY'));
  }

  async createCheckoutSession({ organizationId }: CreateCheckoutSessionInput): Promise<CreateCheckoutSessionResult> {
    const stripe = this.client();
    const baseUrl = requiredEnv('APP_BASE_URL');

    const subscription = await db.platformSubscription.findUnique({ where: { organizationId } });

    let customerId = subscription?.gatewayCustomerId ?? null;
    if (!customerId) {
      const customer = await stripe.customers.create({ metadata: { organizationId } });
      customerId = customer.id;
      await db.platformSubscription.update({
        where: { organizationId },
        data: { gatewayCustomerId: customerId, gatewayProvider: 'stripe' },
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price: requiredEnv('STRIPE_PRICE_ID'), quantity: 1 }],
      success_url: `${baseUrl}/escolinha/home?checkout=success`,
      cancel_url: `${baseUrl}/billing/blocked`,
      client_reference_id: organizationId,
      subscription_data: { metadata: { organizationId } },
    });

    return { url: session.url! };
  }

  parseWebhookEvent(rawBody: string, signatureHeader: string | null): NormalizedWebhookEvent | null {
    const stripe = this.client();
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signatureHeader ?? '', requiredEnv('STRIPE_WEBHOOK_SECRET'));
    } catch {
      return null;
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        return {
          eventId: event.id,
          type: event.type,
          gatewayCustomerId: typeof session.customer === 'string' ? session.customer : undefined,
        };
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        const currentPeriodEndSeconds = sub.items.data[0]?.current_period_end;
        return {
          eventId: event.id,
          type: event.type,
          gatewayCustomerId: typeof sub.customer === 'string' ? sub.customer : undefined,
          subscriptionStatus: STRIPE_STATUS_MAP[sub.status],
          currentPeriodEnd: currentPeriodEndSeconds ? new Date(currentPeriodEndSeconds * 1000) : undefined,
        };
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        return {
          eventId: event.id,
          type: event.type,
          gatewayCustomerId: typeof sub.customer === 'string' ? sub.customer : undefined,
          subscriptionStatus: 'CANCELED',
        };
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        return {
          eventId: event.id,
          type: event.type,
          gatewayCustomerId: typeof invoice.customer === 'string' ? invoice.customer : undefined,
          subscriptionStatus: 'PAST_DUE',
          lastPaymentStatus: 'failed',
        };
      }
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        return {
          eventId: event.id,
          type: event.type,
          gatewayCustomerId: typeof invoice.customer === 'string' ? invoice.customer : undefined,
          lastPaymentStatus: 'succeeded',
        };
      }
      default:
        return { eventId: event.id, type: event.type };
    }
  }
}

export const paymentProvider: PaymentProvider = new StripeProvider();
