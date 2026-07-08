const WEEKDAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const WEEKDAYS_SHORT = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

export function weekdayLabel(weekday: number | null | undefined): string {
  if (weekday === null || weekday === undefined) return '—';
  return WEEKDAYS[weekday] ?? '—';
}

export function weekdayShortLabel(weekday: number | null | undefined): string {
  if (weekday === null || weekday === undefined) return '—';
  return WEEKDAYS_SHORT[weekday] ?? '—';
}

export function scheduleLabel(weekday: number | null | undefined, startTime: string | null | undefined, endTime: string | null | undefined): string {
  const day = weekdayLabel(weekday);
  if (!startTime) return day;
  return `${day} · ${startTime}${endTime ? `–${endTime}` : ''}`;
}

export function ageFromBirthDate(birthDate: Date | null | undefined): string {
  if (!birthDate) return '—';
  const now = new Date();
  let age = now.getFullYear() - birthDate.getFullYear();
  const monthDiff = now.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) age -= 1;
  return `${age} anos`;
}
