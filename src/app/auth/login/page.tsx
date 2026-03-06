import { LoginForm } from "@/components/login-form";
import { RuncoLogo } from "@/components/runco-logo";

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row min-h-svh w-full items-center justify-center p-6 md:p-10 gap-10">
      <div className="items-center justify-center">
        <RuncoLogo className="text-7xl md:text-9xl" />
      </div>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
