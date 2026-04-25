import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DANS ARTS · Reyhan Şafak — Hareketin En Asil Hali";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
          color: "#F2EDE4",
          fontFamily: "Georgia, 'Playfair Display', serif",
        }}
      >
        <div
          style={{
            fontSize: 14,
            letterSpacing: 12,
            textTransform: "uppercase",
            color: "#D4AF37",
            marginBottom: 40,
          }}
        >
          Reyhan Şafak · İzmir
        </div>

        <div
          style={{
            fontSize: 96,
            lineHeight: 1.05,
            textAlign: "center",
            fontWeight: 400,
            letterSpacing: -1,
          }}
        >
          Hareketin
        </div>
        <div
          style={{
            fontSize: 96,
            lineHeight: 1.05,
            textAlign: "center",
            fontWeight: 400,
            letterSpacing: -1,
            color: "#D4AF37",
            fontStyle: "italic",
          }}
        >
          En Asil Hali
        </div>

        <div
          style={{
            width: 220,
            height: 1,
            background: "#D4AF37",
            opacity: 0.55,
            marginTop: 56,
          }}
        />

        <div
          style={{
            fontSize: 18,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "#D4AF37",
            marginTop: 40,
          }}
        >
          DANS ARTS
        </div>
      </div>
    ),
    { ...size }
  );
}
