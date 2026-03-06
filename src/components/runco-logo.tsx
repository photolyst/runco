import Link from "next/link";
import { cn } from "@/lib/utils";

export function RuncoLogo({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "font-semibold bg-gradient-to-r from-primary via-[#f89c5b] to-[#41b2bd] bg-clip-text text-transparent items-baseline select-none font-[family-name:var(--font-fredoka)]",
        className,
      )}
      {...props}
    >
      <Link href="/">runco.</Link>
    </div>
  );
}
export default RuncoLogo;
