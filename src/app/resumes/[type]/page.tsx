import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ResumeCanvasViewer } from "@/components/ui/ResumeCanvasViewer";

/**
 * Resume Viewer — /resumes/[type]
 *
 * Direct canvas rendered PDF document with 0 browser viewer chrome,
 * 0 scrollbars, and full dual-page side-by-side support.
 */

const RESUME_META: Record<
  string,
  {
    title: string;
    label: string;
    description: string;
    pdfKey: "design" | "developer";
    pageCount: number;
  }
> = {
  design: {
    title: "Design Resume",
    label: "Design",
    description: "UI/UX & Visual Design",
    pdfKey: "design",
    pageCount: 1,
  },
  developer: {
    title: "Developer Resume",
    label: "Developer",
    description: "Engineering & Development",
    pdfKey: "developer",
    pageCount: 2,
  },
};

type Params = Promise<{ type: string }>;

export async function generateStaticParams() {
  return [{ type: "design" }, { type: "developer" }];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { type } = await params;
  const meta = RESUME_META[type];
  if (!meta) return { title: "Resume Not Found" };

  return {
    title: `${meta.title}`,
    description: `${siteConfig.legalName}'s ${meta.description} resume.`,
    robots: { index: false, follow: true },
  };
}

export default async function ResumeViewerPage({ params }: { params: Params }) {
  const { type } = await params;
  const meta = RESUME_META[type];
  if (!meta) notFound();

  const pdfUrl = siteConfig.resumes[meta.pdfKey];
  if (!pdfUrl || pdfUrl.trim().length === 0) notFound();

  return (
    <main className="relative flex h-screen max-h-screen flex-col items-center justify-between bg-[#0a0a0c] overflow-hidden select-none">
      {/* Grain film overlay */}
      <div className="grain-overlay" />

      {/* Atmospheric depth */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 22% 88%, rgba(197,168,128,0.06), transparent 62%),
            radial-gradient(ellipse 60% 50% at 80% 15%, rgba(197,168,128,0.04), transparent 70%),
            radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(10,10,12,0.75) 78%, #0a0a0c 100%)
          `,
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Faint scanlines */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,1) 3px, rgba(255,255,255,1) 4px)",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Tactical corner brackets */}
      <div className="pointer-events-none fixed left-4 top-4 hidden h-7 w-7 border-l-[1.5px] border-t-[1.5px] border-[#c5a880]/30 lg:block" style={{ zIndex: 2 }} />
      <div className="pointer-events-none fixed right-4 top-4 hidden h-7 w-7 border-r-[1.5px] border-t-[1.5px] border-white/10 lg:block" style={{ zIndex: 2 }} />
      <div className="pointer-events-none fixed bottom-4 left-4 hidden h-7 w-7 border-b-[1.5px] border-l-[1.5px] border-white/10 lg:block" style={{ zIndex: 2 }} />
      <div className="pointer-events-none fixed bottom-4 right-4 hidden h-7 w-7 border-b-[1.5px] border-r-[1.5px] border-[#c5a880]/30 lg:block" style={{ zIndex: 2 }} />

      {/* ─── Top Bar ─── */}
      <header
        className="relative z-10 w-full max-w-[1700px] px-4 sm:px-8 pt-3 sm:pt-4 pb-2 shrink-0"
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left: Back + title */}
          <div className="flex items-center gap-3 sm:gap-5 min-w-0">
            <Link
              href="/"
              className="group flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/40 hover:text-white transition-colors duration-300 shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-x-0.5">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span className="hidden sm:inline">Back</span>
            </Link>

            <div className="h-4 w-px bg-white/10 hidden sm:block" />

            {/* Status strip */}
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className="block w-[5px] h-[5px] rounded-full bg-[#c5a880] shrink-0"
                style={{
                  animation: "resume-dot-pulse 2.5s ease-in-out infinite",
                }}
              />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#c5a880]/90 font-medium">
                {meta.label} Resume
              </span>
              <span className="h-3 w-px bg-white/10 hidden sm:block" />
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/35 hidden sm:block">
                {meta.description} {meta.pageCount > 1 ? `· ${meta.pageCount} Pages Spread` : ""}
              </span>
            </div>
          </div>

          {/* Right: Download button */}
          <a
            href={`/api/resumes/download/${type}`}
            download={`Luvya-Nishad-${meta.label}-Resume.pdf`}
            className="group relative isolate flex items-center gap-2 overflow-hidden rounded-full bg-neutral-950 px-4 sm:px-5 py-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-white/80 hover:text-white transition-all duration-300 shrink-0 border border-[#c5a880]/30 hover:border-[#c5a880]/60 hover:shadow-[0_0_20px_-4px_rgba(197,168,128,0.4)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c5a880] transition-colors duration-200">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="hidden sm:inline">Download PDF</span>
          </a>
        </div>
      </header>

      {/* ─── Pure Rendered Page Display — Zero Scrollbars, Zero Viewer Chrome ─── */}
      <div className="relative z-10 flex-1 w-full max-w-[1700px] px-2 sm:px-6 py-1 flex items-center justify-center min-h-0 overflow-hidden">
        <ResumeCanvasViewer pdfUrl={pdfUrl} title={meta.title} />
      </div>

      {/* ─── Footer Metadata Bar ─── */}
      <footer className="relative z-10 w-full max-w-[1700px] px-4 sm:px-8 py-2 shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-2">
          <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-white/25">
            {siteConfig.initials} {"// "}{siteConfig.name} — {meta.label} Resume
          </span>
          <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-white/25">
            {meta.pageCount > 1 ? "Dual-Page Spread · Zero Scrollbars" : "Direct Page View · Zero Scrollbars"}
          </span>
        </div>
      </footer>
    </main>
  );
}
