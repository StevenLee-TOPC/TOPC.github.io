import { useEffect, useMemo, useRef, useState } from "react";
import { Copy, Users } from "lucide-react";
import { useP2PRoom } from "@/lib/multiplayer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type SeatSlot = { peerId: string | null; name: string };

const SEAT_META = [
  { id: 0, label: "You / Host", team: "Your team" },
  { id: 1, label: "Opponent", team: "Opponents" },
  { id: 2, label: "Partner", team: "Your team" },
  { id: 3, label: "Opponent", team: "Opponents" },
] as const;

type Wire =
  | { t: "hello"; name: string }
  | { t: "seats"; seats: SeatSlot[]; hostId: string; playing: boolean }
  | { t: "claim"; seat: number }
  | { t: "start"; seats: SeatSlot[] }
  | { t: "need-state" }
  | { t: "state"; snap: unknown }
  | { t: "action"; action: "bid" | "play"; seat: number; value?: number; name?: string };

function emptySeats(hostId: string, hostName: string): SeatSlot[] {
  return [
    { peerId: hostId, name: hostName },
    { peerId: null, name: "AI" },
    { peerId: null, name: "AI" },
    { peerId: null, name: "AI" },
  ];
}

export function FlyoverTable({
  room,
  displayName,
  isHost,
}: {
  room: string;
  displayName: string;
  isHost: boolean;
}) {
  const p2p = useP2PRoom({ room, name: displayName });
  const [seats, setSeats] = useState<SeatSlot[]>(() =>
    isHost ? emptySeats("pending", displayName) : emptySeats("pending", "AI"),
  );
  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastSnap = useRef<unknown>(null);
  const hostIdRef = useRef(isHost ? p2p.selfId : "");
  const seatsRef = useRef(seats);
  seatsRef.current = seats;

  useEffect(() => {
    if (isHost) {
      hostIdRef.current = p2p.selfId;
      setSeats((prev) => {
        const next = prev.map((s) => ({ ...s }));
        next[0] = { peerId: p2p.selfId, name: displayName };
        return next;
      });
    }
  }, [isHost, p2p.selfId, displayName]);

  function pushSeats(next: SeatSlot[], nowPlaying = playing) {
    setSeats(next);
    p2p.send({ t: "seats", seats: next, hostId: p2p.selfId, playing: nowPlaying } satisfies Wire);
  }

  useEffect(() => {
    return p2p.onMessage((from, data) => {
      const msg = data as Wire;
      if (!msg || typeof msg !== "object" || !("t" in msg)) return;

      if (isHost) {
        if (msg.t === "hello") {
          setSeats((prev) => {
            const already = prev.findIndex((s) => s.peerId === from);
            if (already >= 0) {
              const next = prev.map((s, i) =>
                i === already ? { peerId: from, name: msg.name || s.name } : s,
              );
              p2p.send({
                t: "seats",
                seats: next,
                hostId: p2p.selfId,
                playing,
              } satisfies Wire);
              return next;
            }
            const open = prev.findIndex((s, i) => i !== 0 && s.peerId === null);
            const next = prev.map((s) => ({ ...s }));
            if (open >= 0) next[open] = { peerId: from, name: msg.name || "Player" };
            p2p.send({
              t: "seats",
              seats: next,
              hostId: p2p.selfId,
              playing,
            } satisfies Wire);
            return next;
          });
        }
        if (msg.t === "claim") {
          setSeats((prev) => {
            const seat = msg.seat;
            if (seat < 1 || seat > 3) return prev;
            if (prev[seat].peerId && prev[seat].peerId !== from) return prev;
            const next = prev.map((s) =>
              s.peerId === from ? { peerId: null, name: "AI" } : { ...s },
            );
            next[seat] = { peerId: from, name: prev.find((s) => s.peerId === from)?.name || "Player" };
            p2p.send({
              t: "seats",
              seats: next,
              hostId: p2p.selfId,
              playing,
            } satisfies Wire);
            return next;
          });
        }
        if (msg.t === "need-state" && lastSnap.current) {
          p2p.send({ t: "state", snap: lastSnap.current } satisfies Wire, from);
        }
        if (msg.t === "action") {
          iframeRef.current?.contentWindow?.postMessage(
            { source: "flyover-parent", kind: "action", ...msg },
            "*",
          );
        }
      } else {
        if (msg.t === "seats") {
          hostIdRef.current = msg.hostId;
          setSeats(msg.seats);
          if (msg.playing) setPlaying(true);
        }
        if (msg.t === "start") {
          setSeats(msg.seats);
          setPlaying(true);
        }
        if (msg.t === "state") {
          iframeRef.current?.contentWindow?.postMessage(
            { source: "flyover-parent", kind: "state", snap: msg.snap },
            "*",
          );
        }
      }
    });
  }, [isHost, p2p, playing]);

  useEffect(() => {
    if (!isHost) return;
    const live = new Set(p2p.peers.map((p) => p.id));
    setSeats((prev) => {
      let changed = false;
      const next = prev.map((s, i) => {
        if (i === 0) return s;
        if (s.peerId && !live.has(s.peerId)) {
          changed = true;
          return { peerId: null, name: "AI" };
        }
        return s;
      });
      if (changed) {
        p2p.send({ t: "seats", seats: next, hostId: p2p.selfId, playing } satisfies Wire);
        return next;
      }
      return prev;
    });
  }, [isHost, p2p, p2p.peers, playing]);

  useEffect(() => {
    if (isHost || !p2p.joined) return;
    p2p.send({ t: "hello", name: displayName } satisfies Wire);
  }, [isHost, p2p, p2p.joined, displayName]);

  const mySeat = seats.findIndex((s) => s.peerId === p2p.selfId);

  function startMatch() {
    const next = seatsRef.current;
    p2p.send({ t: "start", seats: next } satisfies Wire);
    setPlaying(true);
  }

  function writeConfig() {
    const humans = seats.map((s) => Boolean(s.peerId));
    const names = seats.map((s) => s.name);
    const seat = mySeat >= 0 ? mySeat : isHost ? 0 : 1;
    sessionStorage.setItem(
      "flyover-mp",
      JSON.stringify({
        role: isHost ? "host" : "guest",
        seat,
        humans,
        names,
        room,
      }),
    );
  }

  useEffect(() => {
    if (playing) writeConfig();
  }, [playing, seats, mySeat, isHost, room]);

  useEffect(() => {
    if (!playing) return;
    function onMsg(event: MessageEvent) {
      const data = event.data;
      if (!data || data.source !== "flyover") return;
      if (data.kind === "state" && isHost) {
        lastSnap.current = data.snap;
        p2p.send({ t: "state", snap: data.snap } satisfies Wire);
      }
      if (data.kind === "action" && !isHost) {
        p2p.send({
          t: "action",
          action: data.action,
          seat: data.seat,
          value: data.value,
          name: data.name,
        } satisfies Wire);
      }
      if (data.kind === "need-state" && !isHost) {
        p2p.send({ t: "need-state" } satisfies Wire);
      }
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [playing, isHost, p2p]);

  const connectedCount = useMemo(
    () => seats.filter((s) => s.peerId).length,
    [seats],
  );

  if (playing) {
    return (
      <div className="flex min-h-[70dvh] flex-col">
        <p className="mb-2 text-center text-sm text-muted">
          Room <span className="font-semibold text-ink">{room}</span> · {connectedCount} human
          {connectedCount === 1 ? "" : "s"} · empty seats are AI
        </p>
        <iframe
          ref={iframeRef}
          title="Fly Over table"
          src="/spread-love/index.html"
          className="min-h-[70dvh] w-full flex-1 rounded-lg border border-navy/10 bg-[#223a2f]"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold tracking-wide text-brand">Private table</p>
        <h2 className="mt-1 font-display text-2xl font-semibold">Room {room}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Share this code. Empty seats play as AI. Up to four people, partners sit across.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(room);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            } catch {
              setCopied(false);
            }
          }}
        >
          <Copy className="size-4" />
          {copied ? "Copied" : "Copy code"}
        </Button>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted">
          <Users className="size-4" />
          {p2p.joined ? `${p2p.peers.length + 1} connected` : "Connecting…"}
        </span>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {SEAT_META.map((meta) => {
          const slot = seats[meta.id];
          const filled = Boolean(slot?.peerId);
          const mine = slot?.peerId === p2p.selfId;
          return (
            <li
              key={meta.id}
              className="rounded-lg border border-navy/10 bg-paper p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                {meta.team}
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-ink">
                {meta.label}
              </p>
              <p className="mt-1 text-sm text-muted">
                {filled ? slot.name : "AI will sit here"}
                {mine ? " (you)" : ""}
              </p>
              {!isHost && !mine && !filled ? (
                <Button
                  type="button"
                  variant="outline"
                  className="mt-3"
                  onClick={() => p2p.send({ t: "claim", seat: meta.id } satisfies Wire)}
                >
                  Sit here
                </Button>
              ) : null}
            </li>
          );
        })}
      </ul>

      {isHost ? (
        <Button type="button" className="w-full" onClick={startMatch}>
          Start game
        </Button>
      ) : (
        <p className="text-center text-sm text-muted">Waiting for the host to start.</p>
      )}
    </div>
  );
}

export function makeRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "FO";
  for (let i = 0; i < 4; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)] ?? "X";
  }
  return code;
}

export function JoinOrCreate({
  onHost,
  onJoin,
}: {
  onHost: (room: string, name: string) => void;
  onJoin: (room: string, name: string) => void;
}) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold">Play with friends</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Start a private room and share the code. Anyone missing is filled by AI.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="player-name">Your name</Label>
        <Input
          id="player-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Justin"
          maxLength={24}
        />
      </div>
      <Button
        type="button"
        className="w-full"
        onClick={() => {
          if (!name.trim()) {
            setError("Add your name first.");
            return;
          }
          onHost(makeRoomCode(), name.trim());
        }}
      >
        Create room
      </Button>
      <div className="relative py-1 text-center text-xs font-semibold uppercase tracking-wide text-muted">
        or join
      </div>
      <div className="space-y-2">
        <Label htmlFor="room-code">Room code</Label>
        <Input
          id="room-code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="FO7K2M"
          maxLength={8}
        />
      </div>
      {error ? (
        <p className="text-sm font-medium text-brand" role="alert">
          {error}
        </p>
      ) : null}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => {
          if (!name.trim()) {
            setError("Add your name first.");
            return;
          }
          const room = code.trim().toUpperCase();
          if (!/^FO[A-Z0-9]{4}$/.test(room)) {
            setError("That code should look like FO7K2M.");
            return;
          }
          onJoin(room, name.trim());
        }}
      >
        Join room
      </Button>
    </div>
  );
}
