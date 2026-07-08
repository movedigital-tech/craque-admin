import { describe, it, expect, afterEach } from 'vitest';
import bcrypt from 'bcryptjs';
import { testDb } from './setup';

// Each test uses a unique email suffix to avoid conflicts with seed data
const tag = () => `test-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

describe('signup transaction', () => {
  const created: { email?: string; slug?: string } = {};

  afterEach(async () => {
    // Clean up in reverse-dependency order
    if (created.slug) {
      const org = await testDb.organization.findUnique({ where: { slug: created.slug } });
      if (org) {
        await testDb.schoolUnit.deleteMany({ where: { organizationId: org.id } });
        await testDb.membership.deleteMany({ where: { organizationId: org.id } });
        await testDb.platformSubscription.deleteMany({ where: { organizationId: org.id } });
        await testDb.organization.delete({ where: { id: org.id } });
      }
    }
    if (created.email) {
      await testDb.user.deleteMany({ where: { email: created.email } });
    }
    created.email = undefined;
    created.slug = undefined;
  });

  it('creates user + org + membership + schoolUnit atomically', async () => {
    const id = tag();
    const email = `signup-${id}@test.craque`;
    const slug = `fc-test-${id}`;
    const passwordHash = await bcrypt.hash('senha1234', 1); // low rounds for speed

    created.email = email;
    created.slug = slug;

    await testDb.$transaction(async (tx) => {
      const user = await tx.user.create({ data: { name: 'Test User', email, passwordHash } });

      const organization = await tx.organization.create({
        data: {
          name: 'FC Test',
          slug,
          status: 'TRIALING',
          platformSubscription: {
            create: { status: 'TRIALING', trialEndsAt: new Date(Date.now() + 7 * 86400000), gatewayProvider: 'stub' },
          },
        },
      });

      await tx.membership.create({ data: { userId: user.id, organizationId: organization.id, role: 'OWNER' } });
      await tx.schoolUnit.create({ data: { organizationId: organization.id, name: 'Unidade principal', isDefault: true } });
    });

    // Verify all 4 records were created
    const user = await testDb.user.findUnique({ where: { email } });
    expect(user).not.toBeNull();
    expect(user!.name).toBe('Test User');

    const org = await testDb.organization.findUnique({ where: { slug } });
    expect(org).not.toBeNull();
    expect(org!.status).toBe('TRIALING');

    const membership = await testDb.membership.findFirst({ where: { userId: user!.id } });
    expect(membership).not.toBeNull();
    expect(membership!.role).toBe('OWNER');

    const unit = await testDb.schoolUnit.findFirst({ where: { organizationId: org!.id } });
    expect(unit).not.toBeNull();
    expect(unit!.isDefault).toBe(true);

    const sub = await testDb.platformSubscription.findUnique({ where: { organizationId: org!.id } });
    expect(sub).not.toBeNull();
    expect(sub!.status).toBe('TRIALING');
    expect(sub!.trialEndsAt!.getTime()).toBeGreaterThan(Date.now());
  });

  it('new org starts in TRIALING status', async () => {
    const id = tag();
    const email = `trial-${id}@test.craque`;
    const slug = `trial-${id}`;

    created.email = email;
    created.slug = slug;

    const passwordHash = await bcrypt.hash('senha1234', 1);
    await testDb.$transaction(async (tx) => {
      const user = await tx.user.create({ data: { name: 'Trial User', email, passwordHash } });
      const org = await tx.organization.create({
        data: {
          name: 'Trial School',
          slug,
          status: 'TRIALING',
          platformSubscription: {
            create: { status: 'TRIALING', trialEndsAt: new Date(Date.now() + 86400000), gatewayProvider: 'stub' },
          },
        },
      });
      await tx.membership.create({ data: { userId: user.id, organizationId: org.id, role: 'OWNER' } });
      await tx.schoolUnit.create({ data: { organizationId: org.id, name: 'Unidade principal', isDefault: true } });
    });

    const org = await testDb.organization.findUnique({ where: { slug } });
    expect(org!.status).toBe('TRIALING');
  });

  it('duplicate email is rejected by unique constraint', async () => {
    const id = tag();
    const email = `dup-${id}@test.craque`;
    created.email = email;

    const passwordHash = await bcrypt.hash('senha', 1);
    await testDb.user.create({ data: { name: 'First', email, passwordHash } });

    await expect(
      testDb.user.create({ data: { name: 'Second', email, passwordHash } }),
    ).rejects.toThrow();
  });

  it('org slugs are unique', async () => {
    const id = tag();
    const slug = `slug-dup-${id}`;
    created.slug = slug;

    await testDb.organization.create({ data: { name: 'A', slug, status: 'TRIALING' } });

    await expect(
      testDb.organization.create({ data: { name: 'B', slug, status: 'TRIALING' } }),
    ).rejects.toThrow();
  });
});
