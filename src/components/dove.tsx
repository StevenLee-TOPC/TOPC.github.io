import { cn } from "@/lib/utils";

export function Dove({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 44"
      fill="currentColor"
      aria-hidden="true"
      className={cn("h-6 w-10", className)}
    >
      <path d="M8 27c9-3 16-12 18-20 2 7 8 12 16 14-5 1-9 5-10 9 7-1 14 2 20 6 5 4 8 8 9 11-8-3-18-3-27 1-6 3-12 2-17-2 4-2 8-5 9-9-4 1-8-1-11-4 2 0 5-1 6-3-3 0-6-1-9-3z" />
      <path d="M44 8c4 3 10 4 17 2-2 5-1 10 3 14-8-1-14-5-16-11 0 3 1 6 3 9-5-2-9-6-10-11 3 0 5-1 7-2-1-1-2-3-2-5 1 1 3 2 4 2z" />
      <circle cx="62" cy="9" r="1.6" />
    </svg>
  );
}
