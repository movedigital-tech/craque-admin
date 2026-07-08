import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import bcrypt from 'bcryptjs';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash('senha123', 10);

  const owner = await db.user.upsert({
    where: { email: 'carla@fcestrela.com' },
    update: {},
    create: { name: 'Carla Mendes', email: 'carla@fcestrela.com', passwordHash },
  });

  const staff = await db.user.upsert({
    where: { email: 'ricardo@movedigital.com.br' },
    update: {},
    create: { name: 'Ricardo Antunes', email: 'ricardo@movedigital.com.br', passwordHash, platformRole: 'ADMIN' },
  });

  const org = await db.organization.upsert({
    where: { slug: 'fc-estrela' },
    update: {},
    create: {
      name: 'FC Estrela',
      slug: 'fc-estrela',
      city: 'São Paulo',
      state: 'SP',
      status: 'ACTIVE',
      platformSubscription: {
        create: { status: 'ACTIVE', gatewayProvider: 'stub' },
      },
    },
  });

  const ownerMembership = await db.membership.upsert({
    where: { userId_organizationId: { userId: owner.id, organizationId: org.id } },
    update: {},
    create: { userId: owner.id, organizationId: org.id, role: 'OWNER' },
  });

  const unit = await db.schoolUnit.upsert({
    where: { id: 'seed-unit-centro' },
    update: {},
    create: { id: 'seed-unit-centro', organizationId: org.id, name: 'Centro', isDefault: true },
  });

  const turmaSub9 = await db.classGroup.upsert({
    where: { id: 'seed-turma-sub9' },
    update: {},
    create: {
      id: 'seed-turma-sub9',
      organizationId: org.id,
      schoolUnitId: unit.id,
      name: 'Sub-9',
      ageRange: '8 a 9 anos',
      capacity: 24,
      teacherMembershipId: ownerMembership.id,
      weekday: 3,
      startTime: '18:00',
      endTime: '19:30',
    },
  });

  const aluno = await db.student.upsert({
    where: { id: 'seed-aluno-lucas' },
    update: {},
    create: { id: 'seed-aluno-lucas', organizationId: org.id, name: 'Lucas Pereira', status: 'ACTIVE' },
  });

  await db.enrollment.upsert({
    where: { id: 'seed-matricula-lucas-sub9' },
    update: {},
    create: { id: 'seed-matricula-lucas-sub9', studentId: aluno.id, classGroupId: turmaSub9.id, status: 'ACTIVE' },
  });

  await db.classSession.upsert({
    where: { id: 'seed-aula-sub9-1' },
    update: {},
    create: { id: 'seed-aula-sub9-1', classGroupId: turmaSub9.id, date: new Date('2026-07-08T18:00:00-03:00'), startTime: '18:00', endTime: '19:30' },
  });

  console.log({ owner: owner.email, staff: staff.email, org: org.slug });
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
