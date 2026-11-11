import type { ReactNode } from "react";
import { Container, Eyebrow } from "./ui";

export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="border-b border-charcoal/10 bg-ivory">
      <Container className="py-16 sm:py-24">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.02] sm:text-6xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{children}</div>}
      </Container>
    </div>
  );
}
