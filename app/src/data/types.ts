import type { BadgeTone } from '../components/ds';

export type SchoolStatus = 'active' | 'late' | 'kyc' | 'suspended';

export interface StatusMapEntry {
  label: string;
  tone: BadgeTone;
}

export interface NavItem {
  key: string;
  label: string;
  icon: string;
}

export interface Account {
  name: string;
  role: string;
}

export interface DashboardStat {
  icon: string;
  label: string;
  value: string;
  trend?: string;
  dir?: 'up' | 'down';
  dark?: boolean;
}

export interface MrrChart {
  labels: string[];
  mrr: number[];
}

export interface School {
  id: number;
  name: string;
  city: string;
  owner: string;
  plan: string;
  status: SchoolStatus;
  studentCount: number;
  mrrLabel: string;
}

export interface DashboardAlert {
  icon: string;
  color: string;
  text: string;
  go: string;
}

export interface PlanDistribution {
  name: string;
  count: number;
  pct: number;
}

export interface TopBarNotification {
  icon: string;
  color: string;
  title: string;
  sub: string;
  time: string;
  unread: boolean;
}

export interface Plan {
  id: string;
  name: string;
  priceLabel: string;
  txnPctLabel: string;
  features: string[];
  activeSchools: number;
  highlighted?: boolean;
}

export interface Subscription {
  schoolName: string;
  plan: string;
  cycle: string;
  nextChargeLabel: string;
  amountLabel: string;
  status: 'active' | 'late' | 'suspended';
}

export type SaasInvoiceStatus = 'paid' | 'late' | 'pending';

export interface SaasInvoice {
  schoolName: string;
  reference: string;
  amountLabel: string;
  dueDateLabel: string;
  method: string;
  status: SaasInvoiceStatus;
}

export interface FinanceiroTransaction {
  id: string;
  schoolName: string;
  grossLabel: string;
  feeLabel: string;
  netLabel: string;
  status: 'paid' | 'pending' | 'late';
}

export interface WebhookHealthItem {
  label: string;
  value: string;
  tone: BadgeTone;
}

export interface GatewayAccount {
  provider: string;
  environment: string;
  publicKeyMasked: string;
  secretKeyMasked: string;
  webhookUrl: string;
  methods: string[];
}

export interface SplitRule {
  plan: string;
  platformPct: string;
  schoolPct: string;
  teacherPct: string;
  status: 'active';
}

export type KycStatus = 'active' | 'kyc' | 'late' | 'suspended';

export interface Subaccount {
  schoolName: string;
  recipientId: string;
  docsStatus: string;
  status: KycStatus;
}

export type KycStepStatus = 'done' | 'active' | 'pending';

export interface KycStep {
  label: string;
  status: KycStepStatus;
}

export interface ReportType {
  icon: string;
  name: string;
  sub: string;
}

export interface ReportPreviewRow {
  schoolName: string;
  volumeLabel: string;
  platformFeeLabel: string;
  payoutLabel: string;
  delinquencyLabel: string;
}

export type PlatformUserStatus = 'active' | 'invite';

export interface PlatformUser {
  name: string;
  email: string;
  role: string;
  status: PlatformUserStatus;
  lastAccess: string;
}

export interface Profile {
  name: string;
  sub: string;
}
