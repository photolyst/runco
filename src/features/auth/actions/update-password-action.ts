"use server";

import { redirect } from "next/navigation";
import {
  type UpdatePasswordDTO,
  updatePasswordSchema,
} from "@/features/auth/schemas/auth-schemas";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types/action-result";

export async function updatePasswordAction(
  data: UpdatePasswordDTO,
): Promise<ActionResult> {
  const validated = updatePasswordSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      error: "入力内容に誤りがあります",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const { password } = validated.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { success: false, error: error.message };
  }

  redirect("/protected");
}
