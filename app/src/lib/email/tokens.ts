import { randomBytes, createHash } from 'node:crypto';
import { db } from '@/lib/db';
import type { Prisma, InvitationTokenType } from '@/generated/prisma/client';

const DEFAULT_TTL_HOURS = 72;

function hash(rawToken: string): string {
  return createHash('sha256').update(rawToken).digest('hex');
}

export interface CreateInvitationTokenInput {
  userId: string;
  type: InvitationTokenType;
  membershipId?: string;
  ttlHours?: number;
}

/** Returns the raw token — only it goes into the e-mail link, the DB keeps just its hash. */
export async function createInvitationToken(
  tx: Prisma.TransactionClient,
  { userId, type, membershipId, ttlHours = DEFAULT_TTL_HOURS }: CreateInvitationTokenInput,
): Promise<string> {
  const raw = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);

  await tx.invitationToken.create({
    data: { tokenHash: hash(raw), type, userId, membershipId, expiresAt },
  });

  return raw;
}

export interface ConsumedInvitationToken {
  id: string;
  userId: string;
  membershipId: string | null;
}

/** Looks up an unused, unexpired token by raw value. Does not mark it used — callers do that atomically alongside whatever else the acceptance implies. */
export async function findInvitationToken(
  rawToken: string,
  expectedType: InvitationTokenType | InvitationTokenType[],
): Promise<ConsumedInvitationToken | null> {
  const allowedTypes = Array.isArray(expectedType) ? expectedType : [expectedType];
  const token = await db.invitationToken.findUnique({ where: { tokenHash: hash(rawToken) } });
  if (!token || !allowedTypes.includes(token.type) || token.usedAt || token.expiresAt < new Date()) return null;
  return { id: token.id, userId: token.userId, membershipId: token.membershipId };
}
