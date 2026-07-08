import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Prisma } from '@/generated/prisma/client';
import type { SubscriptionStatus, OrganizationStatus } from '@/generated/prisma/client';
import { paymentProvider } from '@/lib/payments/stub-provider';

const SUBSCRIPTION_TO_ORG_STATUS: Partial<Record<SubscriptionStatus, OrganizationStatus>> = {
  TRIALING: 'TRIALING',
  ACTIVE: 'ACTIVE',
  PAST_DUE: 'PAST_DUE',
  CANCELED: 'CANCELED',
};

interface WebhookPayload {
  eventId: string;
  type: string;
  organizationId?: string;
  subscriptionStatus?: SubscriptionStatus;
  gatewayCustomerId?: string;
  currentPeriodEnd?: string;
  lastPaymentStatus?: string;
}

export async function POST(request: Request, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;
  const rawBody = await request.text();

  const signatureHeader = request.headers.get('x-webhook-signature');
  if (!paymentProvider.verifyWebhookSignature(rawBody, signatureHeader)) {
    return NextResponse.json({ error: 'invalid signature' }, { status: 401 });
  }

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'invalid JSON body' }, { status: 400 });
  }

  if (!payload.eventId || !payload.type) {
    return NextResponse.json({ error: 'eventId and type are required' }, { status: 400 });
  }

  // Store the raw event before processing, keyed by eventId, so a replayed
  // delivery hits the unique constraint and is treated as a no-op.
  let event;
  try {
    event = await db.webhookEvent.create({
      data: {
        provider,
        eventId: payload.eventId,
        type: payload.type,
        payload: payload as unknown as Prisma.InputJsonValue,
        organizationId: payload.organizationId ?? null,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ ok: true, duplicate: true });
    }
    throw error;
  }

  if (payload.organizationId && payload.subscriptionStatus) {
    await db.platformSubscription.update({
      where: { organizationId: payload.organizationId },
      data: {
        status: payload.subscriptionStatus,
        gatewayCustomerId: payload.gatewayCustomerId,
        currentPeriodEnd: payload.currentPeriodEnd ? new Date(payload.currentPeriodEnd) : undefined,
        lastPaymentStatus: payload.lastPaymentStatus,
        lastWebhookEventId: event.eventId,
      },
    });

    const orgStatus = SUBSCRIPTION_TO_ORG_STATUS[payload.subscriptionStatus];
    if (orgStatus) {
      await db.organization.update({ where: { id: payload.organizationId }, data: { status: orgStatus } });
    }
  }

  await db.webhookEvent.update({ where: { id: event.id }, data: { processedAt: new Date() } });

  return NextResponse.json({ ok: true });
}
