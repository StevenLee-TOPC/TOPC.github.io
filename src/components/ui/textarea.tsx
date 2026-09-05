import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-36 w-full rounded-lg border border-line bg-paper px-3.5 py-3 text-ink outline-none transition-[box-shadow,border-color] duration-150 placeholder:text-muted focus-visible:border-navy-mid focus-visible:ring-4 focus-visible:ring-navy/15",
        className,
      )}
      {...props}
    />
  );
}
