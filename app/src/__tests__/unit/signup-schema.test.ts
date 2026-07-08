import { describe, it, expect } from 'vitest';
import { signupSchema } from '@/lib/validation/signup';

describe('signupSchema', () => {
  const valid = {
    name: 'João Silva',
    email: 'joao@exemplo.com',
    password: 'senha1234',
    schoolName: 'FC Estrela',
  };

  it('accepts valid input', () => {
    expect(signupSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects name shorter than 2 characters', () => {
    const r = signupSchema.safeParse({ ...valid, name: 'J' });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.flatten().fieldErrors.name).toBeDefined();
  });

  it('rejects invalid email', () => {
    const r = signupSchema.safeParse({ ...valid, email: 'nao-e-email' });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.flatten().fieldErrors.email).toBeDefined();
  });

  it('rejects password shorter than 8 characters', () => {
    const r = signupSchema.safeParse({ ...valid, password: 'abc123' });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.flatten().fieldErrors.password).toBeDefined();
  });

  it('rejects schoolName shorter than 2 characters', () => {
    const r = signupSchema.safeParse({ ...valid, schoolName: 'F' });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.flatten().fieldErrors.schoolName).toBeDefined();
  });

  it('rejects missing fields', () => {
    expect(signupSchema.safeParse({}).success).toBe(false);
  });
});
