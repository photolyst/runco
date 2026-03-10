"use server";

import { headers } from "next/headers";
import {
  type ForgotPasswordDTO,
  forgotPasswordSchema,
} from "@/features/auth/schemas/auth-schemas";
import { createClient } from "@/lib/supabase/server";

export async function forgotPasswordAction(data: ForgotPasswordDTO) {
  const validated = forgotPasswordSchema.safeParse(data);

  if (!validated.success) {
    return {
      error: validated.error.issues[0]?.message || "入力内容に誤りがあります",
    };
  }

  const { email } = validated.data;

  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/update-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
