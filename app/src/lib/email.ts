import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM = process.env.EMAIL_FROM ?? 'Craque <noreply@usecraque.com.br>';
const BASE_URL = process.env.APP_BASE_URL ?? 'https://craque-admin.vercel.app';

async function send(to: string, subject: string, html: string) {
  if (!resend) {
    console.log(`[email] TO: ${to} | SUBJECT: ${subject}\n${html.replace(/<[^>]+>/g, '')}`);
    return;
  }
  await resend.emails.send({ from: FROM, to, subject, html });
}

function base(title: string, body: string) {
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head><body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:40px 16px">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
      <tr><td style="background:#0b1936;border-radius:12px 12px 0 0;padding:28px 36px;text-align:center">
        <span style="font-size:22px;font-weight:800;color:#fff;letter-spacing:-0.5px">⚽ Craque</span>
      </td></tr>
      <tr><td style="background:#fff;padding:36px;border-radius:0 0 12px 12px">
        ${body}
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0">
        <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center">Craque · Gestão de escolinhas de futebol</p>
      </td></tr>
    </table>
  </td></tr>
</table></body></html>`;
}

function btn(url: string, label: string) {
  return `<a href="${url}" style="display:inline-block;background:#0b1936;color:#fff;text-decoration:none;padding:13px 28px;border-radius:8px;font-weight:600;font-size:15px;margin:20px 0">${label}</a>`;
}

// ── 1. Boas-vindas (após signup) ─────────────────────────────────────────────

export async function sendWelcomeEmail(to: string, ownerName: string, schoolName: string) {
  const loginUrl = `${BASE_URL}/escolinha/login`;
  const html = base('Bem-vindo ao Craque!', `
    <h1 style="margin:0 0 8px;font-size:22px;color:#111827">Olá, ${ownerName}!</h1>
    <p style="margin:0 0 16px;color:#374151;line-height:1.6">Sua escolinha <strong>${schoolName}</strong> está configurada e pronta para usar. Você tem um período de trial gratuito — aproveite para cadastrar turmas, alunos e professores.</p>
    <div style="text-align:center">${btn(loginUrl, 'Acessar minha escolinha')}</div>
    <p style="margin:16px 0 0;font-size:13px;color:#6b7280;text-align:center">Ou acesse: <a href="${loginUrl}" style="color:#0b1936">${loginUrl}</a></p>
  `);
  await send(to, `Bem-vindo ao Craque, ${ownerName}!`, html);
}

// ── 2. Convite de membro (professor / manager) ───────────────────────────────

export async function sendMemberInviteEmail(
  to: string,
  memberName: string,
  schoolName: string,
  tempPassword: string,
  role: 'TEACHER' | 'MANAGER',
) {
  const loginUrl = `${BASE_URL}/instrutor/login`;
  const roleLabel = role === 'TEACHER' ? 'professor(a)' : 'gestor(a)';
  const html = base(`Convite — ${schoolName}`, `
    <h1 style="margin:0 0 8px;font-size:22px;color:#111827">Olá, ${memberName}!</h1>
    <p style="margin:0 0 16px;color:#374151;line-height:1.6">Você foi convidado(a) como <strong>${roleLabel}</strong> da escolinha <strong>${schoolName}</strong> no Craque.</p>
    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:20px;margin:20px 0">
      <p style="margin:0 0 6px;font-size:13px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.05em">Seus dados de acesso</p>
      <p style="margin:0 0 4px;color:#111827"><strong>E-mail:</strong> ${to}</p>
      <p style="margin:0;color:#111827"><strong>Senha temporária:</strong> <code style="background:#e5e7eb;padding:2px 8px;border-radius:4px;font-size:14px">${tempPassword}</code></p>
    </div>
    <div style="text-align:center">${btn(loginUrl, 'Acessar o painel do instrutor')}</div>
    <p style="margin:16px 0 0;font-size:13px;color:#6b7280;text-align:center">Recomendamos alterar sua senha após o primeiro acesso.</p>
  `);
  await send(to, `Você foi convidado(a) para a ${schoolName} no Craque`, html);
}

// ── 3. Convite de responsável ────────────────────────────────────────────────

export async function sendGuardianInviteEmail(
  to: string,
  guardianName: string,
  studentName: string,
  schoolName: string,
  tempPassword: string,
) {
  const loginUrl = `${BASE_URL}/escolinha/login`;
  const html = base(`Seu filho(a) está na ${schoolName}`, `
    <h1 style="margin:0 0 8px;font-size:22px;color:#111827">Olá, ${guardianName}!</h1>
    <p style="margin:0 0 16px;color:#374151;line-height:1.6">Você foi cadastrado(a) como responsável de <strong>${studentName}</strong> na escolinha <strong>${schoolName}</strong>. Pelo Craque você acompanha presenças e mensalidades.</p>
    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:20px;margin:20px 0">
      <p style="margin:0 0 6px;font-size:13px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.05em">Seus dados de acesso</p>
      <p style="margin:0 0 4px;color:#111827"><strong>E-mail:</strong> ${to}</p>
      <p style="margin:0;color:#111827"><strong>Senha temporária:</strong> <code style="background:#e5e7eb;padding:2px 8px;border-radius:4px;font-size:14px">${tempPassword}</code></p>
    </div>
    <div style="text-align:center">${btn(loginUrl, 'Acessar o portal')}</div>
    <p style="margin:16px 0 0;font-size:13px;color:#6b7280;text-align:center">Recomendamos alterar sua senha após o primeiro acesso.</p>
  `);
  await send(to, `${studentName} está matriculado(a) na ${schoolName}`, html);
}
