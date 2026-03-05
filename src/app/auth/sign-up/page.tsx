import { SignUpForm } from "@/components/sign-up-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-primary via-[#f89c5b] to-[#41b2bd] ">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
