import { describe, it, expect } from 'vitest';
import { slugify } from '@/lib/slug';

describe('slugify', () => {
  it('lowercases and replaces spaces with hyphens', () => {
    expect(slugify('FC Estrela')).toBe('fc-estrela');
  });

  it('strips Portuguese diacritics', () => {
    expect(slugify('Escola de Futebol Ação')).toBe('escola-de-futebol-acao');
    expect(slugify('São Paulo')).toBe('sao-paulo');
    expect(slugify('Ação São Paulo')).toBe('acao-sao-paulo');
  });

  it('collapses multiple spaces/hyphens into one', () => {
    expect(slugify('FC  Estrela')).toBe('fc-estrela');
    expect(slugify('FC---Estrela')).toBe('fc-estrela');
  });

  it('strips leading and trailing hyphens', () => {
    expect(slugify('  FC Estrela  ')).toBe('fc-estrela');
  });

  it('replaces special characters with hyphens', () => {
    expect(slugify('FC & Estrela!')).toBe('fc-estrela');
  });

  it('handles numbers', () => {
    expect(slugify('Sub-9')).toBe('sub-9');
    expect(slugify('Turma 2025')).toBe('turma-2025');
  });

  it('returns empty string for blank input', () => {
    expect(slugify('')).toBe('');
    expect(slugify('   ')).toBe('');
  });
});
