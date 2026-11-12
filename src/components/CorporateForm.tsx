"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const fields = [
  { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
  { name: "company", label: "Company", type: "text", required: true, autoComplete: "organization" },
  { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone (optional)", type: "tel", required: false, autoComplete: "tel" },
  { name: "quantity", label: "How many lamps?", type: "number", required: true, autoComplete: "off" },
  { name: "date", label: "Needed by", type: "date", required: false, autoComplete: "off" },
] as const;

export function CorporateForm() {
  const [sent, setSent] = useState<"" | "saved" | "fallback">("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const details = Object.fromEntries(
      [...fields.map((f) => f.name), "message"].map((k) => [k, String(data.get(k) ?? "")]),
    );
    // 1) Try to save the lead server-side so it can't be lost.
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "corporate", contact: details.email, name: details.name, details }),
      });
      if (res.ok) { setSent("saved"); return; }
    } catch {}
    // 2) Fallback: open email with everything prefilled.
    const lines = [
      "Corporate gifting inquiry: MOTIFLO",
      ...fields.map((f) => `${f.label}: ${data.get(f.name) || "-"}`),
      `Message: ${data.get("message") || "-"}`,
    ];
    const text = lines.join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Corporate gifting inquiry")}&body=${encodeURIComponent(text)}`;
    setSent("fallback");
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-charcoal/12 bg-ivory-soft p-6 sm:p-8" aria-describedby="corp-note">
      <p className="font-display text-3xl">Get a quote</p>
      <p className="mt-1 text-sm text-muted">From 10 lamps. Smaller orders? Use the regular shop.</p>
      <p id="corp-note" className="mt-2 text-sm text-muted">
        We&apos;ll reply within one business day.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.name} className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium">{f.label}</span>
            <input
              name={f.name}
              type={f.type}
              required={f.required}
              autoComplete={f.autoComplete}
              min={f.name === "quantity" ? 10 : undefined}
              inputMode={f.name === "quantity" ? "numeric" : undefined}
              className="h-12 rounded-xl border border-charcoal/20 bg-white px-4 text-base outline-none transition focus:border-brass-deep"
            />
          </label>
        ))}
        <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
          <span className="font-medium">Anything else? (logo card, ship-to addresses, budget)</span>
          <textarea name="message" rows={4} className="rounded-xl border border-charcoal/20 bg-white px-4 py-3 text-base outline-none transition focus:border-brass-deep" />
        </label>
      </div>
      <button type="submit" className="mt-6 w-full rounded-full bg-ink px-6 py-4 font-medium text-ivory transition hover:bg-charcoal">
        Send inquiry
      </button>
      {sent === "saved" && <p role="status" className="mt-4 text-sm text-brass-deep">Thanks! We&apos;ve got your inquiry and will reply within one business day.</p>}
      {sent === "fallback" && <p role="status" className="mt-4 text-sm text-brass-deep">Your email app should open with your details filled in. Just hit send. If nothing opened, email {site.email}.</p>}
    </form>
  );
}
