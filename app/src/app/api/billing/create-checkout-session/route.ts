import { NextResponse } from 'next/server';
import { requireMembership } from '@/lib/tenant';
import { paymentProvider } from '@/lib/payments/stub-provider';

export async function POST() {
  const { organization } = await requireMembership();
  const session = await paymentProvider.createCheckoutSession({ organizationId: organization.id });
  return NextResponse.json(session);
}
