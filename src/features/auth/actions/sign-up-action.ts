"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signUpAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const repeatPassword = formData.get("repeatPassword") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  if (password !== repeatPassword) {
    return { error: "Passwords do not match" };
  }

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
