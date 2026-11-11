import { ImageResponse } from "next/og";

export const alt = "MOTIFLO: Light, with a little movement.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "80px", background: "radial-gradient(circle at 75% 50%, #4a3418 0%, #141311 55%)", color: "#f2ebdd", fontFamily: "serif" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 36, letterSpacing: 12 }}>MOTIFLO</div>
          <div style={{ fontSize: 84, marginTop: 30, lineHeight: 1.05, maxWidth: 640 }}>Light, with a little movement.</div>
          <div style={{ fontSize: 28, marginTop: 30, color: "#ffc774" }}>Shake-to-reshape mini mood lamp</div>
        </div>
        <div style={{ width: 170, height: 420, borderRadius: 85, border: "3px solid rgba(255,255,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 120px 30px rgba(255,180,90,0.35)" }}>
          <div style={{ width: 10, height: 330, borderRadius: 5, background: "#ffc774", boxShadow: "0 0 30px 10px rgba(255,190,100,0.8)" }} />
        </div>
      </div>
    ),
    size,
  );
}
