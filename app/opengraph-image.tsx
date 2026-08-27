import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b0e14",
          backgroundImage:
            "linear-gradient(to right, #1a2130 1px, transparent 1px), linear-gradient(to bottom, #1a2130 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            color: "#f5a623",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          Systems Engineer · Full Stack
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "#e7eaf0",
            marginBottom: 24,
            letterSpacing: -1,
          }}
        >
          Steven Patiño Urquijo
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#8b93a6",
            maxWidth: 900,
          }}
        >
          I build & operate production sites for real clients — construction,
          healthcare, church, community orgs.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 48,
            fontSize: 22,
            color: "#5fbf7a",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#5fbf7a",
              display: "flex",
            }}
          />
          stevenpatino.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
