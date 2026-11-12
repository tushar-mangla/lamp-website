import Link from "next/link";
import { season } from "@/lib/site";

export function AnnouncementBar() {
  if (!season.enabled) return null;
  return (
    <div className="season-only bg-ink text-ivory">
      <p className="mx-auto max-w-6xl px-4 py-2 text-center text-xs tracking-wide sm:text-sm">
        <span className="text-glow">✦</span> {season.name}: order by{" "}
        <strong className="font-semibold">{season.orderBy}</strong> for delivery by Christmas · free US shipping ·{" "}
        <Link href="/gifts/christmas" className="underline underline-offset-4 hover:text-glow">
          Holiday Shop
        </Link>
      </p>
    </div>
  );
}
