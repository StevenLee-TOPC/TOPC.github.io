import { type FormEvent, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "error" | "sent";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      return;
    }

    const subject = encodeURIComponent(`Website Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nFeedback:\n${message}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-paper px-5 py-16 text-ink md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">Contact</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Questions or feedback? We’d love to hear from you.
        </p>

        <form
          onSubmit={onSubmit}
          noValidate
          className="mt-8 max-w-xl rounded-lg border border-navy/10 bg-paper-2 p-5 shadow-[0_12px_28px_rgba(0,0,0,0.06)] md:p-6"
        >
          <div className="mb-4 space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Your name" required />
          </div>
          <div className="mb-4 space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-5 space-y-2">
            <Label htmlFor="message">Feedback</Label>
            <Textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Share your thoughts…"
              required
            />
          </div>
          <Button type="submit">Send</Button>
          {status === "error" ? (
            <p className="mt-3 text-sm font-medium text-brand" role="alert">
              Please complete all fields.
            </p>
          ) : null}
          {status === "sent" ? (
            <p className="mt-3 text-sm font-medium text-navy">
              Opening your email app to send the message.
            </p>
          ) : null}
          <p className="mt-4 text-sm text-muted">
            Or email us directly at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-navy underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </form>
      </div>
    </section>
  );
}
