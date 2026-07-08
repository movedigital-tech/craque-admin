import type { BadgeTone } from '@/components/ds';
import type { OrganizationStatus, SubscriptionStatus } from '@/generated/prisma/client';

interface StatusMapEntry {
  label: string;
  tone: BadgeTone;
}

export const orgStatusMap: Record<OrganizationStatus, StatusMapEntry> = {
  TRIALING: { label: 'Em trial', tone: 'info' },
  ACTIVE: { label: 'Ativa', tone: 'success' },
  PAST_DUE: { label: 'Inadimplente', tone: 'warning' },
  CANCELED: { label: 'Cancelada', tone: 'neutral' },
  BLOCKED: { label: 'Bloqueada', tone: 'danger' },
};

export const subscriptionStatusMap: Record<SubscriptionStatus, StatusMapEntry> = {
  TRIALING: { label: 'Em trial', tone: 'info' },
  ACTIVE: { label: 'Ativa', tone: 'success' },
  PAST_DUE: { label: 'Inadimplente', tone: 'warning' },
  CANCELED: { label: 'Cancelada', tone: 'neutral' },
  INCOMPLETE: { label: 'Incompleta', tone: 'danger' },
};
