import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { OnlineGames } from "@/components/online-games";
import { Shop } from "@/components/shop";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-dvh bg-navy text-paper">
      <div className="scallop scallop-top" aria-hidden="true" />
      <SiteHeader />
      <main>
        <Hero />
        <Shop />
        <OnlineGames />
        <About />
        <Contact />
      </main>
      <SiteFooter />
      <div className="scallop scallop-bottom bg-navy-deep" aria-hidden="true" />
    </div>
  );
}
