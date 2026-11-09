import { z } from 'zod';

/** Login validation: both fields required (mock auth accepts any non-empty input). */
export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
