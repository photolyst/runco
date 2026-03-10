"use client";

import { useState } from "react";
import { AppleLogo } from "@/components/apple-logo";
import { GoogleLogo } from "@/components/google-logo";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface SocialLoginButtonProps {
  provider: "apple" | "google";
}

export function SocialLoginButton({ provider }: SocialLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSocialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/oauth?next=/protected`,
        },
      });

      if (error) throw error;
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      setIsLoading(false);
    }
  };
  const isApple = provider === "apple";
  const label = isApple ? "Continue with Apple" : "Continue with Google";

  return (
    <form onSubmit={handleSocialLogin}>
      <div className="flex flex-col gap-6">
        {error && <p className="text-sm text-destructive-500">{error}</p>}
        <Button
          variant="outline"
          type="submit"
          className="w-full relative border-2 border-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            "Logging in..."
          ) : (
            <>
              {isApple ? (
                <AppleLogo className="absolute left-6" />
              ) : (
                <GoogleLogo className="absolute left-6" />
              )}
              {label}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
