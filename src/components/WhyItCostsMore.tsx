import { Eyebrow, H2 } from "./ui";

const rows = [
  ["Battery tested before it ships", true, false],
  ["1-year India replacement warranty", true, false],
  ["Real size shown up front (≈ 14 cm)", true, false],
  ["Keepsake gift box + gift note card", true, false],
  ["1 m USB-C cable + cleaning cloth", true, "sometimes"],
  ["A person in India who replies", true, false],
] as const;

/** Honest answer to "why not the ₹800 one?" without naming or disparaging anyone. */
export function WhyItCostsMore() {
  return (
    <div>
      <Eyebrow>Seen it cheaper?</Eyebrow>
      <H2 className="mt-4 text-3xl sm:text-4xl">You probably have. Here&apos;s the difference.</H2>
      <p className="mt-4 max-w-xl leading-relaxed text-muted">
        Lamps with this look are sold online for less. Most come in a plain box, with no tested battery and no one to call if it stops working. That&apos;s the most common complaint about them. Here&apos;s what you get with MOTIFLO.
      </p>
      <div className="mt-8 overflow-hidden rounded-2xl border border-charcoal/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-ivory">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">What you get</th>
              <th scope="col" className="px-4 py-3 text-center font-medium">MOTIFLO</th>
              <th scope="col" className="px-4 py-3 text-center font-medium text-muted">Typical budget listing</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/10 bg-ivory-soft">
            {rows.map(([label, us, them]) => (
              <tr key={label}>
                <th scope="row" className="px-4 py-3 font-normal">{label}</th>
                <td className="px-4 py-3 text-center text-brass-deep">{us ? "✓" : "–"}</td>
                <td className="px-4 py-3 text-center text-muted">{them === "sometimes" ? "sometimes" : "rarely"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
