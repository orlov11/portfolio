import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "orlov.tech — Frontend / Mobile Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #312E81 100%)",
          color: "#FFFFFF",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            SO
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, opacity: 0.85 }}>
            orlov.tech
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Svyatoslav Orlov
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 400,
              color: "#94A3B8",
            }}
          >
            Frontend / Mobile Developer
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: "#CBD5E1",
              marginTop: 8,
              maxWidth: 900,
            }}
          >
            Telegram WebApps · Native Android via Capacitor · React, TypeScript,
            Next.js
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 22,
            color: "#94A3B8",
          }}
        >
          <span>svyatoslav.orlov11@gmail.com</span>
          <span>·</span>
          <span>github.com/orlov11</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
