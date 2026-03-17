"use server";

import { redirect } from "next/navigation";
import {
  type LoginDTO,
  loginSchema,
} from "@/features/auth/schemas/auth-schemas";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types/action-result";

export async function loginAction(data: LoginDTO): Promise<ActionResult> {
  const validated = loginSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      error: "入力内容に誤りがあります",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validated.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      error: "メールアドレスまたはパスワードが正しくありません",
    };
  }

  redirect("/protected");
}
