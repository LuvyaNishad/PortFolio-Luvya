import { ImageResponse } from "next/og";
import { siteConfig, SITE_URL } from "@/config/site";

/* Route segment config for the generated OG/social card. */
export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const domain = SITE_URL.replace(/^https?:\/\//, "");

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0a0a0c",
          backgroundImage:
            "radial-gradient(1000px 520px at 18% 12%, rgba(197,168,128,0.14), transparent 60%), radial-gradient(900px 600px at 88% 96%, rgba(197,38,26,0.16), transparent 60%)",
          color: "#e8e8ea",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 56,
                height: 56,
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 10,
                fontSize: 26,
                letterSpacing: 2,
                color: "#ffffff",
              }}
            >
              {siteConfig.initials}
            </div>
            <div
              style={{
                fontSize: 20,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              Portfolio
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 8,
                backgroundColor: "#c5261a",
              }}
            />
            Available for work
          </div>
        </div>

        {/* Name + role */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 150,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: -2,
              color: "#ffffff",
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 24,
            }}
          >
            <div style={{ width: 64, height: 3, backgroundColor: "#c5261a" }} />
            <div
              style={{
                fontSize: 44,
                letterSpacing: 2,
                color: "#c5a880",
              }}
            >
              {siteConfig.role}
            </div>
          </div>
        </div>

        {/* Tagline + domain */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              maxWidth: 720,
              fontSize: 26,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.62)",
            }}
          >
            {siteConfig.tagline}
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 2,
              color: "rgba(255,255,255,0.4)",
            }}
          >
            {domain}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
