import { Link } from "@tanstack/react-router";
import { onlineGames } from "@/lib/catalog";
import { Button } from "@/components/ui/button";

export function OnlineGames() {
  return (
    <section
      id="games"
      className="scroll-mt-20 border-t border-navy/10 bg-paper px-5 py-16 text-ink md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
          Online Games
        </h2>
        <p className="mt-2 max-w-2xl text-muted">
          Play TOP-C favorites in the browser — the same family-centered
          strategy, rooted in the Word of God. More of the 16+ original games
          are on the way.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {onlineGames.map((game) => (
            <article
              key={game.name}
              className="flex flex-col gap-3 rounded-lg border border-navy/10 bg-paper p-5 shadow-[0_12px_28px_rgba(0,0,0,0.06)]"
            >
              <h3 className="font-display text-xl font-semibold">{game.name}</h3>
              <div className="mt-auto pt-1">
                {"href" in game && game.href ? (
                  <Button className="w-full" asChild>
                    <Link to={game.href}>{game.cta}</Link>
                  </Button>
                ) : (
                  <Button className="w-full" disabled>
                    {game.cta}
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
