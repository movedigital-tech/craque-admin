import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import type { MembershipRole, EnrollmentStatus, AttendanceStatus } from '../src/generated/prisma/client';
import bcrypt from 'bcryptjs';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

const PASSWORD = 'senha123';

const FIRST_NAMES = [
  'Lucas', 'Gabriel', 'Matheus', 'Pedro', 'Rafael', 'Enzo', 'Miguel', 'Arthur', 'Bernardo', 'Davi',
  'Heitor', 'Théo', 'Nicolas', 'Bryan', 'Vitor', 'Bruno', 'Diego', 'Felipe', 'Guilherme', 'Igor',
  'Maria', 'Ana', 'Sofia', 'Alice', 'Laura', 'Julia', 'Isabela', 'Manuela', 'Helena', 'Valentina',
  'Beatriz', 'Larissa', 'Camila', 'Fernanda', 'Juliana', 'Patricia', 'Carla', 'Renata', 'Amanda', 'Bianca',
];
const LAST_NAMES = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Costa', 'Rodrigues', 'Almeida', 'Ferreira', 'Lima',
  'Gomes', 'Ribeiro', 'Carvalho', 'Barbosa', 'Martins', 'Araujo', 'Melo', 'Nascimento', 'Moreira', 'Cardoso',
];

function name(seed: number): string {
  return `${FIRST_NAMES[seed % FIRST_NAMES.length]} ${LAST_NAMES[(seed * 7) % LAST_NAMES.length]}`;
}

function slugifyEmail(fullName: string): string {
  return fullName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '.')
    .replace(/(^\.|\.$)/g, '');
}

interface OrgSpec {
  slug: string;
  name: string;
  city: string;
  state: string;
  turmas: { id: string; name: string; ageRange: string; weekdays: number[]; startTime: string; endTime: string; capacity: number }[];
  staffCount: number;
  studentCount: number;
}

const ORGS: OrgSpec[] = [
  {
    slug: 'demo-gavioes-fc',
    name: 'Gaviões FC',
    city: 'São Paulo',
    state: 'SP',
    turmas: [
      { id: 'demo-gavioes-sub7', name: 'Sub-7', ageRange: '6 a 7 anos', weekdays: [2, 4], startTime: '17:00', endTime: '18:00', capacity: 16 },
      { id: 'demo-gavioes-sub11', name: 'Sub-11', ageRange: '10 a 11 anos', weekdays: [1, 3, 5], startTime: '18:30', endTime: '20:00', capacity: 22 },
      { id: 'demo-gavioes-sub15', name: 'Sub-15', ageRange: '14 a 15 anos', weekdays: [2, 4], startTime: '19:00', endTime: '20:30', capacity: 20 },
    ],
    staffCount: 5,
    studentCount: 20,
  },
  {
    slug: 'demo-leoes-da-serra',
    name: 'Leões da Serra',
    city: 'Belo Horizonte',
    state: 'MG',
    turmas: [
      { id: 'demo-leoes-sub9', name: 'Sub-9', ageRange: '8 a 9 anos', weekdays: [1, 3], startTime: '16:00', endTime: '17:15', capacity: 18 },
      { id: 'demo-leoes-sub13', name: 'Sub-13', ageRange: '12 a 13 anos', weekdays: [2, 4, 6], startTime: '09:00', endTime: '10:30', capacity: 24 },
    ],
    staffCount: 4,
    studentCount: 17,
  },
  {
    slug: 'demo-tubaroes-do-litoral',
    name: 'Tubarões do Litoral',
    city: 'Santos',
    state: 'SP',
    turmas: [
      { id: 'demo-tubaroes-sub8', name: 'Sub-8', ageRange: '7 a 8 anos', weekdays: [3, 5], startTime: '15:30', endTime: '16:30', capacity: 16 },
      { id: 'demo-tubaroes-sub12', name: 'Sub-12', ageRange: '11 a 12 anos', weekdays: [2, 4], startTime: '17:30', endTime: '19:00', capacity: 20 },
      { id: 'demo-tubaroes-livre', name: 'Livre (misto)', ageRange: '9 a 14 anos', weekdays: [6], startTime: '08:00', endTime: '10:00', capacity: 30 },
    ],
    staffCount: 5,
    studentCount: 18,
  },
];

const STAFF_ROLES: MembershipRole[] = ['OWNER', 'MANAGER', 'TEACHER', 'TEACHER', 'TEACHER'];
const ATTENDANCE_CYCLE: AttendanceStatus[] = ['PRESENT', 'PRESENT', 'PRESENT', 'ABSENT', 'PRESENT', 'JUSTIFIED', 'PRESENT', 'LATE'];

async function seedOrg(spec: OrgSpec, orgSeed: number) {
  const passwordHash = await bcrypt.hash(PASSWORD, 10);

  const org = await db.organization.upsert({
    where: { slug: spec.slug },
    update: {},
    create: {
      name: spec.name,
      slug: spec.slug,
      city: spec.city,
      state: spec.state,
      status: 'ACTIVE',
      platformSubscription: { create: { status: 'ACTIVE', gatewayProvider: 'stub' } },
    },
  });

  const unit = await db.schoolUnit.upsert({
    where: { id: `${spec.slug}-unit` },
    update: {},
    create: { id: `${spec.slug}-unit`, organizationId: org.id, name: 'Unidade principal', isDefault: true },
  });

  // Staff (owner + managers/teachers)
  const staffMemberships: { id: string; role: MembershipRole }[] = [];
  for (let i = 0; i < spec.staffCount; i++) {
    const role = STAFF_ROLES[i] ?? 'TEACHER';
    const staffName = `${name(orgSeed * 100 + i)}${role === 'OWNER' ? '' : ''}`;
    const email = `${slugifyEmail(staffName)}.${spec.slug.replace('demo-', '')}@example-craque.com`;

    const user = await db.user.upsert({
      where: { email },
      update: {},
      create: { name: staffName, email, passwordHash, emailVerified: new Date() },
    });

    const membership = await db.membership.upsert({
      where: { userId_organizationId: { userId: user.id, organizationId: org.id } },
      update: { role, status: 'ACTIVE' },
      create: { userId: user.id, organizationId: org.id, role, status: 'ACTIVE' },
    });

    staffMemberships.push({ id: membership.id, role });
  }

  const teacherMemberships = staffMemberships.filter((m) => m.role === 'TEACHER');

  // Turmas, one teacher assigned round-robin
  const classGroupIds: string[] = [];
  for (let i = 0; i < spec.turmas.length; i++) {
    const t = spec.turmas[i];
    const teacher = teacherMemberships[i % teacherMemberships.length];
    const classGroup = await db.classGroup.upsert({
      where: { id: t.id },
      update: { teacherMembershipId: teacher?.id },
      create: {
        id: t.id,
        organizationId: org.id,
        schoolUnitId: unit.id,
        name: t.name,
        ageRange: t.ageRange,
        capacity: t.capacity,
        teacherMembershipId: teacher?.id,
        weekdays: t.weekdays,
        startTime: t.startTime,
        endTime: t.endTime,
        status: 'ACTIVE',
      },
    });
    classGroupIds.push(classGroup.id);
  }

  // Students + guardians + enrollments
  const studentIds: string[] = [];
  for (let i = 0; i < spec.studentCount; i++) {
    const studentSeed = orgSeed * 1000 + i;
    const studentName = name(studentSeed);
    const studentId = `${spec.slug}-aluno-${i}`;
    const birthYear = 2026 - (7 + (i % 9));

    const student = await db.student.upsert({
      where: { id: studentId },
      update: {},
      create: {
        id: studentId,
        organizationId: org.id,
        name: studentName,
        birthDate: new Date(`${birthYear}-0${(i % 9) + 1}-15`),
        status: 'ACTIVE',
      },
    });
    studentIds.push(student.id);

    // ~85% of students have a guardian on file
    if (i % 7 !== 6) {
      const guardianName = name(studentSeed + 500);
      const guardianEmail = `${slugifyEmail(guardianName)}.resp${i}.${spec.slug.replace('demo-', '')}@example-craque.com`;

      const guardianUser = await db.user.upsert({
        where: { email: guardianEmail },
        update: {},
        create: { name: guardianName, email: guardianEmail, passwordHash, emailVerified: new Date() },
      });

      const guardianMembership = await db.membership.upsert({
        where: { userId_organizationId: { userId: guardianUser.id, organizationId: org.id } },
        update: { status: 'ACTIVE' },
        create: { userId: guardianUser.id, organizationId: org.id, role: 'GUARDIAN', status: 'ACTIVE' },
      });

      await db.studentGuardian.upsert({
        where: { studentId_membershipId: { studentId: student.id, membershipId: guardianMembership.id } },
        update: {},
        create: { studentId: student.id, membershipId: guardianMembership.id, isPrimary: true },
      });
    }

    // ~90% enrolled in a turma (mostly ACTIVE, a few PENDING pré-matrícula)
    if (i % 10 !== 9 && classGroupIds.length > 0) {
      const classGroupId = classGroupIds[i % classGroupIds.length];
      const status: EnrollmentStatus = i % 12 === 0 ? 'PENDING' : 'ACTIVE';
      await db.enrollment.upsert({
        where: { id: `${studentId}-matricula` },
        update: { status },
        create: { id: `${studentId}-matricula`, studentId: student.id, classGroupId, status },
      });
    }
  }

  // Class sessions (last 3 occurrences) + attendance for the last 2, marked by a teacher
  const markerMembershipId = teacherMemberships[0]?.id;
  for (const classGroupId of classGroupIds) {
    const enrollments = await db.enrollment.findMany({ where: { classGroupId, status: 'ACTIVE' } });

    for (let s = 0; s < 3; s++) {
      const daysAgo = (s + 1) * 7;
      const date = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
      const sessionId = `${classGroupId}-sessao-${s}`;

      const session = await db.classSession.upsert({
        where: { id: sessionId },
        update: {},
        create: { id: sessionId, classGroupId, date, startTime: '00:00', endTime: '00:00' },
      });

      if (s < 2) {
        for (let e = 0; e < enrollments.length; e++) {
          const status = ATTENDANCE_CYCLE[(e + s) % ATTENDANCE_CYCLE.length];
          await db.attendance.upsert({
            where: { classSessionId_studentId: { classSessionId: session.id, studentId: enrollments[e].studentId } },
            update: { status },
            create: {
              classSessionId: session.id,
              studentId: enrollments[e].studentId,
              status,
              markedByMembershipId: markerMembershipId,
            },
          });
        }
      }
    }
  }

  console.log(`✓ ${spec.name}: ${spec.staffCount} membros, ${spec.turmas.length} turmas, ${spec.studentCount} alunos`);
}

async function main() {
  for (let i = 0; i < ORGS.length; i++) {
    await seedOrg(ORGS[i], i + 1);
  }
  console.log('\nSenha de todas as contas de demo: senha123');
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
