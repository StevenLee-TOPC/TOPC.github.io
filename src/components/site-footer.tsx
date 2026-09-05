import { CONTACT_EMAIL, navLinks } from "@/lib/catalog";
import { BrandName } from "@/components/brand-name";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-paper/10 bg-navy-deep">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 md:grid-cols-[1fr_auto] md:items-center md:px-8">
        <div className="space-y-3">
          <img
            src="/assets/logo.png"
            alt="TOP-C"
            className="h-8 w-auto"
          />
          <p className="max-w-xl text-sm leading-relaxed text-paper/80">
            © {year}{" "}
            <span className="font-semibold text-brand not-italic">TOP-C</span> —{" "}
            <BrandName className="text-paper" />. All rights reserved.
          </p>
          <p className="text-sm text-paper/80">
            Contact:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-paper underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-paper/85 hover:opacity-80"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
