import { RuncoLogo } from "@/components/runco-logo";
import { SignUpForm } from "@/components/sign-up-form";

export default function Page() {
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-primary via-[#f89c5b] to-[#41b2bd]">
      <div className="absolute top-3 left-6 md:top-3 md:left-6">
        <RuncoLogo className="text-4xl md:text-5xl bg-[#fff5f2]" />
      </div>
      <div className="w-full max-w-sm mt-12 md:mt-0">
        <SignUpForm />
      </div>
    </div>
  );
}
