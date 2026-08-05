import { NextResponse } from 'next/server';
import { requireMembership } from '@/lib/tenant';
import { paymentProvider } from '@/lib/payments/stripe-provider';

export async function POST() {
  const { organization } = await requireMembership();
  const session = await paymentProvider.createBillingPortalSession({ organizationId: organization.id });
  return NextResponse.json(session);
}
