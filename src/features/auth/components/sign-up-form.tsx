"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpAction } from "@/features/auth/actions/sign-up-action";
import { SocialLoginButton } from "@/features/auth/components/social-login-button";
import {
  type SignUpDTO,
  signUpSchema,
} from "@/features/auth/schemas/auth-schemas";
import { cn } from "@/lib/utils";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpDTO>({
    resolver: standardSchemaResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpDTO) => {
    setServerError(null);
    const result = await signUpAction(data);
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
              Sign up
            </div>
          </CardTitle>
          <CardDescription>Create a new account</CardDescription>
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
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="repeat-password">Repeat Password</Label>
                  </div>
                  <Input
                    id="repeat-password"
                    type="password"
                    {...register("repeatPassword")}
                  />
                  {errors.repeatPassword && (
                    <p className="text-sm text-red-500">
                      {errors.repeatPassword.message}
                    </p>
                  )}
                </div>
                {serverError && (
                  <p className="text-sm text-red-500">{serverError}</p>
                )}
                <Button
                  variant="outline"
                  type="submit"
                  className="w-full border-2 border-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating an account..." : "Sign up"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
