"use client";

import { useEffect, useRef, useState } from "react";

const SRC = "/video/motiflo-christmas-us.mp4";
const POSTER = "/video/motiflo-christmas-us.jpg";
const VTT = "/video/motiflo-christmas-us.vtt";

/**
 * Vertical Christmas spot with voiceover + music.
 * Browsers only allow muted autoplay, so it starts muted with a clear "Tap for sound"
 * button; unmuting restarts from the top so the viewer hears the whole spot.
 */
export function ChristmasVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !reduce) v.play().catch(() => {});
        else if (!e.isIntersecting) v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    const on = () => setPlaying(true);
    const off = () => setPlaying(false);
    v.addEventListener("play", on);
    v.addEventListener("pause", off);
    return () => {
      io.disconnect();
      v.removeEventListener("play", on);
      v.removeEventListener("pause", off);
    };
  }, []);

  function toggleSound() {
    const v = ref.current;
    if (!v) return;
    if (v.muted) {
      v.muted = false;
      v.currentTime = 0;
      v.play().catch(() => {});
      setMuted(false);
    } else {
      v.muted = true;
      setMuted(true);
    }
  }

  function togglePlay() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }

  return (
    <figure className={className}>
      <div className="relative mx-auto aspect-[9/16] w-full max-w-[400px] overflow-hidden rounded-[2rem] bg-night shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] md:max-h-[78vh] md:w-auto">
        <video
          ref={ref}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
          aria-label="MOTIFLO Christmas video: a gift box opens, the lamp lights up and changes shape when shaken. Narrated, with music."
        >
          <source src={SRC} type="video/mp4" />
          <track kind="captions" srcLang="en" label="English" src={VTT} />
        </video>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/60 to-transparent p-4">
          <button
            type="button"
            onClick={toggleSound}
            className="rounded-full bg-glow px-5 py-3 text-sm font-semibold text-ink shadow-lg transition hover:bg-[#ffd48f] active:scale-95"
            aria-pressed={!muted}
          >
            {muted ? "🔊 Tap for sound" : "🔇 Mute"}
          </button>
          <button
            type="button"
            onClick={togglePlay}
            className="rounded-full border border-white/30 bg-black/30 px-4 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-black/50"
            aria-label={playing ? "Pause video" : "Play video"}
          >
            {playing ? "❚❚" : "▶"}
          </button>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">Animated preview with narration. Real product footage coming soon.</figcaption>
    </figure>
  );
}
