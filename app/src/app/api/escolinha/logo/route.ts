import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireOrgContext } from '@/lib/tenant';

const MAX_SIZE_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];

export async function GET() {
  const { organization } = await requireOrgContext();
  return NextResponse.json({ url: organization.logoUrl });
}

export async function POST(request: Request) {
  const { organization } = await requireOrgContext(['OWNER', 'MANAGER']);

  const formData = await request.formData();
  const file = formData.get('file');
  if (!(file instanceof File)) return NextResponse.json({ error: 'Arquivo não enviado' }, { status: 400 });
  if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ error: 'Formato não suportado. Use PNG, JPG, WEBP ou SVG.' }, { status: 400 });
  if (file.size > MAX_SIZE_BYTES) return NextResponse.json({ error: 'Arquivo maior que 4MB.' }, { status: 400 });

  const extension = file.name.split('.').pop() ?? 'png';
  const blob = await put(`logos/${organization.id}-${Date.now()}.${extension}`, file, { access: 'public' });

  await db.organization.update({ where: { id: organization.id }, data: { logoUrl: blob.url } });

  return NextResponse.json({ url: blob.url });
}
