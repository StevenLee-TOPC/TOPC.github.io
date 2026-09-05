import { STORE_URL, products } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Shop() {
  return (
    <section
      id="shop"
      className="scroll-mt-20 rounded-t-2xl bg-paper px-5 py-16 text-ink shadow-[0_-12px_40px_rgba(0,0,0,0.18)] md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
          Shop
        </h2>
        <p className="mt-2 max-w-2xl text-muted">
          Explore decks and game packs aligned to the content above.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.name}
              className="flex flex-col gap-3 rounded-lg border border-navy/10 bg-paper p-3.5 shadow-[0_12px_28px_rgba(0,0,0,0.06)]"
            >
              <div
                className={cn(
                  "overflow-hidden rounded-md border border-navy/10",
                  product.light ? "bg-paper" : "bg-navy",
                )}
              >
                <img
                  src={product.image}
                  alt={product.alt}
                  className="aspect-square w-full object-contain"
                />
              </div>
              <h3 className="font-display text-xl font-semibold">{product.name}</h3>
              <p className="text-sm leading-relaxed text-muted">{product.blurb}</p>
              {product.price ? (
                <p className="text-base font-bold tabular-nums text-ink">
                  {product.price}
                </p>
              ) : null}
              <div className="mt-auto pt-1">
                {product.comingSoon ? (
                  <Button className="w-full" disabled>
                    Coming Soon
                  </Button>
                ) : (
                  <Button className="w-full" asChild>
                    <a href={STORE_URL} target="_blank" rel="noreferrer">
                      Add to Cart
                    </a>
                  </Button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
