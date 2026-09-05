import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-[transform,background-color,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/80 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-55 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default:
          "bg-navy text-paper hover:bg-navy-mid focus-visible:ring-offset-paper",
        gold: "bg-gold text-gold-ink shadow-[0_10px_24px_rgba(0,0,0,0.18)] hover:brightness-105 focus-visible:ring-offset-navy",
        outline:
          "border border-line bg-paper text-ink hover:bg-paper-2 focus-visible:ring-offset-paper",
        ghost:
          "bg-transparent text-paper hover:bg-paper/10 focus-visible:ring-offset-navy",
      },
      size: {
        default: "h-11 rounded-md px-4 text-sm",
        lg: "h-14 rounded-full px-8 text-base",
        sm: "h-9 rounded-md px-3 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
