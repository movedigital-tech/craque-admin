import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2, 'Informe seu nome completo'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'A senha precisa ter ao menos 8 caracteres'),
  schoolName: z.string().min(2, 'Informe o nome da escolinha'),
});

export type SignupInput = z.infer<typeof signupSchema>;
