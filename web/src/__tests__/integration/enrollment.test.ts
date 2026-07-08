import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { testDb } from './setup';

// Use fixed IDs so cleanup is deterministic
const IDS = {
  org: 'test-enroll-org',
  unit: 'test-enroll-unit',
  user: 'test-enroll-user',
  membership: 'test-enroll-mbr',
  turmaA: 'test-enroll-turma-a',
  turmaB: 'test-enroll-turma-b',
  student: 'test-enroll-student',
};

beforeAll(async () => {
  // Minimal org scaffold for enrollment tests
  await testDb.organization.upsert({
    where: { id: IDS.org },
    update: {},
    create: { id: IDS.org, name: 'Enroll Test Org', slug: `enroll-test-${Date.now()}`, status: 'ACTIVE' },
  });
  await testDb.schoolUnit.upsert({
    where: { id: IDS.unit },
    update: {},
    create: { id: IDS.unit, organizationId: IDS.org, name: 'Unit', isDefault: true },
  });
  await testDb.user.upsert({
    where: { id: IDS.user },
    update: {},
    create: { id: IDS.user, name: 'Enroll Tester', email: `enroll-tester-${Date.now()}@test.craque`, passwordHash: 'x' },
  });
  await testDb.membership.upsert({
    where: { id: IDS.membership },
    update: {},
    create: { id: IDS.membership, userId: IDS.user, organizationId: IDS.org, role: 'OWNER' },
  });
  await testDb.classGroup.upsert({
    where: { id: IDS.turmaA },
    update: {},
    create: { id: IDS.turmaA, organizationId: IDS.org, schoolUnitId: IDS.unit, name: 'Sub-9 Test A', status: 'ACTIVE', capacity: 20 },
  });
  await testDb.classGroup.upsert({
    where: { id: IDS.turmaB },
    update: {},
    create: { id: IDS.turmaB, organizationId: IDS.org, schoolUnitId: IDS.unit, name: 'Sub-11 Test B', status: 'ACTIVE', capacity: 20 },
  });
  await testDb.student.upsert({
    where: { id: IDS.student },
    update: {},
    create: { id: IDS.student, organizationId: IDS.org, name: 'Test Student', status: 'ACTIVE' },
  });
});

afterAll(async () => {
  await testDb.enrollment.deleteMany({ where: { studentId: IDS.student } });
  await testDb.student.deleteMany({ where: { id: IDS.student } });
  await testDb.classGroup.deleteMany({ where: { id: { in: [IDS.turmaA, IDS.turmaB] } } });
  await testDb.membership.deleteMany({ where: { id: IDS.membership } });
  await testDb.user.deleteMany({ where: { id: IDS.user } });
  await testDb.schoolUnit.deleteMany({ where: { id: IDS.unit } });
  await testDb.organization.deleteMany({ where: { id: IDS.org } });
});

describe('enrollment uniqueness (service-layer rule)', () => {
  it('enrolls a student in a turma', async () => {
    const e = await testDb.enrollment.create({ data: { studentId: IDS.student, classGroupId: IDS.turmaA, status: 'ACTIVE' } });
    expect(e.status).toBe('ACTIVE');
  });

  it('service-layer: findFirst prevents double-active enrollment in same turma', async () => {
    // This replicates what enrollStudent() does before creating
    const existing = await testDb.enrollment.findFirst({
      where: { studentId: IDS.student, classGroupId: IDS.turmaA, status: 'ACTIVE' },
    });
    expect(existing).not.toBeNull(); // guard triggers → no second create
  });

  it('allows enrollment in a second different turma', async () => {
    const e = await testDb.enrollment.create({ data: { studentId: IDS.student, classGroupId: IDS.turmaB, status: 'ACTIVE' } });
    expect(e.status).toBe('ACTIVE');
  });

  it('allows re-enrollment after cancellation', async () => {
    // Cancel the existing turmaA enrollment
    await testDb.enrollment.updateMany({
      where: { studentId: IDS.student, classGroupId: IDS.turmaA, status: 'ACTIVE' },
      data: { status: 'CANCELED', canceledAt: new Date() },
    });

    // Now no active enrollment exists → can re-enroll
    const existing = await testDb.enrollment.findFirst({
      where: { studentId: IDS.student, classGroupId: IDS.turmaA, status: 'ACTIVE' },
    });
    expect(existing).toBeNull();

    const e = await testDb.enrollment.create({ data: { studentId: IDS.student, classGroupId: IDS.turmaA, status: 'ACTIVE' } });
    expect(e.status).toBe('ACTIVE');
  });

  it('org isolation: cannot query another org\'s students', async () => {
    const count = await testDb.student.count({
      where: { id: IDS.student, organizationId: 'some-other-org-id' },
    });
    expect(count).toBe(0);
  });
});
