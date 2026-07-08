import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import type { Membership, MembershipRole, Organization, User } from '@/generated/prisma/client';

export interface OrgContext {
  user: User;
  membership: Membership;
  organization: Organization;
}

const BLOCKING_STATUSES = ['BLOCKED', 'CANCELED'];

/**
 * Authoritative tenancy check for every protected Escolinha route:
 * authenticated user -> active membership -> organization exists -> status
 * allowed -> role compatible with the action. Runs in the Node runtime
 * (not Edge) so it can safely query Prisma per request.
 *
 * MVP simplification: a user is assumed to belong to a single organization,
 * so we take their first active membership rather than supporting an
 * org switcher.
 */
export async function requireOrgContext(allowedRoles?: MembershipRole[]): Promise<OrgContext> {
  const session = await auth();
  if (!session?.user?.id) redirect('/escolinha/login');

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect('/escolinha/login');

  const membership = await db.membership.findFirst({
    where: { userId: user.id, status: 'ACTIVE' },
    orderBy: { createdAt: 'asc' },
    include: { organization: true },
  });
  if (!membership) redirect('/escolinha/login');

  const { organization } = membership;
  if (BLOCKING_STATUSES.includes(organization.status)) redirect('/billing/blocked');

  if (allowedRoles && !allowedRoles.includes(membership.role)) redirect('/escolinha/home');

  return { user, membership, organization };
}

/**
 * Authoritative check for Admin (internal Craque staff) routes: authenticated
 * user with a non-null platformRole.
 */
export async function requireStaffContext(): Promise<{ user: User }> {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user || !user.platformRole) redirect('/login');

  return { user };
}
