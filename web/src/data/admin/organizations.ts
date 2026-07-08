import type { OrganizationRow, OrganizationStatus, StatusMapEntry, SubscriptionRow, WebhookEventRow } from './types';

export const organizations: OrganizationRow[] = [
  { id: 'org_1', name: 'FC Estrela', city: 'São Paulo · SP', ownerName: 'Carlos Nunes', ownerEmail: 'carlos@fcestrela.com', status: 'ACTIVE', createdAt: '12/01/2026', trialEndsAt: null, studentCount: 142 },
  { id: 'org_2', name: 'Academia Bola', city: 'Campinas · SP', ownerName: 'Marina Reis', ownerEmail: 'marina@academiabola.com', status: 'ACTIVE', createdAt: '03/02/2026', trialEndsAt: null, studentCount: 98 },
  { id: 'org_3', name: 'Gol de Placa', city: 'Santos · SP', ownerName: 'Diego Alves', ownerEmail: 'diego@goldeplaca.com', status: 'PAST_DUE', createdAt: '20/02/2026', trialEndsAt: null, studentCount: 54 },
  { id: 'org_4', name: 'CT Raízes', city: 'Sorocaba · SP', ownerName: 'Bruna Lima', ownerEmail: 'bruna@ctraizes.com', status: 'TRIALING', createdAt: '30/06/2026', trialEndsAt: '14/07/2026', studentCount: 6 },
  { id: 'org_5', name: 'Meninos de Ouro', city: 'Guarulhos · SP', ownerName: 'Paulo Souza', ownerEmail: 'paulo@meninosdeouro.com', status: 'BLOCKED', createdAt: '11/03/2026', trialEndsAt: null, studentCount: 0 },
  { id: 'org_6', name: 'Vila Futebol', city: 'Osasco · SP', ownerName: 'Tânia M.', ownerEmail: 'tania@vilafutebol.com', status: 'ACTIVE', createdAt: '05/04/2026', trialEndsAt: null, studentCount: 120 },
  { id: 'org_7', name: 'Arena Plus', city: 'Santo André · SP', ownerName: 'Roberto C.', ownerEmail: 'roberto@arenaplus.com', status: 'TRIALING', createdAt: '02/07/2026', trialEndsAt: '09/07/2026', studentCount: 3 },
  { id: 'org_8', name: 'Escola Talento', city: 'Ribeirão Preto · SP', ownerName: 'Cláudia R.', ownerEmail: 'claudia@escolatalento.com', status: 'CANCELED', createdAt: '18/12/2025', trialEndsAt: null, studentCount: 0 },
];

export const orgStatusMap: Record<OrganizationStatus, StatusMapEntry> = {
  TRIALING: { label: 'Em trial', tone: 'info' },
  ACTIVE: { label: 'Ativa', tone: 'success' },
  PAST_DUE: { label: 'Inadimplente', tone: 'warning' },
  CANCELED: { label: 'Cancelada', tone: 'neutral' },
  BLOCKED: { label: 'Bloqueada', tone: 'danger' },
};

export const subscriptions: SubscriptionRow[] = [
  { organizationId: 'org_1', organizationName: 'FC Estrela', status: 'active', gatewayCustomerId: 'cus_8841', currentPeriodEnd: '12/08/2026', lastPaymentStatus: 'paid' },
  { organizationId: 'org_2', organizationName: 'Academia Bola', status: 'active', gatewayCustomerId: 'cus_2210', currentPeriodEnd: '03/08/2026', lastPaymentStatus: 'paid' },
  { organizationId: 'org_3', organizationName: 'Gol de Placa', status: 'past_due', gatewayCustomerId: 'cus_5567', currentPeriodEnd: '20/06/2026', lastPaymentStatus: 'failed' },
  { organizationId: 'org_4', organizationName: 'CT Raízes', status: 'trialing', gatewayCustomerId: null, currentPeriodEnd: null, lastPaymentStatus: null },
  { organizationId: 'org_5', organizationName: 'Meninos de Ouro', status: 'canceled', gatewayCustomerId: 'cus_3321', currentPeriodEnd: null, lastPaymentStatus: 'failed' },
  { organizationId: 'org_6', organizationName: 'Vila Futebol', status: 'active', gatewayCustomerId: 'cus_7789', currentPeriodEnd: '05/08/2026', lastPaymentStatus: 'paid' },
  { organizationId: 'org_7', organizationName: 'Arena Plus', status: 'trialing', gatewayCustomerId: null, currentPeriodEnd: null, lastPaymentStatus: null },
  { organizationId: 'org_8', organizationName: 'Escola Talento', status: 'canceled', gatewayCustomerId: 'cus_1102', currentPeriodEnd: null, lastPaymentStatus: null },
];

export const webhookEvents: WebhookEventRow[] = [
  { id: 'wh_1', provider: 'stub', eventId: 'evt_00981', type: 'subscription.updated', receivedAt: '08/07/2026 09:14', processedAt: '08/07/2026 09:14', organizationName: 'FC Estrela' },
  { id: 'wh_2', provider: 'stub', eventId: 'evt_00980', type: 'invoice.payment_failed', receivedAt: '06/07/2026 22:40', processedAt: '06/07/2026 22:40', organizationName: 'Gol de Placa' },
  { id: 'wh_3', provider: 'stub', eventId: 'evt_00979', type: 'customer.subscription.created', receivedAt: '30/06/2026 15:02', processedAt: '30/06/2026 15:02', organizationName: 'CT Raízes' },
  { id: 'wh_4', provider: 'stub', eventId: 'evt_00978', type: 'invoice.paid', receivedAt: '05/07/2026 08:00', processedAt: '05/07/2026 08:00', organizationName: 'Vila Futebol' },
  { id: 'wh_5', provider: 'stub', eventId: 'evt_00977', type: 'customer.subscription.deleted', receivedAt: '18/06/2026 11:20', processedAt: null, organizationName: 'Escola Talento' },
];
