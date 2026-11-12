/**
 * Lead capture (reminders + corporate inquiries).
 * Forwards JSON to LEAD_WEBHOOK_URL (Google Apps Script, Zapier, Make, Slack, etc.).
 * If no webhook is configured it returns 503 and the UI falls back to a prefilled email,
 * so a lead is never silently lost.
 */
type Lead = { kind: "reminder" | "corporate"; contact: string; name?: string; details?: Record<string, string> };

export async function POST(request: Request) {
  let body: Partial<Lead>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const kind = body.kind === "corporate" ? "corporate" : body.kind === "reminder" ? "reminder" : null;
  const contact = String(body.contact ?? "").trim().slice(0, 200);
  const looksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) || /^\+?[0-9 ]{10,15}$/.test(contact);
  if (!kind || !looksValid) {
    return Response.json({ ok: false, error: "Please enter a valid email or phone number." }, { status: 422 });
  }

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (!hook) return Response.json({ ok: false, error: "not_configured" }, { status: 503 });

  const details = Object.fromEntries(
    Object.entries(body.details ?? {}).slice(0, 20).map(([k, v]) => [k.slice(0, 40), String(v).slice(0, 1000)]),
  );
  const res = await fetch(hook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ kind, contact, name: String(body.name ?? "").slice(0, 120), details, receivedAt: new Date().toISOString() }),
  });
  if (!res.ok) return Response.json({ ok: false, error: "upstream_failed" }, { status: 502 });
  return Response.json({ ok: true });
}
