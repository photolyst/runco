"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  type SignUpDTO,
  signUpSchema,
} from "@/features/auth/schemas/auth-schemas";
import { createClient } from "@/lib/supabase/server";

export async function signUpAction(data: SignUpDTO) {
  const validated = signUpSchema.safeParse(data);

  if (!validated.success) {
    return {
      error: validated.error.issues[0]?.message || "入力内容に誤りがあります",
    };
  }

  const { email, password } = validated.data;

  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/protected`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/auth/sign-up-success");
}
