import { z } from 'zod';

const addressSchema = z.object({
  house_number: z
    .string({
      message: "Business's house number is required",
    })
    .trim(),
  street: z
    .string({
      message: "Business's street is required",
    })
    .trim(),
  city: z
    .string({
      message: "Business's city is required",
    })
    .trim(),
  state: z.enum(['fct', 'lagos', 'port-harcourt']),
});

const logoSchema = z
  .custom<File>((val) => val instanceof File, {
    message: 'Invalid file format',
  })
  .refine((file) => file.type === 'image/jpeg', {
    message: 'Only .jpeg files are allowed',
  })
  .refine((file) => file.size <= 2 * 1024 * 1024, {
    message: 'File size must be 2MB or less',
  });

const businessInfoSchema = z.object({
  name: z
    .string({
      message: "Business's name is required",
    })
    .min(3)
    .trim(),
  phone_number: z
    .string({
      message: "Business's phone number is required",
    })
    .min(11),
  email: z
    .string({
      message: "Business's email is required",
    })
    .email(),
  category: z.enum(['sme', 'corporate']),
  acct_no: z
    .string()
    .trim()
    .length(10, { message: 'Account number must be exactly 10 digits' })
    .nonempty({ message: "Business's account number is required" }),
  logo: logoSchema,
});

const userSchema = z.object({
  name: z
    .string({ message: "Reistering User's name is required" })
    .min(3)
    .trim(),
  phone_number: z
    .string({
      message: "Registering User's phone number is required",
    })
    .min(11),
  email: z
    .string({
      message: "Registering User's email is required",
    })
    .email(),
});

const signupSchema = z
  .object({
    business_address: addressSchema,
    user: userSchema,
    password: z.string({ message: 'Password is required' }).trim().min(8),
    confirm_password: z
      .string({ message: 'Password confirmation is required' })
      .trim()
      .min(8),
  })
  .refine(
    (data) => {
      return data.password === data.confirm_password;
    },
    {
      message: 'Passwords do not match',
      path: ['confirm_password'],
    }
  );

type signupType = z.infer<typeof signupSchema>;
type signupType1 = z.infer<typeof businessInfoSchema>;

export { businessInfoSchema, signupSchema };
export type { signupType, signupType1 };
