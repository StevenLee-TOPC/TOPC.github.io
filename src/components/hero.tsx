import { BookOpen, Layers, Scale, Users } from "lucide-react";
import { BrandName } from "@/components/brand-name";
import { Dove } from "@/components/dove";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    key: "decks",
    icon: BookOpen,
    text: (
      <>
        <span className="font-semibold text-brand">Decks inspired</span> by the
        Books of the Bible
      </>
    ),
  },
  {
    key: "games",
    icon: Layers,
    text: (
      <>
        <span className="font-semibold text-brand">Over 16 original games</span>{" "}
        — including <em>Bible Bid</em>, <em>Spread Love</em>, <em>Fly Over</em>,
        and <em>Declaration</em>
      </>
    ),
  },
  {
    key: "play",
    icon: Users,
    text: (
      <>
        <span className="font-semibold text-brand">
          Play solo, 1-on-1, or in strategic
        </span>{" "}
        team formats
      </>
    ),
  },
  {
    key: "chs",
    icon: Scale,
    text: <>Based on CHS — Chronological Hierarchy Structure™. Patent Pending</>,
  },
];

export function Hero() {
  return (
    <section id="home" className="scroll-mt-24 px-5 py-10 md:px-8 md:py-14">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <article className="rounded-lg border border-navy/10 bg-paper p-6 text-ink shadow-[0_18px_50px_rgba(0,0,0,0.24)] md:p-8">
          <div className="mb-4 flex items-center justify-center gap-2 text-navy-mid sm:gap-3">
            <Dove />
            <p className="text-center font-display text-lg font-bold tracking-wide text-ink md:text-xl">
              Welcome to <span className="text-brand">TOP-C</span> Playing Cards
            </p>
            <Dove className="-scale-x-100" />
          </div>

          <p className="mb-6 text-center text-base italic text-ink/90 md:text-lg">
            <BrandName /> — Where Tradition Meets Purpose
          </p>

          <div className="space-y-4 text-base leading-relaxed text-ink/90">
            <p>
              Our card games are designed to help you find fun while learning
              the <strong className="font-semibold text-ink">Word of God</strong>
              . These Card Games offer Strategy and a Fresh Challenge to help
              you be{" "}
              <strong className="font-semibold text-ink">“In The Know.”</strong>
            </p>
            <p>
              Every game in this system promotes wholesome, family-centered fun
              and engagement. The main decks include the{" "}
              <a
                href="#shop"
                className="font-medium text-navy-mid underline underline-offset-4"
              >
                New Testament Deck
              </a>
              , the{" "}
              <a
                href="#shop"
                className="font-medium text-navy-mid underline underline-offset-4"
              >
                Old Testament Deck
              </a>
              , and the{" "}
              <a
                href="#shop"
                className="font-medium text-navy-mid underline underline-offset-4"
              >
                Junior Version
              </a>{" "}
              — all rooted in the content of the Bible.
            </p>
          </div>

          <p className="mt-6 mb-2 font-semibold text-ink">
            We utilize the Whole Bible for all of the adult games:
          </p>
          <ul className="mb-6 space-y-1.5 pl-1 text-ink/90">
            <li>New Testament Version</li>
            <li>Old Testament Version</li>
            <li>Junior Version</li>
          </ul>

          <ul className="space-y-3">
            {benefits.map((item) => (
              <li key={item.key} className="flex gap-3">
                <item.icon
                  className="mt-0.5 size-5 shrink-0 text-brand"
                  strokeWidth={1.75}
                />
                <span className="leading-relaxed text-ink/90">{item.text}</span>
              </li>
            ))}
          </ul>
        </article>

        <aside className="flex flex-col items-center gap-7">
          <img
            src="/assets/card-array.png"
            alt="TOP-C card array across a navy table"
            className="w-full max-w-lg rounded-md border border-paper/10 object-cover shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
          />
          <Button variant="gold" size="lg" className="w-full max-w-sm" asChild>
            <a href="#shop">Buy Cards Now</a>
          </Button>
        </aside>
      </div>
    </section>
  );
}
