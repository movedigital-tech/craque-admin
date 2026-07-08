import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { testDb } from './setup';

const IDS = {
  org: 'test-att-org',
  unit: 'test-att-unit',
  turma: 'test-att-turma',
  student: 'test-att-student',
  session: 'test-att-session',
  membership: 'test-att-mbr',
  user: 'test-att-user',
};

beforeAll(async () => {
  await testDb.organization.upsert({
    where: { id: IDS.org },
    update: {},
    create: { id: IDS.org, name: 'Att Test Org', slug: `att-test-${Date.now()}`, status: 'ACTIVE' },
  });
  await testDb.schoolUnit.upsert({
    where: { id: IDS.unit },
    update: {},
    create: { id: IDS.unit, organizationId: IDS.org, name: 'Unit', isDefault: true },
  });
  await testDb.classGroup.upsert({
    where: { id: IDS.turma },
    update: {},
    create: { id: IDS.turma, organizationId: IDS.org, schoolUnitId: IDS.unit, name: 'Sub-9 ATT', status: 'ACTIVE', capacity: 20 },
  });
  await testDb.student.upsert({
    where: { id: IDS.student },
    update: {},
    create: { id: IDS.student, organizationId: IDS.org, name: 'Att Student', status: 'ACTIVE' },
  });
  await testDb.classSession.upsert({
    where: { id: IDS.session },
    update: {},
    create: { id: IDS.session, classGroupId: IDS.turma, date: new Date('2026-01-01'), startTime: '18:00', endTime: '19:30' },
  });
  await testDb.user.upsert({
    where: { id: IDS.user },
    update: {},
    create: { id: IDS.user, name: 'Att Tester', email: `att-tester-${Date.now()}@test.craque`, passwordHash: 'x' },
  });
  await testDb.membership.upsert({
    where: { id: IDS.membership },
    update: {},
    create: { id: IDS.membership, userId: IDS.user, organizationId: IDS.org, role: 'TEACHER' },
  });
});

afterAll(async () => {
  await testDb.attendance.deleteMany({ where: { classSessionId: IDS.session } });
  await testDb.classSession.deleteMany({ where: { id: IDS.session } });
  await testDb.student.deleteMany({ where: { id: IDS.student } });
  await testDb.classGroup.deleteMany({ where: { id: IDS.turma } });
  await testDb.membership.deleteMany({ where: { id: IDS.membership } });
  await testDb.user.deleteMany({ where: { id: IDS.user } });
  await testDb.schoolUnit.deleteMany({ where: { id: IDS.unit } });
  await testDb.organization.deleteMany({ where: { id: IDS.org } });
});

describe('attendance uniqueness (DB constraint)', () => {
  it('creates an attendance record', async () => {
    const a = await testDb.attendance.create({
      data: {
        classSessionId: IDS.session,
        studentId: IDS.student,
        status: 'PRESENT',
        markedByMembershipId: IDS.membership,
      },
    });
    expect(a.status).toBe('PRESENT');
  });

  it('duplicate (same session + student) throws P2002', async () => {
    await expect(
      testDb.attendance.create({
        data: {
          classSessionId: IDS.session,
          studentId: IDS.student,
          status: 'ABSENT',
          markedByMembershipId: IDS.membership,
        },
      }),
    ).rejects.toMatchObject({ code: 'P2002' });
  });

  it('upsert is idempotent — updates status without error', async () => {
    const updated = await testDb.attendance.upsert({
      where: { classSessionId_studentId: { classSessionId: IDS.session, studentId: IDS.student } },
      update: { status: 'ABSENT', markedAt: new Date() },
      create: {
        classSessionId: IDS.session,
        studentId: IDS.student,
        status: 'ABSENT',
        markedByMembershipId: IDS.membership,
      },
    });
    expect(updated.status).toBe('ABSENT');
  });

  it('upsert again flips back to PRESENT without error', async () => {
    const updated = await testDb.attendance.upsert({
      where: { classSessionId_studentId: { classSessionId: IDS.session, studentId: IDS.student } },
      update: { status: 'PRESENT', markedAt: new Date() },
      create: {
        classSessionId: IDS.session,
        studentId: IDS.student,
        status: 'PRESENT',
        markedByMembershipId: IDS.membership,
      },
    });
    expect(updated.status).toBe('PRESENT');

    // Only 1 record exists regardless of how many upserts
    const count = await testDb.attendance.count({ where: { classSessionId: IDS.session, studentId: IDS.student } });
    expect(count).toBe(1);
  });
});
