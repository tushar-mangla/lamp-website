"use client";

import { useEffect, useRef } from "react";
import { media } from "@/lib/site";

/** Autoplaying, muted, looping demo. Square file on phones, wide on larger screens.
 *  Pauses for users who prefer reduced motion and when scrolled out of view. */
export function VideoDemo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      v.removeAttribute("autoplay");
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <figure className={className}>
      <video
        ref={ref}
        className="aspect-square w-full rounded-[2rem] bg-night object-cover md:aspect-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={media.demo.widePoster}
        aria-label="Animated demo: tap to light, shake to reshape the filament, touch modes, size"
      >
        <source src={media.demo.square} type="video/mp4" media="(max-width: 767px)" />
        <source src={media.demo.wide} type="video/mp4" />
      </video>
      {media.demo.isIllustration && (
        <figcaption className="mt-3 text-center text-xs text-muted">Animated preview. Real product footage coming soon.</figcaption>
      )}
    </figure>
  );
}
