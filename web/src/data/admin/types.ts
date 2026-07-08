export interface NavItem {
  key: string;
  label: string;
  icon: string;
}

export interface Account {
  name: string;
  role: string;
}

export interface TopBarNotification {
  icon: string;
  color: string;
  title: string;
  sub: string;
  time: string;
  unread: boolean;
}

export type OrganizationStatus = 'TRIALING' | 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'BLOCKED';

export interface OrganizationRow {
  id: string;
  name: string;
  city: string;
  ownerName: string;
  ownerEmail: string;
  status: OrganizationStatus;
  createdAt: string;
  trialEndsAt: string | null;
  studentCount: number;
}

export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled' | 'incomplete';

export interface SubscriptionRow {
  organizationId: string;
  organizationName: string;
  status: SubscriptionStatus;
  gatewayCustomerId: string | null;
  currentPeriodEnd: string | null;
  lastPaymentStatus: string | null;
}

export interface WebhookEventRow {
  id: string;
  provider: string;
  eventId: string;
  type: string;
  receivedAt: string;
  processedAt: string | null;
  organizationName: string | null;
}

export interface StatusMapEntry {
  label: string;
  tone: 'success' | 'danger' | 'info' | 'neutral' | 'warning';
}
