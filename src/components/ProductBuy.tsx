"use client";

import { useState } from "react";
import { BuyButtons } from "./BuyButtons";
import { product } from "@/lib/site";

export function ProductBuy() {
  const [colour, setColour] = useState<string>(product.colours[0].name);
  return (
    <>
      <fieldset className="mt-8">
        <legend className="text-sm font-medium">
          Colour: <span className="font-normal text-muted">{colour}</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {product.colours.map((c) => (
            <label
              key={c.name}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-charcoal/15 py-1.5 pl-1.5 pr-4 text-sm transition has-[:checked]:border-ink has-[:checked]:ring-1 has-[:checked]:ring-ink has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brass-deep"
            >
              <input type="radio" name="colour" value={c.name} checked={colour === c.name} onChange={() => setColour(c.name)} className="sr-only" />
              <span className="h-6 w-6 rounded-full border border-charcoal/15" style={{ background: c.hex }} aria-hidden />
              {c.name}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-8"><BuyButtons colour={colour} /></div>
    </>
  );
}
