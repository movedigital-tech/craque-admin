import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { signupSchema } from '@/lib/validation/signup';
import { slugify } from '@/lib/slug';
import { createInvitationToken } from '@/lib/email/tokens';
import { emailProvider } from '@/lib/email/resend-provider';
import { welcomeEmailTemplate } from '@/lib/email/templates';

const TRIAL_DAYS = Number(process.env.TRIAL_DAYS ?? '7');

async function uniqueSlug(base: string): Promise<string> {
  const root = slugify(base) || 'escolinha';
  let slug = root;
  let n = 1;
  while (await db.organization.findUnique({ where: { slug } })) {
    n += 1;
    slug = `${root}-${n}`;
  }
  return slug;
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { name, email, password, schoolName } = parsed.data;

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: { email: ['Este e-mail já está em uso'] } }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const slug = await uniqueSlug(schoolName);
  const trialEndsAt = new Date(Date.now() + TRIAL_DAYS * 24 * 60 * 60 * 1000);

  const verificationToken = await db.$transaction(async (tx) => {
    const user = await tx.user.create({ data: { name, email, passwordHash } });

    const organization = await tx.organization.create({
      data: {
        name: schoolName,
        slug,
        status: 'TRIALING',
        platformSubscription: {
          create: { status: 'TRIALING', trialEndsAt, gatewayProvider: 'stub' },
        },
      },
    });

    await tx.membership.create({
      data: { userId: user.id, organizationId: organization.id, role: 'OWNER' },
    });

    await tx.schoolUnit.create({
      data: { organizationId: organization.id, name: 'Unidade principal', isDefault: true },
    });

    return createInvitationToken(tx, { userId: user.id, type: 'EMAIL_VERIFICATION' });
  });

  try {
    const verifyUrl = `${process.env.APP_BASE_URL}/api/auth/verify-email?token=${verificationToken}`;
    await emailProvider.send({ to: email, ...welcomeEmailTemplate({ name, verifyUrl }) });
  } catch (err) {
    console.error('[signup] failed to send welcome email', err);
  }

  return NextResponse.json({ ok: true });
}
