import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SPREAD_LOVE_PASSCODE,
  SPREAD_LOVE_UNLOCK_KEY,
} from "@/lib/catalog";

const GAME_HREF = "/spread-love/index.html";

export const Route = createFileRoute("/games/spread-love")({
  component: SpreadLoveEarlyAccess,
  head: () => ({
    meta: [{ title: "Spread Love Early Access | TOP-C" }],
  }),
});

function normalizeCode(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

function openGame() {
  window.location.assign(GAME_HREF);
}

function SpreadLoveEarlyAccess() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [opening, setOpening] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (normalizeCode(code) === normalizeCode(SPREAD_LOVE_PASSCODE)) {
      sessionStorage.setItem(SPREAD_LOVE_UNLOCK_KEY, "1");
      setError("");
      setOpening(true);
      openGame();
      return;
    }
    setError("That passcode is not right. Try again.");
  }

  return (
    <div className="min-h-dvh bg-navy text-paper">
      <div className="scallop scallop-top" aria-hidden="true" />
      <SiteHeader />
      <main className="mx-auto max-w-xl px-5 py-14 md:px-8">
        {opening ? (
          <div className="rounded-lg border border-navy/10 bg-paper p-6 text-ink">
            <p className="font-display text-xl font-semibold">Opening Spread Love…</p>
            <p className="mt-2 text-sm text-muted">
              If the table does not load,{" "}
              <a className="font-semibold text-navy underline" href={GAME_HREF}>
                tap here to play
              </a>
              .
            </p>
          </div>
        ) : (
          <section className="rounded-lg border border-navy/10 bg-paper p-6 text-ink shadow-[0_18px_50px_rgba(0,0,0,0.24)] md:p-8">
            <p className="text-sm font-semibold tracking-wide text-brand">
              Early Access
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
              Spread Love
            </h1>
            <p className="mt-4 leading-relaxed text-muted">
              Use your passcode to open this table.
            </p>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="passcode">Passcode</Label>
                <Input
                  id="passcode"
                  name="passcode"
                  type="password"
                  autoComplete="off"
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter passcode"
                  required
                />
              </div>
              {error ? (
                <p className="text-sm font-medium text-brand" role="alert">
                  {error}
                </p>
              ) : null}
              <Button type="submit" className="w-full">
                Unlock
              </Button>
            </form>
          </section>
        )}
      </main>
      <SiteFooter />
      <div className="scallop scallop-bottom bg-navy-deep" aria-hidden="true" />
    </div>
  );
}
