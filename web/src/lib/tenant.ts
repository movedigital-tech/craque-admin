import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import type { Membership, MembershipRole, Organization, PlatformSubscription, User } from '@/generated/prisma/client';

export interface OrgContext {
  user: User;
  membership: Membership;
  organization: Organization;
}

type OrganizationWithSubscription = Organization & { platformSubscription: PlatformSubscription | null };

const BLOCKING_STATUSES = ['BLOCKED', 'CANCELED'];

function isTrialExpired(organization: OrganizationWithSubscription): boolean {
  if (organization.status !== 'TRIALING') return false;
  const trialEndsAt = organization.platformSubscription?.trialEndsAt;
  return !!trialEndsAt && trialEndsAt.getTime() < Date.now();
}

/**
 * Lighter check used only by billing endpoints that must remain reachable
 * even when the organization is blocked/trial-expired (otherwise a blocked
 * org could never start a checkout to unblock itself): authenticated user
 * with an active membership. No status or trial-expiry gate.
 */
export async function requireMembership(): Promise<{ user: User; membership: Membership; organization: Organization }> {
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

  return { user, membership, organization: membership.organization };
}

/**
 * Authoritative tenancy check for every protected Escolinha route:
 * authenticated user -> active membership -> organization exists -> status
 * allowed (not blocked/canceled, trial not expired) -> role compatible with
 * the action. Runs in the Node runtime (not Edge) so it can safely query
 * Prisma per request.
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
    include: { organization: { include: { platformSubscription: true } } },
  });
  if (!membership) redirect('/escolinha/login');

  const { organization } = membership;
  if (BLOCKING_STATUSES.includes(organization.status) || isTrialExpired(organization)) {
    redirect('/billing/blocked');
  }

  if (allowedRoles && !allowedRoles.includes(membership.role)) redirect('/escolinha/home');

  return { user, membership, organization };
}

/**
 * Authoritative tenancy check for the Instrutor (teacher) shell.
 * Same rules as requireOrgContext but redirects to /instrutor/login
 * and defaults to allowing TEACHER/MANAGER/OWNER.
 */
export async function requireInstrutorContext(allowedRoles?: MembershipRole[]): Promise<OrgContext> {
  const session = await auth();
  if (!session?.user?.id) redirect('/instrutor/login');

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect('/instrutor/login');

  const membership = await db.membership.findFirst({
    where: { userId: user.id, status: 'ACTIVE' },
    orderBy: { createdAt: 'asc' },
    include: { organization: { include: { platformSubscription: true } } },
  });
  if (!membership) redirect('/instrutor/login');

  const { organization } = membership;
  if (BLOCKING_STATUSES.includes(organization.status) || isTrialExpired(organization)) {
    redirect('/billing/blocked');
  }

  const roles = allowedRoles ?? (['TEACHER', 'MANAGER', 'OWNER'] as MembershipRole[]);
  if (!roles.includes(membership.role)) redirect('/instrutor/home');

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
