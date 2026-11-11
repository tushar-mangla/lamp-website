"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-ivory-soft/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-display text-2xl font-semibold tracking-[0.18em]" aria-label={`${site.name} home`}>
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={pathname === n.href ? "page" : undefined}
              className="text-sm text-muted transition hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:underline-offset-8"
            >
              {n.label}
            </Link>
          ))}
          <Link href="/lamp" className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-ivory transition hover:bg-charcoal">
            Shop the lamp
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 top-0 h-px w-5 bg-ink transition ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`absolute bottom-0 left-0 h-px w-5 bg-ink transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-40 bg-ivory-soft px-6 pb-10 pt-6 md:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-charcoal/10 py-4 font-display text-3xl">
              {n.label}
            </Link>
          ))}
          <Link href="/faq" onClick={() => setOpen(false)} className="border-b border-charcoal/10 py-4 font-display text-3xl">FAQ</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="border-b border-charcoal/10 py-4 font-display text-3xl">Contact</Link>
          <Link href="/lamp" onClick={() => setOpen(false)} className="mt-8 rounded-full bg-ink px-6 py-4 text-center font-medium text-ivory">
            Shop the lamp
          </Link>
        </nav>
      </div>
    </header>
  );
}
