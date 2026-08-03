const NAVY = '#1B212D';
const ACCENT = '#C8EE44';

function layout(title: string, bodyHtml: string): string {
  return `
<div style="background:#F4F5F7;padding:32px 16px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;">
    <div style="background:${NAVY};padding:28px 32px;">
      <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.01em;">Craque</span>
    </div>
    <div style="padding:32px;">
      <h1 style="margin:0 0 16px;font-size:20px;font-weight:700;color:${NAVY};">${title}</h1>
      ${bodyHtml}
    </div>
  </div>
</div>`;
}

function button(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;margin-top:8px;padding:14px 24px;background:${ACCENT};color:${NAVY};font-weight:700;font-size:15px;text-decoration:none;border-radius:12px;">${label}</a>`;
}

export interface WelcomeEmailInput {
  name: string;
  verifyUrl: string;
}

export function welcomeEmailTemplate({ name, verifyUrl }: WelcomeEmailInput): { subject: string; html: string } {
  return {
    subject: 'Confirme seu e-mail para ativar sua conta na Craque',
    html: layout(
      `Bem-vindo(a), ${name} 👋`,
      `<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#4B5563;">
        Sua conta na Craque foi criada. Confirme seu e-mail para poder entrar no painel da sua escolinha.
      </p>
      ${button(verifyUrl, 'Confirmar e-mail')}
      <p style="margin:24px 0 0;font-size:13px;color:#9CA3AF;">Este link expira em 72 horas.</p>`,
    ),
  };
}

export interface MemberInviteEmailInput {
  name: string;
  orgName: string;
  roleLabel: string;
  acceptUrl: string;
}

export function memberInviteEmailTemplate({ name, orgName, roleLabel, acceptUrl }: MemberInviteEmailInput): { subject: string; html: string } {
  return {
    subject: `Você foi convidado(a) para a ${orgName} na Craque`,
    html: layout(
      `Olá, ${name}`,
      `<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#4B5563;">
        Você foi convidado(a) como <strong>${roleLabel}</strong> na escolinha <strong>${orgName}</strong>.
        Defina sua senha para ativar o acesso.
      </p>
      ${button(acceptUrl, 'Definir senha e ativar acesso')}
      <p style="margin:24px 0 0;font-size:13px;color:#9CA3AF;">Este link expira em 72 horas.</p>`,
    ),
  };
}

export interface GuardianInviteEmailInput {
  guardianName: string;
  studentName: string;
  orgName: string;
  acceptUrl: string;
}

export function guardianInviteEmailTemplate({ guardianName, studentName, orgName, acceptUrl }: GuardianInviteEmailInput): { subject: string; html: string } {
  return {
    subject: `Acesso ao painel de responsável — ${orgName}`,
    html: layout(
      `Olá, ${guardianName}`,
      `<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#4B5563;">
        Você foi cadastrado(a) como responsável por <strong>${studentName}</strong> na escolinha <strong>${orgName}</strong>.
        Defina sua senha para acompanhar presença, turmas e cobranças.
      </p>
      ${button(acceptUrl, 'Definir senha e ativar acesso')}
      <p style="margin:24px 0 0;font-size:13px;color:#9CA3AF;">Este link expira em 72 horas.</p>`,
    ),
  };
}
