import { db } from '@/lib/db';
import { findInvitationToken } from '@/lib/email/tokens';
import { acceptInvite } from '@/server/actions/invites';
import { Button, Icon, Input } from '@/components/ds';

async function loadInvite(rawToken: string) {
  const token = await findInvitationToken(rawToken, ['MEMBER_INVITE', 'GUARDIAN_INVITE']);
  if (!token || !token.membershipId) return null;

  const membership = await db.membership.findUnique({
    where: { id: token.membershipId },
    include: { user: true, organization: true },
  });
  if (!membership) return null;

  return { name: membership.user.name, orgName: membership.organization.name };
}

export default async function AceitarConvitePage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token: rawToken } = await searchParams;
  const invite = rawToken ? await loadInvite(rawToken) : null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-canvas)', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span
            style={{ width: 66, height: 66, borderRadius: 19, background: 'var(--navy-900)', display: 'inline-grid', placeItems: 'center', marginBottom: 16 }}
          >
            <Icon name="trophy" size={32} style={{ color: 'var(--accent)' }} />
          </span>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, lineHeight: 1 }}>Craque</div>
        </div>

        {!invite ? (
          <div style={{ background: 'var(--surface-card)', borderRadius: 16, padding: 28, textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-bold)' }}>Convite inválido</h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>
              Este link de convite é inválido ou já expirou. Peça para a escolinha enviar um novo convite.
            </p>
          </div>
        ) : (
          <div style={{ background: 'var(--surface-card)', borderRadius: 16, padding: 28 }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-bold)' }}>Olá, {invite.name}</h2>
            <p style={{ margin: '0 0 24px', color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>
              Defina sua senha para ativar seu acesso na <strong>{invite.orgName}</strong>.
            </p>
            <form action={acceptInvite} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input type="hidden" name="token" value={rawToken} />
              <Input label="Nova senha" name="password" type="password" placeholder="••••••••" leadingIcon="lock" required minLength={8} />
              <Button type="submit" variant="primary" size="lg" fullWidth leadingIcon="check">
                Ativar acesso
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
