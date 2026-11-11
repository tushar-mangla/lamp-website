"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

/**
 * Interactive illustration of the lamp (stand-in until real product photos/video exist).
 * "Shake" morphs the filament into a new shape; "Touch" cycles the light modes
 * soft → bright → breathing → off, mirroring the real product.
 */

type Shape = number[]; // M x y C x y x y x y C x y x y x y  (14 numbers)

const SHAPES: Shape[] = [
  [100, 46, 150, 86, 142, 132, 98, 160, 56, 188, 60, 248, 100, 282],
  [100, 46, 62, 92, 150, 118, 118, 166, 86, 214, 142, 244, 100, 282],
  [100, 46, 142, 72, 60, 112, 100, 160, 140, 208, 62, 240, 100, 282],
  [100, 46, 44, 84, 46, 150, 100, 160, 156, 170, 156, 250, 100, 282],
  [100, 46, 128, 100, 74, 104, 104, 152, 134, 200, 70, 224, 100, 282],
  [100, 46, 100, 86, 100, 124, 100, 162, 100, 200, 100, 244, 100, 282],
];

const MODES = [
  { key: "soft", label: "Soft", level: 0.45 },
  { key: "bright", label: "Bright", level: 1 },
  { key: "breathing", label: "Breathing", level: 1 },
  { key: "off", label: "Off", level: 0 },
] as const;

function toPath(s: Shape) {
  const [a, b, c, d, e, f, g, h, i, j, k, l, m, n] = s.map((v) => v.toFixed(1));
  return `M${a} ${b} C${c} ${d} ${e} ${f} ${g} ${h} C${i} ${j} ${k} ${l} ${m} ${n}`;
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function LampVisual({
  interactive = true,
  size = "lg",
  initialShape = 0,
  className = "",
  auto = false,
}: {
  interactive?: boolean;
  /** Reshape by itself while on screen (first after ~1s, then every ~6s). */
  auto?: boolean;
  size?: "sm" | "md" | "lg";
  initialShape?: number;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const [shapeIdx, setShapeIdx] = useState(initialShape % SHAPES.length);
  const [path, setPath] = useState(() => toPath(SHAPES[initialShape % SHAPES.length]));
  const [mode, setMode] = useState(1);
  const [shaking, setShaking] = useState(false);
  const current = useRef<Shape>(SHAPES[initialShape % SHAPES.length]);
  const raf = useRef<number | null>(null);

  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);

  const shake = useCallback(() => {
    const next = (shapeIdx + 1 + Math.floor(Math.random() * (SHAPES.length - 1))) % SHAPES.length;
    const from = current.current;
    const to = SHAPES[next];
    setShapeIdx(next);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (raf.current) cancelAnimationFrame(raf.current);
    if (reduce) {
      current.current = to;
      setPath(toPath(to));
      return;
    }
    setShaking(true);
    window.setTimeout(() => setShaking(false), 450);
    const start = performance.now();
    const dur = 900;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const k = ease(t);
      // slight overshoot wobble for a "settling" feel
      const wobble = Math.sin(t * Math.PI * 3) * (1 - t) * 6;
      const s = from.map((v, i) => v + (to[i] - v) * k + (i % 2 === 0 && i > 1 && i < 12 ? wobble : 0));
      current.current = s;
      setPath(toPath(s));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else current.current = to;
    };
    raf.current = requestAnimationFrame(tick);
  }, [shapeIdx]);

  // Auto-demo: most visitors never press a button, so show the trick once it's visible.
  const shakeRef = useRef(shake);
  useEffect(() => { shakeRef.current = shake; }, [shake]);
  const wrapRef = useRef<HTMLElement>(null);
  const touched = useRef(false);
  useEffect(() => {
    if (!auto || !wrapRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let first: number | undefined;
    let loop: number | undefined;
    const io = new IntersectionObserver(([e]) => {
      window.clearTimeout(first);
      window.clearInterval(loop);
      if (!e.isIntersecting) return;
      first = window.setTimeout(() => !touched.current && shakeRef.current(), 1100);
      loop = window.setInterval(() => !touched.current && shakeRef.current(), 6000);
    }, { threshold: 0.4 });
    io.observe(wrapRef.current);
    return () => { io.disconnect(); window.clearTimeout(first); window.clearInterval(loop); };
  }, [auto]);

  const m = MODES[mode];
  const level = m.level;
  const breathing = m.key === "breathing";
  const dims = size === "lg" ? "w-[220px] sm:w-[260px]" : size === "md" ? "w-[170px]" : "w-[120px]";

  return (
    <figure ref={wrapRef} className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        {/* ambient glow */}
        <div
          aria-hidden
          className={`pointer-events-none absolute left-1/2 top-[38%] h-[140%] w-[180%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-700 ${breathing ? "animate-breathe" : ""}`}
          style={{
            opacity: level * 0.9,
            background:
              "radial-gradient(closest-side, rgba(255,190,105,0.42), rgba(255,170,80,0.14) 55%, transparent 75%)",
          }}
        />
        <svg
          viewBox="0 0 200 360"
          role="img"
          aria-label={`MOTIFLO lamp illustration, light ${m.label.toLowerCase()}`}
          className={`relative ${dims} transition-transform duration-300 ${shaking ? "rotate-[-3deg]" : ""}`}
        >
          <defs>
            <linearGradient id={`shell-${uid}`} x1="0" x2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
              <stop offset="0.35" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="0.8" stopColor="#ffffff" stopOpacity="0.02" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0.16" />
            </linearGradient>
            <linearGradient id={`base-${uid}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#8f8d88" />
              <stop offset="1" stopColor="#5d5b57" />
            </linearGradient>
            <filter id={`blur-${uid}`} x="-50%" y="-20%" width="200%" height="140%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>

          {/* filament glow layers */}
          <g
            className={breathing ? "animate-breathe" : ""}
            style={{ opacity: level === 0 ? 0.12 : 0.35 + level * 0.65, transition: "opacity .6s" }}
          >
            <path d={path} fill="none" stroke="#ffb35c" strokeWidth="16" strokeLinecap="round" filter={`url(#blur-${uid})`} opacity={level === 0 ? 0 : 0.8} />
            <path d={path} fill="none" stroke={level === 0 ? "#8b8478" : "#ffc774"} strokeWidth="5" strokeLinecap="round" />
            <path d={path} fill="none" stroke={level === 0 ? "#a39c90" : "#fff3d6"} strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* magnets */}
          <circle cx="100" cy="44" r="5" fill="#cfcac0" />
          <circle cx="100" cy="284" r="5" fill="#cfcac0" />

          {/* clear shell */}
          <rect x="48" y="18" width="104" height="276" rx="50" fill={`url(#shell-${uid})`} stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.5" />
          <path d="M66 60 C 62 120, 62 220, 66 270" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* base */}
          <rect x="48" y="286" width="104" height="54" rx="14" fill={`url(#base-${uid})`} />
          <rect x="48" y="286" width="104" height="8" rx="4" fill="#000" opacity="0.18" />
          <ellipse cx="100" cy="346" rx="62" ry="6" fill="#000" opacity="0.25" />
        </svg>
      </div>

      {interactive && (
        <figcaption className="mt-6 flex flex-col items-center gap-3">
          <div className="flex gap-2" role="group" aria-label="Try the lamp">
            <button
              type="button"
              onClick={() => { touched.current = true; shake(); }}
              className="rounded-full border border-current/25 px-5 py-2.5 text-sm font-medium tracking-wide transition hover:bg-white/10 active:scale-95"
            >
              Shake it
            </button>
            <button
              type="button"
              onClick={() => { touched.current = true; setMode((x) => (x + 1) % MODES.length); }}
              aria-live="polite"
              className="rounded-full border border-current/25 px-5 py-2.5 text-sm font-medium tracking-wide transition hover:bg-white/10 active:scale-95"
            >
              Touch: <span className="opacity-80">{m.label}</span>
            </button>
          </div>
          <p className="text-xs opacity-60">Illustration. Tap to try the real lamp&apos;s modes.</p>
        </figcaption>
      )}
    </figure>
  );
}
