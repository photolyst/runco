"use client";

import { ErrorMessage } from "@hookform/error-message";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormErrorMessage } from "@/components/ui/form-error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/features/auth/actions/login-action";
import { SocialLoginButton } from "@/features/auth/components/social-login-button";
import {
  type LoginDTO,
  loginSchema,
} from "@/features/auth/schemas/auth-schemas";
import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDTO>({
    resolver: standardSchemaResolver(loginSchema),
  });

  const onSubmit = async (data: LoginDTO) => {
    setServerError(null);
    const result = await loginAction(data);
    if (!result.success) {
      setServerError(result.error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl">
            <div className="font-semibold text-primary font-[family-name:var(--font-fredoka)]">
              Login
            </div>
          </CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-4">
            <div>
              <SocialLoginButton provider="apple" />
            </div>
            <div>
              <SocialLoginButton provider="google" />
            </div>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs ">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    {...register("email")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => (
                      <FormErrorMessage message={message} />
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/auth/forgot-password"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => (
                      <FormErrorMessage message={message} />
                    )}
                  />
                </div>
                {serverError && <FormErrorMessage message={serverError} />}
                <Button
                  variant="outline"
                  type="submit"
                  className="w-full border-2 border-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/sign-up"
                  className="underline underline-offset-4"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
