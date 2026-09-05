import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-line bg-paper px-3.5 text-ink outline-none transition-[box-shadow,border-color] duration-150 placeholder:text-muted focus-visible:border-navy-mid focus-visible:ring-4 focus-visible:ring-navy/15",
        className,
      )}
      {...props}
    />
  );
}
