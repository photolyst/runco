"use server";

import { redirect } from "next/navigation";
import {
  type UpdatePasswordDTO,
  updatePasswordSchema,
} from "@/features/auth/schemas/auth-schemas";
import { createClient } from "@/lib/supabase/server";

export async function updatePasswordAction(data: UpdatePasswordDTO) {
  const validated = updatePasswordSchema.safeParse(data);

  if (!validated.success) {
    return {
      error: validated.error.issues[0]?.message || "入力内容に誤りがあります",
    };
  }

  const { password } = validated.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: error.message };
  }

  redirect("/protected");
}
