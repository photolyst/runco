"use client";

import { useState } from "react";
import { AppleLogo } from "@/components/apple-logo";
import { GoogleLogo } from "@/components/google-logo";
import { Button } from "@/components/ui/button";
import { socialLoginAction } from "@/features/auth/actions/social-login-action";

interface SocialLoginButtonProps {
  provider: "apple" | "google";
}

export function SocialLoginButton({ provider }: SocialLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSocialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await socialLoginAction(provider);
      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      }
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
