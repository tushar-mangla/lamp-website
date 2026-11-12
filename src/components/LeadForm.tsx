"use client";

import { useState } from "react";
import { season, site } from "@/lib/site";

/** "Remind me" capture (email). Falls back to a prefilled email if the backend isn't configured. */
export function LeadForm({ tone = "light", title, text }: { tone?: "light" | "dark"; title?: string; text?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "fallback" | "error">("idle");
  const [error, setError] = useState("");
  const dark = tone === "dark";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const contact = String(new FormData(e.currentTarget).get("contact") ?? "");
    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "reminder", contact, details: { occasion: season.occasion } }),
      });
      if (res.ok) return setState("done");
      const data = await res.json().catch(() => ({}));
      if (res.status === 503) {
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Remind me: MOTIFLO")}&body=${encodeURIComponent(`Please remind me before ${season.occasion}: ${contact}`)}`;
        return setState("fallback");
      }
      setError(data.error || "Something went wrong.");
      setState("error");
    } catch {
      setError("Network error. Please try again.");
      setState("error");
    }
  }

  return (
    <div>
      <p className={`font-display text-3xl ${dark ? "text-ivory" : ""}`}>{title ?? `Not ready yet? We'll remind you before ${season.occasion}.`}</p>
      <p className={`mt-2 text-sm ${dark ? "text-ivory/65" : "text-muted"}`}>{text ?? "One email before the order-by date. No spam, unsubscribe anytime."}</p>
      {state === "done" ? (
        <p role="status" className={`mt-5 font-medium ${dark ? "text-glow" : "text-brass-deep"}`}>Done. We&apos;ll remind you. ✦</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="lead-contact">Email address</label>
          <input
            id="lead-contact"
            name="contact"
            type="email"
            required
            placeholder="Your email address"
            autoComplete="email"
            className={`h-12 flex-1 rounded-full border px-5 text-base outline-none transition ${dark ? "border-ivory/25 bg-ivory/5 text-ivory placeholder:text-ivory/45 focus:border-glow" : "border-charcoal/20 bg-white focus:border-brass-deep"}`}
          />
          <button
            type="submit"
            disabled={state === "sending"}
            className={`h-12 rounded-full px-6 font-medium transition disabled:opacity-60 ${dark ? "bg-glow text-ink hover:bg-[#ffd48f]" : "bg-ink text-ivory hover:bg-charcoal"}`}
          >
            {state === "sending" ? "Saving…" : "Remind me"}
          </button>
        </form>
      )}
      {state === "fallback" && <p role="status" className="mt-3 text-sm opacity-75">Your email app should open. Just hit send.</p>}
      {state === "error" && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
    </div>
  );
}
