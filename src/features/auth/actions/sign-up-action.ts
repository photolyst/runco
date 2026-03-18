"use server";

import { redirect } from "next/navigation";
import { env } from "@/env/client";
import {
  type SignUpDTO,
  signUpSchema,
} from "@/features/auth/schemas/auth-schemas";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types/action-result";

export async function signUpAction(data: SignUpDTO): Promise<ActionResult> {
  const validated = signUpSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      error: "入力内容に誤りがあります",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validated.data;

  const supabase = await createClient();
  const origin = env.NEXT_PUBLIC_SITE_URL;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/protected`,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  redirect("/auth/sign-up-success");
}
