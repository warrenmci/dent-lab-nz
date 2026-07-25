import { ImageResponse } from "next/og";
import { BUSINESS } from "@/lib/site";

export const alt = "DentLab NZ — Paintless Dent Removal Specialists";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#f0c500";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111111",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent rule */}
        <div style={{ display: "flex", width: 120, height: 8, background: ACCENT }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: ACCENT,
              fontWeight: 600,
            }}
          >
            Paintless Dent Removal — New Zealand
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 78,
              lineHeight: 1.05,
              fontWeight: 700,
              color: "#ffffff",
              maxWidth: 900,
            }}
          >
            Precision dent repair.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              lineHeight: 1.05,
              fontWeight: 700,
              color: ACCENT,
            }}
          >
            No paint. No filler.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            {BUSINESS.name}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "rgba(255,255,255,0.5)" }}>
            Same-day repairs · Insurance supported · Mobile service
          </div>
        </div>
      </div>
    ),
    size
  );
}
