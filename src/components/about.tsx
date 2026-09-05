import { BookOpen, ListChecks, MonitorOff, Users } from "lucide-react";
import { BrandName } from "@/components/brand-name";

const callouts = [
  {
    icon: BookOpen,
    title: "Decks inspired",
    body: "by the Books of the Bible",
  },
  {
    icon: Users,
    title: "Solo, versus, and team",
    body: "formats for every table",
  },
  {
    icon: ListChecks,
    title: "Clear rules",
    body: "& quick start guides",
  },
  {
    icon: MonitorOff,
    title: "Screen-free engagement",
    body: "built for families",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-paper-2 px-5 py-16 text-ink md:px-8 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            About <span className="text-brand">TOP-C</span>
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-ink/90">
            <p>
              <span className="font-semibold text-brand">TOP-C</span> —{" "}
              <BrandName /> — delivers fun, strategy, and Scripture-rooted
              learning in an accessible card-game format. From the New and Old
              Testament decks to the Junior Version, our portfolio is
              purpose-built for families, youth groups, and game nights.
            </p>
            <p>
              We prioritize clear rules, high replay value, and content
              fidelity. With 16+ original games and CHS-aligned structure, we
              help players be{" "}
              <strong className="font-semibold text-ink">“In The Know.”</strong>
            </p>
          </div>
        </div>

        <aside className="rounded-lg border border-paper/10 bg-navy p-6 text-paper">
          <h3 className="font-display text-2xl font-semibold">What’s Inside</h3>
          <ul className="mt-5 space-y-4">
            {callouts.map((item) => (
              <li key={item.title} className="flex gap-3">
                <item.icon className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.75} />
                <span className="leading-relaxed">
                  <span className="font-semibold text-gold">{item.title}</span>{" "}
                  {item.body}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
