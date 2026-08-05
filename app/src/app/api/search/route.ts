import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireOrgContext } from '@/lib/tenant';

export async function GET(request: Request) {
  const { organization } = await requireOrgContext();

  const q = new URL(request.url).searchParams.get('q')?.trim() ?? '';
  if (q.length < 2) return NextResponse.json({ students: [], classGroups: [] });

  const [students, classGroups] = await Promise.all([
    db.student.findMany({
      where: { organizationId: organization.id, name: { contains: q, mode: 'insensitive' } },
      select: { id: true, name: true },
      take: 5,
      orderBy: { name: 'asc' },
    }),
    db.classGroup.findMany({
      where: { organizationId: organization.id, name: { contains: q, mode: 'insensitive' } },
      select: { id: true, name: true },
      take: 5,
      orderBy: { name: 'asc' },
    }),
  ]);

  return NextResponse.json({ students, classGroups });
}
