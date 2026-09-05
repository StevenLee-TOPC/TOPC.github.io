import { cn } from "@/lib/utils";

export function BrandName({ className }: { className?: string }) {
  return (
    <span className={cn("italic", className)}>
      <span className="font-semibold not-italic text-brand">T</span>he{" "}
      <span className="font-semibold not-italic text-brand">O</span>ther{" "}
      <span className="font-semibold not-italic text-brand">P</span>laying{" "}
      <span className="font-semibold not-italic text-brand">C</span>ards
    </span>
  );
}
