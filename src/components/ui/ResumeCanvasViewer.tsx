"use client";

import React, { useEffect, useRef, useState } from "react";

interface ResumeCanvasViewerProps {
  pdfUrl: string;
  title: string;
}

export function ResumeCanvasViewer({ pdfUrl, title }: ResumeCanvasViewerProps) {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPdf() {
      try {
        setLoading(true);
        setError(null);

        // Load pdf.js from reliable CDN if not already on window
        if (!(window as any).pdfjsLib) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load PDF engine"));
            document.head.appendChild(script);
          });
        }

        const pdfjsLib = (window as any).pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
        const renderedDataUrls: string[] = [];

        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2.0 }); // 2x scale for razor-sharp crisp rendering

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          if (context) {
            await page.render({
              canvasContext: context,
              viewport: viewport,
            }).promise;

            renderedDataUrls.push(canvas.toDataURL("image/webp", 0.95));
          }
        }

        if (isMounted) {
          setPages(renderedDataUrls);
          setLoading(false);
        }
      } catch (err: any) {
        console.error("PDF Render Error:", err);
        if (isMounted) {
          setError(err.message || "Failed to render resume");
          setLoading(false);
        }
      }
    }

    loadPdf();

    return () => {
      isMounted = false;
    };
  }, [pdfUrl]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#c5a880]/30 border-t-[#c5a880] animate-spin" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c5a880]/70">
          Decrypting & Rendering Document...
        </span>
      </div>
    );
  }

  if (error || pages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full gap-3 text-center px-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-red/80">
          Document display issue
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/40">
          {error || "Unable to display pages"}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 h-full max-h-full max-w-full">
      {pages.map((dataUrl, index) => (
        <div
          key={index}
          className="relative h-full max-h-full aspect-[1/1.414] max-w-full rounded-lg overflow-hidden flex flex-col bg-white shadow-2xl shrink-0 select-none"
          style={{
            border: "1px solid rgba(197,168,128,0.22)",
            boxShadow:
              "0 20px 70px -15px rgba(0,0,0,0.85), 0 0 2px 0 rgba(197,168,128,0.3), inset 0 1px 0 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Top-edge specular shine */}
          <div
            className="absolute left-0 right-0 top-0 h-[1px] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(197,168,128,0.4) 25%, rgba(197,168,128,0.6) 50%, rgba(197,168,128,0.4) 75%, transparent 100%)",
              zIndex: 5,
            }}
          />

          {/* Corner brackets on the frame */}
          <div
            className="absolute top-2 left-2 w-[10px] h-[10px] border-t-[1.5px] border-l-[1.5px] border-[#c5a880]/50 pointer-events-none"
            style={{ zIndex: 5 }}
          />
          <div
            className="absolute top-2 right-2 w-[10px] h-[10px] border-t-[1.5px] border-r-[1.5px] border-[#c5a880]/50 pointer-events-none"
            style={{ zIndex: 5 }}
          />
          <div
            className="absolute bottom-2 left-2 w-[10px] h-[10px] border-b-[1.5px] border-l-[1.5px] border-[#c5a880]/50 pointer-events-none"
            style={{ zIndex: 5 }}
          />
          <div
            className="absolute bottom-2 right-2 w-[10px] h-[10px] border-b-[1.5px] border-r-[1.5px] border-[#c5a880]/50 pointer-events-none"
            style={{ zIndex: 5 }}
          />

          {/* Page Number Indicator badge if multiple pages */}
          {pages.length > 1 && (
            <div className="absolute bottom-2.5 right-3.5 z-10 px-2 py-0.5 rounded bg-black/80 border border-[#c5a880]/30 font-mono text-[8px] tracking-[0.16em] uppercase text-[#c5a880]/90 backdrop-blur-sm pointer-events-none">
              Page {index + 1} / {pages.length}
            </div>
          )}

          {/* Pure Pristine Rendered Page — ZERO Scrollbars, ZERO Chrome */}
          <img
            src={dataUrl}
            alt={`${title} - Page ${index + 1}`}
            className="w-full h-full object-contain pointer-events-none select-none block"
            style={{
              display: "block",
            }}
          />
        </div>
      ))}
    </div>
  );
}
