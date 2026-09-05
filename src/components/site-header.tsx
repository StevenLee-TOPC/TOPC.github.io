import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-paper/10 bg-navy/92 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 md:px-8">
        <a href="/" className="flex items-center" aria-label="TOP-C Home">
          <img
            src="/assets/logo.png"
            alt="TOP-C — The Other Playing Cards"
            className="h-11 w-auto md:h-12"
          />
        </a>

        <nav
          className="ml-auto hidden items-center gap-5 lg:gap-8 md:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold tracking-wide text-paper/90 transition-opacity duration-150 hover:opacity-80"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-md border border-paper/20 text-paper md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <nav
          className={cn(
            "absolute right-5 top-[4.25rem] flex w-52 flex-col gap-1 rounded-lg border border-paper/15 bg-navy-mid p-2 shadow-lg md:hidden",
            open ? "flex" : "hidden",
          )}
          aria-label="Mobile"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2.5 text-sm font-semibold text-paper hover:bg-paper/10"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
