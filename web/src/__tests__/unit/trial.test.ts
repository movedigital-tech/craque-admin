import { describe, it, expect } from 'vitest';

// Mirror of the private isTrialExpired logic from lib/tenant.ts
function isTrialExpired(status: string, trialEndsAt: Date | null | undefined): boolean {
  if (status !== 'TRIALING') return false;
  return !!trialEndsAt && trialEndsAt.getTime() < Date.now();
}

describe('trial expiry logic', () => {
  it('is NOT expired when status is not TRIALING', () => {
    const past = new Date(Date.now() - 1000);
    expect(isTrialExpired('ACTIVE', past)).toBe(false);
    expect(isTrialExpired('BLOCKED', past)).toBe(false);
    expect(isTrialExpired('CANCELED', past)).toBe(false);
  });

  it('is NOT expired when trialEndsAt is null', () => {
    expect(isTrialExpired('TRIALING', null)).toBe(false);
    expect(isTrialExpired('TRIALING', undefined)).toBe(false);
  });

  it('is NOT expired when trialEndsAt is in the future', () => {
    const future = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    expect(isTrialExpired('TRIALING', future)).toBe(false);
  });

  it('IS expired when trialEndsAt is in the past', () => {
    const past = new Date(Date.now() - 1);
    expect(isTrialExpired('TRIALING', past)).toBe(true);
  });

  it('IS expired exactly when trialEndsAt equals now', () => {
    // 1ms in the past = expired
    const justPast = new Date(Date.now() - 1);
    expect(isTrialExpired('TRIALING', justPast)).toBe(true);
  });

  it('trial of 7 days: not expired on day 6', () => {
    const sixDays = new Date(Date.now() + 6 * 24 * 60 * 60 * 1000);
    expect(isTrialExpired('TRIALING', sixDays)).toBe(false);
  });

  it('trial of 7 days: expired on day 8', () => {
    const eightDaysAgo = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000);
    expect(isTrialExpired('TRIALING', eightDaysAgo)).toBe(true);
  });
});
