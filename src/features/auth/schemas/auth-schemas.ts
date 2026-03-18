import { z } from "zod";
import { emailSchema, passwordSchema } from "@/schemas";

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "パスワードを入力してください"), // ログイン時は空入力チェックのみ
});

export type LoginDTO = z.infer<typeof loginSchema>;

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "パスワードが一致しません",
    path: ["repeatPassword"],
  });

export type SignUpDTO = z.infer<typeof signUpSchema>;

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordDTO = z.infer<typeof forgotPasswordSchema>;

export const updatePasswordSchema = z.object({
  password: passwordSchema,
});

export type UpdatePasswordDTO = z.infer<typeof updatePasswordSchema>;
