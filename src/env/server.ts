import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // GOOGLE_CLIENT_ID: z.string().min(1),
    // GOOGLE_CLIENT_SECRET: z.string().min(1),
    // APPLE_CLIENT_ID: z.string().min(1),
    // APPLE_CLIENT_SECRET: z.string().min(1),
    // APPLE_TEAM_ID: z.string().min(1),
    // APPLE_KEY_ID: z.string().min(1),
    // APPLE_PRIVATE_KEY: z.string().min(1),
    // SUPABASE_PROJECT_REF: z.string().min(1),
    // SUPABASE_ACCESS_TOKEN: z.string().startsWith("sbp_"),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  experimental__runtimeEnv: process.env,

  // Skip validation when building on Vercel or similar CI environments if needed
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  // Treat empty strings as undefined
  emptyStringAsUndefined: true,
});
