import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Steven Patiño — Systems engineer and full stack developer";

// Añil design system: cal background, ink type, one indigo accent.
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3f4f0",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          color: "#141821",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#4a5263" }}>
          Systems engineer and full stack developer
        </div>

        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.92 }}>
          <div style={{ display: "flex", fontSize: 168, fontWeight: 800, letterSpacing: "-0.04em" }}>Steven</div>
          <div
            style={{
              display: "flex",
              fontSize: 168,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              paddingLeft: 120,
            }}
          >
            Patiño
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#4a5263" }}>
            <div style={{ width: 14, height: 14, borderRadius: 999, background: "#1b8049" }} />
            Cartagena, Colombia
          </div>
          <div style={{ display: "flex", color: "#2e3fd1", fontWeight: 700 }}>stevenpatino.dev</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
