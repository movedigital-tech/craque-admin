import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Prisma } from '@/generated/prisma/client';
import type { OrganizationStatus, SubscriptionStatus } from '@/generated/prisma/client';
import { paymentProvider } from '@/lib/payments/stripe-provider';

const SUBSCRIPTION_TO_ORG_STATUS: Partial<Record<SubscriptionStatus, OrganizationStatus>> = {
  TRIALING: 'TRIALING',
  ACTIVE: 'ACTIVE',
  PAST_DUE: 'PAST_DUE',
  CANCELED: 'CANCELED',
};

export async function POST(request: Request, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;
  const rawBody = await request.text();

  const signatureHeader = request.headers.get('stripe-signature');
  const normalized = paymentProvider.parseWebhookEvent(rawBody, signatureHeader);
  if (!normalized) {
    return NextResponse.json({ error: 'invalid signature' }, { status: 401 });
  }

  const organizationId = normalized.gatewayCustomerId
    ? (await db.platformSubscription.findFirst({ where: { gatewayCustomerId: normalized.gatewayCustomerId } }))?.organizationId ?? null
    : null;

  // Store the raw event before processing, keyed by eventId, so a replayed
  // delivery hits the unique constraint and is treated as a no-op.
  let event;
  try {
    event = await db.webhookEvent.create({
      data: {
        provider,
        eventId: normalized.eventId,
        type: normalized.type,
        payload: normalized as unknown as Prisma.InputJsonValue,
        organizationId,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ ok: true, duplicate: true });
    }
    throw error;
  }

  if (organizationId && (normalized.subscriptionStatus || normalized.gatewayCustomerId || normalized.currentPeriodEnd || normalized.lastPaymentStatus)) {
    await db.platformSubscription.update({
      where: { organizationId },
      data: {
        status: normalized.subscriptionStatus,
        gatewayCustomerId: normalized.gatewayCustomerId,
        currentPeriodEnd: normalized.currentPeriodEnd,
        lastPaymentStatus: normalized.lastPaymentStatus,
        lastWebhookEventId: event.eventId,
      },
    });

    const orgStatus = normalized.subscriptionStatus ? SUBSCRIPTION_TO_ORG_STATUS[normalized.subscriptionStatus] : undefined;
    if (orgStatus) {
      await db.organization.update({ where: { id: organizationId }, data: { status: orgStatus } });
    }
  }

  await db.webhookEvent.update({ where: { id: event.id }, data: { processedAt: new Date() } });

  return NextResponse.json({ ok: true });
}
