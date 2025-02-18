import { z } from 'zod';

const loginSchema = z.object({
  email: z.string({ message: 'Email address is required!' }).email(),
  password: z.string({ message: 'Password is required' }).trim().min(8),
});

type loginType = z.infer<typeof loginSchema>;

export { loginSchema };
export type { loginType };
