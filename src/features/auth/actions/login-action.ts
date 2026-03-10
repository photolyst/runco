"use server";

import { redirect } from "next/navigation";
import {
  type LoginDTO,
  loginSchema,
} from "@/features/auth/schemas/auth-schemas";
import { createClient } from "@/lib/supabase/server";

export async function loginAction(data: LoginDTO) {
  const validated = loginSchema.safeParse(data);

  if (!validated.success) {
    return {
      error: validated.error.issues[0]?.message || "入力内容に誤りがあります",
    };
  }

  const { email, password } = validated.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/protected");
}
