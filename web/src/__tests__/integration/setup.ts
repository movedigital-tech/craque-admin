import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
export const testDb = new PrismaClient({ adapter });

beforeAll(async () => {
  await testDb.$connect();
});

afterAll(async () => {
  await testDb.$disconnect();
});
