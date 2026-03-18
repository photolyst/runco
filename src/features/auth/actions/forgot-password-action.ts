"use server";

import { env } from "@/env/client";
import {
  type ForgotPasswordDTO,
  forgotPasswordSchema,
} from "@/features/auth/schemas/auth-schemas";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types/action-result";

export async function forgotPasswordAction(
  data: ForgotPasswordDTO,
): Promise<ActionResult> {
  const validated = forgotPasswordSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      error: "入力内容に誤りがあります",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const { email } = validated.data;

  const supabase = await createClient();
  const origin = env.NEXT_PUBLIC_SITE_URL;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/update-password`,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
