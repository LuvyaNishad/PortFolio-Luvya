import React from "react";

export interface TechItem {
  name: string;
  category?: string;
  color: string;
  bgTint: string;
  borderTint: string;
}

export function getTechDetails(name: string): {
  color: string;
  bgTint: string;
  borderTint: string;
  renderIcon: (props?: { className?: string; size?: number }) => React.JSX.Element;
} {
  const normalized = name.trim().toLowerCase();

  if (normalized.includes("react")) {
    return {
      color: "#61DAFB",
      bgTint: "rgba(97, 218, 251, 0.08)",
      borderTint: "rgba(97, 218, 251, 0.25)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="-11.5 -10.23174 23 20.46348"
          fill="none"
          className={className}
        >
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      ),
    };
  }

  if (normalized.includes("vite")) {
    return {
      color: "#BD34FE",
      bgTint: "rgba(189, 52, 254, 0.08)",
      borderTint: "rgba(189, 52, 254, 0.25)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={className}
        >
          <path
            d="M30.1 5.3L16.9 28.9c-.4.7-1.4.7-1.8 0L1.9 5.3c-.4-.8.1-1.8 1-1.9l13.1 1.6 13.1-1.6c.9.1 1.4 1.1 1 1.9z"
            fill="url(#vite-grad)"
          />
          <path
            d="M20.2 3.8L11.5 16h4.8l-3.3 9.4 10.2-12.7h-5.2l2.2-8.9z"
            fill="#FFD025"
          />
          <defs>
            <linearGradient
              id="vite-grad"
              x1="1.9"
              y1="3.4"
              x2="30.1"
              y2="28.9"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#41D1FF" />
              <stop offset="1" stopColor="#BD34FE" />
            </linearGradient>
          </defs>
        </svg>
      ),
    };
  }

  if (normalized.includes("typescript") || normalized === "ts") {
    return {
      color: "#3178C6",
      bgTint: "rgba(49, 120, 198, 0.1)",
      borderTint: "rgba(49, 120, 198, 0.3)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          className={className}
        >
          <rect width="32" height="32" rx="4" fill="#3178C6" />
          <path
            d="M13.8 13.8H9.7v-2.3h10.5v2.3h-4.1v10.7h-2.3V13.8zm9.3 6.9c.7.4 1.5.7 2.4.7 1 0 1.6-.5 1.6-1.2 0-.8-.7-1.2-2.1-1.8-2-.8-3.2-1.9-3.2-3.6 0-2 1.6-3.4 4.1-3.4 1.3 0 2.3.3 3 .7l-.7 2c-.6-.4-1.4-.6-2.3-.6-.9 0-1.5.5-1.5 1.1 0 .7.6 1.1 2 1.7 2.1.9 3.3 1.9 3.3 3.7 0 2.1-1.7 3.5-4.4 3.5-1.5 0-2.8-.4-3.6-.9l.8-2.1z"
            fill="#FFFFFF"
          />
        </svg>
      ),
    };
  }

  if (normalized.includes("javascript") || normalized === "js") {
    return {
      color: "#F7DF1E",
      bgTint: "rgba(247, 223, 30, 0.1)",
      borderTint: "rgba(247, 223, 30, 0.3)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          className={className}
        >
          <rect width="32" height="32" rx="4" fill="#F7DF1E" />
          <path
            d="M18.2 19.3c.5.8 1.1 1.4 2.2 1.4 1 0 1.6-.4 1.6-1.6v-7.8h3v7.9c0 2.7-1.6 3.9-3.9 3.9-2.1 0-3.3-1.1-3.9-2.5l2-.9zm-7.6-.2c.7 1.1 1.6 1.7 3.2 1.7 1.3 0 2.2-.6 2.2-1.6 0-1.1-.9-1.5-2.4-2.1-2.2-.9-3.6-1.9-3.6-3.9 0-2.2 1.7-3.9 4.3-3.9 1.8 0 3.1.6 4 2.2l-2.2 1.4c-.5-.8-1-1.2-1.8-1.2-.8 0-1.4.5-1.4 1.2 0 .8.6 1.1 1.9 1.7 2.4 1 3.9 2 3.9 4.2 0 2.5-2 4-4.7 4-2.6 0-4.2-1.3-4.9-3.1l2.4-1.3z"
            fill="#000000"
          />
        </svg>
      ),
    };
  }

  if (normalized.includes("tailwind")) {
    return {
      color: "#38BDF8",
      bgTint: "rgba(56, 189, 248, 0.08)",
      borderTint: "rgba(56, 189, 248, 0.25)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={className}
        >
          <path
            d="M8.5 13.5c1.4-2.8 3.5-4.2 6.3-4.2 4.2 0 5.6 3.1 7.7 4.2 1.4.7 3 1.1 4.9 1.1 1.4 0 2.8-.4 4.2-1.4-1.4 2.8-3.5 4.2-6.3 4.2-4.2 0-5.6-3.1-7.7-4.2-1.4-.7-3-1.1-4.9-1.1-1.4 0-2.8.4-4.2 1.4zm-8 8.4c1.4-2.8 3.5-4.2 6.3-4.2 4.2 0 5.6 3.1 7.7 4.2 1.4.7 3 1.1 4.9 1.1 1.4 0 2.8-.4 4.2-1.4-1.4 2.8-3.5 4.2-6.3 4.2-4.2 0-5.6-3.1-7.7-4.2-1.4-.7-3-1.1-4.9-1.1-1.4 0-2.8.4-4.2 1.4z"
            fill="#38BDF8"
          />
        </svg>
      ),
    };
  }

  if (normalized.includes("framer") || normalized.includes("motion")) {
    return {
      color: "#0055FF",
      bgTint: "rgba(0, 85, 255, 0.08)",
      borderTint: "rgba(0, 85, 255, 0.25)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="#0055FF" />
        </svg>
      ),
    };
  }

  if (normalized.includes("next")) {
    return {
      color: "#FFFFFF",
      bgTint: "rgba(255, 255, 255, 0.08)",
      borderTint: "rgba(255, 255, 255, 0.22)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 180 180"
          fill="none"
          className={className}
        >
          <circle cx="90" cy="90" r="90" fill="#000000" />
          <path
            d="M149.5 163.5L70.9 62H52v76h14.2V81.3l69.8 89.2c4.7-2.1 9.2-4.4 13.5-7z"
            fill="url(#next-grad)"
          />
          <path d="M115 62h14.2v76H115z" fill="#FFFFFF" />
          <defs>
            <linearGradient
              id="next-grad"
              x1="108"
              y1="110"
              x2="149"
              y2="164"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      ),
    };
  }

  if (normalized.includes("prisma")) {
    return {
      color: "#2D3748",
      bgTint: "rgba(45, 55, 72, 0.15)",
      borderTint: "rgba(90, 103, 216, 0.3)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={className}
        >
          <path
            d="M17.4 3.2L5.8 24.3c-.4.7.1 1.6 1 1.6h20.4c.8 0 1.4-.9 1-1.6L20.6 3.2c-.4-.8-1.5-.8-1.9 0l-1.3 0z"
            fill="#5A67D8"
          />
          <path
            d="M19.7 3.2L8.2 24.3c-.4.7.1 1.6 1 1.6h12.5l7-12.7-9-10z"
            fill="#2B6CB0"
          />
        </svg>
      ),
    };
  }

  if (normalized.includes("postgres") || normalized.includes("psql")) {
    return {
      color: "#336791",
      bgTint: "rgba(51, 103, 145, 0.1)",
      borderTint: "rgba(51, 103, 145, 0.3)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={className}
        >
          <circle cx="16" cy="16" r="14" fill="#336791" />
          <path
            d="M16 8c-4.4 0-8 3.6-8 8 0 2.5 1.1 4.7 2.9 6.2.3.2.7.2 1-.1.2-.3.1-.7-.2-.9-1.5-1.3-2.4-3.1-2.4-5.2 0-3.7 3-6.7 6.7-6.7s6.7 3 6.7 6.7c0 2.1-.9 3.9-2.4 5.2-.3.2-.4.6-.2.9.2.3.6.4 1 .1 1.8-1.5 2.9-3.7 2.9-6.2 0-4.4-3.6-8-8-8z"
            fill="#FFFFFF"
          />
          <circle cx="13" cy="14" r="1.5" fill="#FFFFFF" />
          <circle cx="19" cy="14" r="1.5" fill="#FFFFFF" />
          <path
            d="M16 18c-1.1 0-2 .9-2 2v2c0 .6.4 1 1 1s1-.4 1-1v-2c0-.6.4-1 1-1s1 .4 1 1v2c0 .6.4 1 1 1s1-.4 1-1v-2c0-1.1-.9-2-2-2z"
            fill="#FFFFFF"
          />
        </svg>
      ),
    };
  }

  if (normalized.includes("flutter")) {
    return {
      color: "#54C5F8",
      bgTint: "rgba(84, 197, 248, 0.1)",
      borderTint: "rgba(84, 197, 248, 0.3)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={className}
        >
          <path
            d="M19.1 3L6.5 15.6l3.9 3.9L26.9 3H19.1zm0 13.2l-6.3 6.3 6.3 6.3h7.8l-6.3-6.3 6.3-6.3h-7.8z"
            fill="#54C5F8"
          />
          <path
            d="M12.8 22.5L16.7 26.4 20.6 22.5 16.7 18.6z"
            fill="#02569B"
          />
        </svg>
      ),
    };
  }

  if (normalized.includes("dart")) {
    return {
      color: "#0175C2",
      bgTint: "rgba(1, 117, 194, 0.1)",
      borderTint: "rgba(1, 117, 194, 0.3)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={className}
        >
          <path
            d="M7 7l11-4 7 7-14 14-4-4V7z"
            fill="#0175C2"
          />
          <path
            d="M11 24l14-14 4 11-11 4-7-1z"
            fill="#00B4AB"
          />
          <path
            d="M7 20l4 4 14-14-4-4-14 14z"
            fill="#02569B"
          />
        </svg>
      ),
    };
  }

  if (normalized.includes("riverpod")) {
    return {
      color: "#00B4D8",
      bgTint: "rgba(0, 180, 216, 0.1)",
      borderTint: "rgba(0, 180, 216, 0.3)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={className}
        >
          <circle cx="16" cy="16" r="13" stroke="#00B4D8" strokeWidth="2" />
          <path
            d="M11 16c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5"
            stroke="#54C5F8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="16" cy="16" r="2.5" fill="#00B4D8" />
        </svg>
      ),
    };
  }

  if (normalized.includes("supabase")) {
    return {
      color: "#3ECF8E",
      bgTint: "rgba(62, 207, 142, 0.1)",
      borderTint: "rgba(62, 207, 142, 0.3)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={className}
        >
          <path
            d="M17.4 3.5c-.7-.9-2.1-.5-2.3.6l-3.3 14c-.2.9.5 1.7 1.4 1.7h7.2c.8 0 1.3.8.9 1.5l-5.7 8.9c-.8 1.2-2.6.4-2.3-1l3.3-14c.2-.9-.5-1.7-1.4-1.7H8.2c-.8 0-1.3-.8-.9-1.5l5.7-8.9c.4-.7 1.3-.9 2-.5z"
            fill="url(#supa-grad)"
          />
          <defs>
            <linearGradient id="supa-grad" x1="8" y1="3" x2="24" y2="29">
              <stop stopColor="#249361" />
              <stop offset="1" stopColor="#3ECF8E" />
            </linearGradient>
          </defs>
        </svg>
      ),
    };
  }

  if (normalized.includes("hive")) {
    return {
      color: "#FFB300",
      bgTint: "rgba(255, 179, 0, 0.1)",
      borderTint: "rgba(255, 179, 0, 0.3)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={className}
        >
          <path
            d="M16 4l10 5.8v11.5L16 27 6 21.3V9.8L16 4z"
            fill="#FFB300"
          />
          <path
            d="M16 7l7.5 4.3v8.6L16 24.2 8.5 19.9v-8.6L16 7z"
            fill="#FFA000"
          />
          <path
            d="M16 11l4 2.3v4.6L16 20.2 12 17.9v-4.6L16 11z"
            fill="#FFE082"
          />
        </svg>
      ),
    };
  }

  if (normalized.includes("python")) {
    return {
      color: "#3776AB",
      bgTint: "rgba(55, 118, 171, 0.1)",
      borderTint: "rgba(55, 118, 171, 0.3)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={className}
        >
          <path
            d="M15.9 4c-4.4 0-4.1 1.9-4.1 1.9v2h4.2v.6H9.7S6 8.1 6 12.5s3.3 4.2 3.3 4.2h2v-2.8s-.1-3.3 3.3-3.3h5.7s3.2.1 3.2-3.1-3.5-3.5-7.6-3.5zm-2.4 2.2c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1z"
            fill="#3776AB"
          />
          <path
            d="M16.1 28c4.4 0 4.1-1.9 4.1-1.9v-2H16v-.6h6.3s3.7.4 3.7-4-3.3-4.2-3.3-4.2h-2v2.8s.1 3.3-3.3 3.3H11.7s-3.2-.1-3.2 3.1 3.5 3.5 7.6 3.5zm2.4-2.2c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z"
            fill="#FFD43B"
          />
        </svg>
      ),
    };
  }

  if (normalized.includes("flask")) {
    return {
      color: "#FFFFFF",
      bgTint: "rgba(255, 255, 255, 0.08)",
      borderTint: "rgba(255, 255, 255, 0.25)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M10 2v5.5L4.5 18A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.8-3L14 7.5V2" />
          <path d="M8.5 2h7" />
          <path d="M7 15h10" />
        </svg>
      ),
    };
  }

  if (normalized.includes("mysql")) {
    return {
      color: "#4479A1",
      bgTint: "rgba(68, 121, 161, 0.1)",
      borderTint: "rgba(242, 145, 17, 0.3)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={className}
        >
          <path
            d="M26.4 16.5c-.8-.4-1.8-.6-2.8-.5-.8-2.6-2.6-4.7-5.1-5.7-1.4-.5-2.9-.6-4.3-.2-.5-1.4-1.6-2.5-3-3-1.8-.7-3.9-.2-5.2 1.2-1.3 1.4-1.6 3.5-.8 5.2.2.4.5.8.8 1.1-1.3 1.1-2 2.8-1.9 4.5.1 1.7 1 3.2 2.5 4 2.1 1.2 4.7 1.1 6.8-.2.7-.4 1.3-.9 1.8-1.5 2.1.8 4.5.6 6.4-.6 1.4-.9 2.4-2.4 2.7-4.1.8-.1 1.6-.2 2.1-.2z"
            fill="#4479A1"
          />
          <circle cx="9" cy="11" r="1" fill="#F29111" />
          <path
            d="M17 21c2.2 0 4-1.8 4-4"
            stroke="#F29111"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    };
  }

  if (normalized.includes("jinja")) {
    return {
      color: "#B41717",
      bgTint: "rgba(180, 23, 23, 0.1)",
      borderTint: "rgba(180, 23, 23, 0.3)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#B41717"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M7 4H4v16h3M17 4h3v16h-3M9 9l3 3-3 3M15 9l-3 3 3 3" />
        </svg>
      ),
    };
  }

  if (normalized.includes("html")) {
    return {
      color: "#E34F26",
      bgTint: "rgba(227, 79, 38, 0.1)",
      borderTint: "rgba(227, 79, 38, 0.3)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={className}
        >
          <path d="M5.5 3.5l2.4 24.2 8.1 2.3 8.1-2.3 2.4-24.2H5.5z" fill="#E34F26" />
          <path d="M16 27.8l6.4-1.8 1.9-20.5H16v24.3z" fill="#EF652A" />
          <path
            d="M16 11.2h-5.2l.3 3.6H16v-3.6zm0 7.2h-2.6l-.2-2.1h-3.6l.4 5.3 6 .3V18.4zm0-7.2v3.6h5l-.5 5.5-4.5 1.3v3.7l7.7-2.2 1-11.9H16z"
            fill="#FFFFFF"
          />
        </svg>
      ),
    };
  }

  if (normalized.includes("css")) {
    return {
      color: "#1572B6",
      bgTint: "rgba(21, 114, 182, 0.1)",
      borderTint: "rgba(21, 114, 182, 0.3)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={className}
        >
          <path d="M5.5 3.5l2.4 24.2 8.1 2.3 8.1-2.3 2.4-24.2H5.5z" fill="#1572B6" />
          <path d="M16 27.8l6.4-1.8 1.9-20.5H16v24.3z" fill="#33A9DC" />
          <path
            d="M16 11.2h-5.2l.3 3.6H16v-3.6zm0 7.2h-2.6l-.2-2.1h-3.6l.4 5.3 6 .3V18.4zm0-7.2v3.6h5l-.5 5.5-4.5 1.3v3.7l7.7-2.2 1-11.9H16z"
            fill="#FFFFFF"
          />
        </svg>
      ),
    };
  }

  if (
    normalized.includes("glass") ||
    normalized.includes("ui/ux") ||
    normalized.includes("design")
  ) {
    return {
      color: "#A259FF",
      bgTint: "rgba(162, 89, 255, 0.1)",
      borderTint: "rgba(162, 89, 255, 0.3)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
            fill="url(#ui-grad)"
          />
          <defs>
            <linearGradient id="ui-grad" x1="2" y1="2" x2="22" y2="22">
              <stop stopColor="#F24E1E" />
              <stop offset="0.5" stopColor="#A259FF" />
              <stop offset="1" stopColor="#1ABCFE" />
            </linearGradient>
          </defs>
        </svg>
      ),
    };
  }

  if (normalized.includes("unity")) {
    return {
      color: "#FFFFFF",
      bgTint: "rgba(255, 255, 255, 0.08)",
      borderTint: "rgba(255, 255, 255, 0.25)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={className}
        >
          <path
            d="M16 2.5l11.7 6.8v13.4L16 29.5 4.3 22.7V9.3L16 2.5z"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M16 2.5v13.5l11.7 6.7M16 16L4.3 22.7"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="16" r="3" fill="#FFFFFF" />
        </svg>
      ),
    };
  }

  if (normalized.includes("c#") || normalized.includes("csharp")) {
    return {
      color: "#9B4F96",
      bgTint: "rgba(155, 79, 150, 0.1)",
      borderTint: "rgba(155, 79, 150, 0.3)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={className}
        >
          <path
            d="M16 3l11.3 6.5v13L16 29 4.7 22.5v-13L16 3z"
            fill="#9B4F96"
          />
          <path
            d="M14.5 11.5c-2.8 0-4.5 1.8-4.5 4.5s1.7 4.5 4.5 4.5c1.4 0 2.5-.5 3.2-1.3l-1.2-1.2c-.5.5-1.2.8-2 .8-1.7 0-2.6-1.1-2.6-2.8s.9-2.8 2.6-2.8c.8 0 1.5.3 2 .8l1.2-1.2c-.7-.8-1.8-1.3-3.2-1.3zM20 13.5h1.2l-.3 1.8h1.5l.3-1.8h1.2l-.3 1.8h.8v1.2h-1l-.2 1.5h1.2v1.2h-1.4l-.3 1.8h-1.2l.3-1.8h-1.5l-.3 1.8h-1.2l.3-1.8h-.8v-1.2h1l.2-1.5h-1.2v-1.2h1.4l.3-1.8zm2.1 3l-.2 1.5h1.5l.2-1.5h-1.5z"
            fill="#FFFFFF"
          />
        </svg>
      ),
    };
  }

  if (normalized.includes("git")) {
    return {
      color: "#F05032",
      bgTint: "rgba(240, 80, 50, 0.1)",
      borderTint: "rgba(240, 80, 50, 0.3)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={className}
        >
          <path
            d="M29.3 14.3L17.7 2.7c-.9-.9-2.5-.9-3.4 0L10.9 6.1l4.3 4.3c1 .3 1.8 1.1 2 2.1l4.1 2.4c1-.3 2.1-.1 2.9.7 1.2 1.2 1.2 3.1 0 4.3-1.2 1.2-3.1 1.2-4.3 0-.9-.9-1.1-2.1-.7-3.1l-3.8-2.2v5.7c.3.2.5.5.7.8 1.2 1.2 1.2 3.1 0 4.3-1.2 1.2-3.1 1.2-4.3 0-1.2-1.2-1.2-3.1 0-4.3.4-.4.8-.6 1.3-.7v-7.2c-.5-.1-.9-.3-1.3-.7-.9-.9-1.1-2.1-.7-3.1L7 9.4 2.7 13.7c-.9.9-.9 2.5 0 3.4l11.6 11.6c.9.9 2.5.9 3.4 0l11.6-11.6c.9-.9.9-2.5 0-3.4z"
            fill="#F05032"
          />
        </svg>
      ),
    };
  }

  if (normalized.includes("3d") || normalized.includes("hci")) {
    return {
      color: "#00F0FF",
      bgTint: "rgba(0, 240, 255, 0.1)",
      borderTint: "rgba(0, 240, 255, 0.3)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00F0FF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
    };
  }

  if (normalized.includes("ar") || normalized.includes("research")) {
    return {
      color: "#A259FF",
      bgTint: "rgba(162, 89, 255, 0.1)",
      borderTint: "rgba(162, 89, 255, 0.3)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#A259FF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M3 7V5a2 2 0 0 1 2-2h2" />
          <path d="M17 3h2a2 2 0 0 1 2 2v2" />
          <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
          <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    };
  }

  if (normalized.includes("database") || normalized.includes("sql")) {
    return {
      color: "#4A90E2",
      bgTint: "rgba(74, 144, 226, 0.1)",
      borderTint: "rgba(74, 144, 226, 0.3)",
      renderIcon: ({ size = 16, className = "" } = {}) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4A90E2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
    };
  }

  // Default fallback badge
  return {
    color: "#E2E8F0",
    bgTint: "rgba(255, 255, 255, 0.05)",
    borderTint: "rgba(255, 255, 255, 0.15)",
    renderIcon: ({ size = 16, className = "" } = {}) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#E2E8F0"
        strokeWidth="2"
        className={className}
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  };
}

export function TechBadge({
  name,
  size = "md",
}: {
  name: string;
  size?: "sm" | "md" | "lg";
}) {
  const details = getTechDetails(name);
  const iconSize = size === "sm" ? 13 : size === "lg" ? 18 : 15;

  return (
    <div
      className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-[3px] border transition-all duration-200"
      style={{
        backgroundColor: details.bgTint,
        borderColor: details.borderTint,
        boxShadow: `0 2px 10px -2px ${details.bgTint}`,
      }}
    >
      <div className="shrink-0 flex items-center justify-center">
        {details.renderIcon({ size: iconSize })}
      </div>
      <span
        className="font-mono text-[10px] sm:text-[11px] font-medium tracking-[0.08em] whitespace-nowrap"
        style={{ color: details.color }}
      >
        {name}
      </span>
    </div>
  );
}

export function TechStackGrid({
  tags,
  title = "// TECHNOLOGIES & TOOLS",
}: {
  tags: string[];
  title?: string;
}) {
  return (
    <div>
      <p className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-white/40 mb-2.5">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <TechBadge key={i} name={tag} />
        ))}
      </div>
    </div>
  );
}
