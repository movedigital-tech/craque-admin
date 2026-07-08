import { describe, it, expect } from 'vitest';
import { ageFromBirthDate, weekdayLabel, weekdayShortLabel, scheduleLabel } from '@/lib/schedule';

describe('ageFromBirthDate', () => {
  it('returns — for null input', () => {
    expect(ageFromBirthDate(null)).toBe('—');
    expect(ageFromBirthDate(undefined)).toBe('—');
  });

  it('calculates age correctly', () => {
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
    expect(ageFromBirthDate(tenYearsAgo)).toBe('10 anos');
  });

  it('subtracts 1 if birthday not reached this year', () => {
    const almostTen = new Date();
    almostTen.setFullYear(almostTen.getFullYear() - 10);
    almostTen.setDate(almostTen.getDate() + 1); // tomorrow birthday
    expect(ageFromBirthDate(almostTen)).toBe('9 anos');
  });
});

describe('weekdayLabel', () => {
  it('returns correct labels', () => {
    expect(weekdayLabel(0)).toBe('Domingo');
    expect(weekdayLabel(1)).toBe('Segunda');
    expect(weekdayLabel(3)).toBe('Quarta');
    expect(weekdayLabel(6)).toBe('Sábado');
  });

  it('returns — for null/undefined', () => {
    expect(weekdayLabel(null)).toBe('—');
    expect(weekdayLabel(undefined)).toBe('—');
  });
});

describe('weekdayShortLabel', () => {
  it('returns short labels', () => {
    expect(weekdayShortLabel(1)).toBe('SEG');
    expect(weekdayShortLabel(5)).toBe('SEX');
  });
});

describe('scheduleLabel', () => {
  it('returns day only when no time', () => {
    expect(scheduleLabel(3, null, null)).toBe('Quarta');
  });

  it('includes start time when available', () => {
    expect(scheduleLabel(3, '18:00', null)).toBe('Quarta · 18:00');
  });

  it('includes start–end range', () => {
    expect(scheduleLabel(3, '18:00', '19:30')).toBe('Quarta · 18:00–19:30');
  });
});
