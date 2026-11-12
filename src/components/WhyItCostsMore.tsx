import { Eyebrow, H2 } from "./ui";
import { formatPrice, product } from "@/lib/site";

const rows = [
  ["Battery tested before it ships", true, false],
  ["1-year replacement warranty", true, false],
  ["Real size shown up front (≈ 5.7 in)", true, false],
  ["Keepsake gift box + gift note card", true, false],
  ["USB-C cable + cleaning cloth", true, "sometimes"],
  ["A real person who replies", true, false],
] as const;

/** Honest answer to "I've seen this lamp elsewhere" without naming or disparaging anyone. */
export function WhyItCostsMore() {
  return (
    <div>
      <Eyebrow>Seen a lamp like this?</Eyebrow>
      <H2 className="mt-4 text-3xl sm:text-4xl">Here&apos;s what {formatPrice(product.price)} gets you here.</H2>
      <p className="mt-4 max-w-xl leading-relaxed text-muted">
        Lamps with this look are sold online. Most arrive in a plain box, with no tested battery and no one to contact if it stops working, which is the most common complaint about them. Same price range, a very different gift.
      </p>
      <div className="mt-8 overflow-hidden rounded-2xl border border-charcoal/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-ivory">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">What you get</th>
              <th scope="col" className="px-4 py-3 text-center font-medium">MOTIFLO</th>
              <th scope="col" className="px-4 py-3 text-center font-medium text-muted">Typical listing</th>
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
