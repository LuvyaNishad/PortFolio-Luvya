"use client";

import { useEffect, useState } from "react";
import type { SVGProps } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";

const NAV_LINKS = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "TOOLS", href: "#tools" },
  { label: "LIBRARY", href: "#library" },
  { label: "SHOWCASE", href: "#built-from-scratch" },
  { label: "CONTACT", href: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "GitHub", href: "#", icon: Github },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "YouTube", href: "#", icon: Youtube },
];

const STATUS_ITEMS = ["UI/UX", "FRONTEND", "SYSTEMS", "AVAILABLE"];

function useLocalTime() {
  const [time, setTime] = useState<{ formatted: string; date: string } | null>(null);

  useEffect(() => {
    function update() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      setTime({
        formatted: `${hours}:${minutes}:${seconds}`,
        date: `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`,
      });
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

export function Footer() {
  const time = useLocalTime();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#070708]">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src="/images/footer_bg.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-75"
          style={{
            filter: "brightness(0.8) contrast(1.22) saturate(1.05)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(197,38,26,0.2),transparent_32%),linear-gradient(180deg,rgba(10,10,12,0.98)_0%,rgba(10,10,12,0.54)_24%,rgba(8,8,10,0.82)_66%,rgba(5,5,6,0.98)_100%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-5 py-20 sm:px-10 sm:py-24 lg:px-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative border border-white/10 bg-black/35 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.52)] backdrop-blur-md sm:p-7 lg:p-9"
        >
          <div className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-[#c92a2a]/70" />
          <div className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r border-t border-white/25" />
          <div className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b border-l border-white/25" />
          <div className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-[#c92a2a]/70" />

          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-14">
            <div>
              <div className="mb-7 flex flex-wrap items-center gap-2">
                {STATUS_ITEMS.map((item, index) => (
                  <span
                    key={item}
                    className="border border-white/10 bg-white/[0.025] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/45"
                  >
                    0{index + 1} / {item}
                  </span>
                ))}
              </div>

              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#c92a2a]">
                End Transmission
              </p>
              <h2 className="mt-4 max-w-4xl font-display text-[clamp(3rem,8.2vw,8.8rem)] uppercase leading-[0.82] tracking-normal text-white">
                Let&apos;s make
                <span className="block font-serif italic normal-case text-[#c5a880]">
                  it memorable.
                </span>
              </h2>
              <p className="mt-7 max-w-xl font-mono text-xs leading-7 text-white/48 sm:text-[13px]">
                Open for thoughtful product work, sharp interfaces, and digital systems
                with enough atmosphere to leave a mark.
              </p>
            </div>

            <div className="flex flex-col justify-between gap-6 border-t border-white/10 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <a
                href="mailto:luvyanishad@gmail.com"
                className="group flex min-h-24 items-center justify-between gap-5 border border-[#c92a2a]/25 bg-[#c92a2a]/[0.055] px-5 py-5 transition-colors duration-300 hover:border-[#c92a2a]/55 hover:bg-[#c92a2a]/[0.09]"
              >
                <span>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.24em] text-[#c92a2a]">
                    Start a brief
                  </span>
                  <span className="mt-2 block break-all font-serif text-xl italic text-white/86 sm:text-2xl">
                    luvyanishad@gmail.com
                  </span>
                </span>
                <Mail className="h-5 w-5 shrink-0 text-white/50 transition-colors duration-300 group-hover:text-white" />
              </a>

              <div className="grid grid-cols-2 border border-white/10">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 border-b border-r border-white/10 px-4 py-4 transition-colors duration-300 odd:border-r hover:bg-white/[0.045]"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-white/42 transition-colors duration-300 group-hover:text-white/80" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/58 transition-colors duration-300 group-hover:text-white">
                        {label}
                      </span>
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#c92a2a]/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6">
            <div className="flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
              <div className="flex flex-col gap-4 pl-10 sm:flex-row sm:items-end sm:gap-8 sm:pl-0">
                <div>
                  <span className="block font-display text-3xl tracking-wide text-white">
                    LN<span className="text-[#c92a2a]">.</span>
                  </span>
                  <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.22em] text-white/36">
                    Crafted with care
                  </span>
                </div>

                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/42">
                  <span className="mr-2 text-white/24">Local Time</span>
                  {time ? (
                    <>
                      <span className="tabular-nums text-white/80">{time.formatted}</span>
                      <span className="ml-2 text-white/38">{time.date}</span>
                    </>
                  ) : (
                    <span className="text-white/50">Syncing</span>
                  )}
                </div>
              </div>

              <nav className="flex flex-wrap gap-x-6 gap-y-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/48 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <button
                onClick={scrollToTop}
                className="group flex w-fit items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55 transition-colors duration-300 hover:text-white"
                aria-label="Scroll to top"
              >
                Back to top
                <span className="flex h-9 w-9 items-center justify-center border border-white/15 bg-white/[0.025] transition-all duration-300 group-hover:border-[#c92a2a]/60 group-hover:bg-[#c92a2a]/10">
                  <ArrowUp className="h-4 w-4" />
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function Linkedin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Github(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Instagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function Youtube(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 7.1C2.5 7.1 2.3 5 4.3 3c2.3-2.3 5.8-2.3 9.7-2.3S19.4.7 21.7 3c2 2 1.8 4.1 1.8 4.1s.2 1.7.2 3.4v3c0 1.7-.2 3.4-.2 3.4s.2 2.1-1.8 4.1c-2.3 2.3-6.2 2.3-9.7 2.3S6.6 23.3 4.3 21c-2-2-1.8-4.1-1.8-4.1s-.2-1.7-.2-3.4v-3c0-1.7.2-3.4.2-3.4z" />
      <path d="m9.5 15.5 7-3.5-7-3.5z" />
    </svg>
  );
}
