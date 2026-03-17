"use server";

import type { Provider } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types/action-result";

export async function socialLoginAction(
  provider: Provider,
): Promise<ActionResult> {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/oauth?next=/protected`,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  if (data?.url) {
    redirect(data.url);
  }

  return { success: false, error: "Could not generate redirect URL" };
}
