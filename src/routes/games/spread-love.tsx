import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { FlyoverTable, JoinOrCreate } from "@/components/flyover-lobby";
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
    meta: [{ title: "Fly Over Early Access | TOP-C" }],
  }),
});

function normalizeCode(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

function SpreadLoveEarlyAccess() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(SPREAD_LOVE_UNLOCK_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [mode, setMode] = useState<"pick" | "solo" | "friends" | "table">("pick");
  const [room, setRoom] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [isHost, setIsHost] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (normalizeCode(code) === normalizeCode(SPREAD_LOVE_PASSCODE)) {
      sessionStorage.setItem(SPREAD_LOVE_UNLOCK_KEY, "1");
      setError("");
      setUnlocked(true);
      setMode("pick");
      return;
    }
    setError("That passcode is not right. Try again.");
  }

  function playSolo() {
    try {
      sessionStorage.removeItem("flyover-mp");
    } catch {
      /* ignore */
    }
    window.location.assign(GAME_HREF);
  }

  return (
    <div className="min-h-dvh bg-navy text-paper">
      <div className="scallop scallop-top" aria-hidden="true" />
      <SiteHeader />
      <main className="mx-auto max-w-xl px-5 py-14 md:max-w-3xl md:px-8">
        {!unlocked ? (
          <section className="rounded-lg border border-navy/10 bg-paper p-6 text-ink shadow-[0_18px_50px_rgba(0,0,0,0.24)] md:p-8">
            <p className="text-sm font-semibold tracking-wide text-brand">
              Early Access
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
              Fly Over
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
        ) : mode === "pick" ? (
          <section className="rounded-lg border border-navy/10 bg-paper p-6 text-ink shadow-[0_18px_50px_rgba(0,0,0,0.24)] md:p-8">
            <p className="text-sm font-semibold tracking-wide text-brand">
              Fly Over
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold">How do you want to play?</h1>
            <p className="mt-3 leading-relaxed text-muted">
              Solo is you plus three AI. A private room lets friends sit in; empty seats stay AI.
            </p>
            <div className="mt-6 grid gap-3">
              <Button type="button" className="w-full" onClick={playSolo}>
                Solo vs AI
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setMode("friends")}
              >
                Play with friends
              </Button>
            </div>
          </section>
        ) : mode === "friends" ? (
          <section className="rounded-lg border border-navy/10 bg-paper p-6 text-ink shadow-[0_18px_50px_rgba(0,0,0,0.24)] md:p-8">
            <JoinOrCreate
              onHost={(nextRoom, name) => {
                setRoom(nextRoom);
                setPlayerName(name);
                setIsHost(true);
                setMode("table");
              }}
              onJoin={(nextRoom, name) => {
                setRoom(nextRoom);
                setPlayerName(name);
                setIsHost(false);
                setMode("table");
              }}
            />
            <button
              type="button"
              className="mt-6 text-sm font-semibold text-navy underline"
              onClick={() => setMode("pick")}
            >
              Back
            </button>
          </section>
        ) : (
          <section className="rounded-lg border border-navy/10 bg-paper p-6 text-ink shadow-[0_18px_50px_rgba(0,0,0,0.24)] md:p-8">
            <FlyoverTable
              key={room}
              room={room}
              displayName={playerName}
              isHost={isHost}
            />
          </section>
        )}
      </main>
      <SiteFooter />
      <div className="scallop scallop-bottom bg-navy-deep" aria-hidden="true" />
    </div>
  );
}
