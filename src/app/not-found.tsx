import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-7xl">404</p>
      <p className="mt-4 text-lg text-muted">This page has gone dark.</p>
      <Link href="/" className="mt-8 rounded-full bg-ink px-6 py-3 text-ivory">Back home</Link>
    </Container>
  );
}
