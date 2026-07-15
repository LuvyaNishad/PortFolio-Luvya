"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { PROJECTS_DATA, type ProjectCategory, type ProjectItem } from "@/data/projects";

const archiveSections: Array<{
  id: ProjectCategory;
  anchor: string;
  eyebrow: string;
  title: string;
  accent: string;
  kind: "gallery" | "case-study";
}> = [
  {
    id: "graphic_design",
    anchor: "graphic-design",
    eyebrow: "Visual archive",
    title: "Graphic Design",
    accent: "#78936f",
    kind: "gallery",
  },
  {
    id: "video_edits",
    anchor: "video-edits",
    eyebrow: "Motion archive",
    title: "Video Edits",
    accent: "#c5261a",
    kind: "gallery",
  },
  {
    id: "ui_ux",
    anchor: "ui-ux-design",
    eyebrow: "Selected dossiers",
    title: "UI/UX Design",
    accent: "#d6d6d8",
    kind: "case-study",
  },
  {
    id: "code_projects",
    anchor: "code-projects",
    eyebrow: "Build records",
    title: "Code Projects",
    accent: "#c59b4a",
    kind: "case-study",
  },
];

function GalleryTile({ item, active, onActivate, onDeactivate }: {
  item: ProjectItem;
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playPreview = () => {
    onActivate();
    void videoRef.current?.play().catch(() => undefined);
  };

  const pausePreview = () => {
    onDeactivate();
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.figure
      layout
      transition={{ layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
      className={`work-gallery-tile ${active ? "is-active" : ""}`}
      style={{ "--tile-ratio": item.aspectRatio ?? "4 / 3" } as React.CSSProperties}
      onMouseEnter={playPreview}
      onMouseLeave={pausePreview}
      onFocus={playPreview}
      onBlur={pausePreview}
    >
      <button
        type="button"
        className="work-gallery-trigger"
        onClick={onActivate}
        aria-label={`Focus ${item.title}`}
        aria-pressed={active}
      >
        <img
          src={item.thumbnailUrl}
          alt=""
          className="work-gallery-image"
          onError={(event) => {
            event.currentTarget.style.opacity = "0";
          }}
        />
        {item.mediaUrl ? (
          <video
            ref={videoRef}
            className="work-gallery-video"
            muted
            loop
            playsInline
            preload="metadata"
            poster={item.thumbnailUrl}
            src={item.mediaUrl}
            aria-hidden="true"
          />
        ) : null}
        <span className="work-gallery-shade" aria-hidden="true" />
        <span className="work-gallery-frame" aria-hidden="true" />
      </button>
    </motion.figure>
  );
}

function getAspectOrientation(item: ProjectItem) {
  const [width, height] = (item.aspectRatio ?? "4 / 3")
    .split("/")
    .map((value) => Number.parseFloat(value.trim()));

  return width > height ? "landscape" : "portrait";
}

function GraphicCompositionGallery({ items, accent }: { items: ProjectItem[]; accent: string }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];
  const inactiveItems = activeItem ? items.filter((item) => item.id !== activeItem.id) : items;
  const orientation = activeItem ? getAspectOrientation(activeItem) : "landscape";

  if (!activeItem) {
    return null;
  }

  return (
    <div
      className={`work-gallery work-gallery-composition has-active-tile is-${orientation}`}
      style={{ "--archive-accent": accent } as React.CSSProperties}
      onMouseLeave={() => setActiveId(null)}
    >
      <motion.div className="work-gallery-cluster" layout>
        {inactiveItems.map((item) => (
          <GalleryTile
            key={item.id}
            item={item}
            active={false}
            onActivate={() => setActiveId(item.id)}
            onDeactivate={() => undefined}
          />
        ))}
      </motion.div>

      <motion.div className="work-gallery-feature" layout>
        <GalleryTile
          key={activeItem.id}
          item={activeItem}
          active
          onActivate={() => setActiveId(activeItem.id)}
          onDeactivate={() => undefined}
        />
      </motion.div>
    </div>
  );
}

function DynamicGallery({ items, accent, composed = false }: { items: ProjectItem[]; accent: string; composed?: boolean }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  if (composed) {
    return <GraphicCompositionGallery items={items} accent={accent} />;
  }

  return (
    <div className={`work-gallery ${activeId ? "has-active-tile" : ""}`} style={{ "--archive-accent": accent } as React.CSSProperties}>
      {items.map((item) => (
        <GalleryTile
          key={item.id}
          item={item}
          active={item.id === activeId}
          onActivate={() => setActiveId(item.id)}
          onDeactivate={() => setActiveId(null)}
        />
      ))}
    </div>
  );
}

function CaseStudyGrid({ items, accent }: { items: ProjectItem[]; accent: string }) {
  return (
    <div className="work-case-studies" style={{ "--archive-accent": accent } as React.CSSProperties}>
      {items.map((item) => {
        const content = (
          <>
            <img src={item.thumbnailUrl} alt="" className="work-case-study-image" />
            <span className="work-case-study-shade" aria-hidden="true" />
            <span className="work-case-study-frame" aria-hidden="true" />
            <span className="work-case-study-label">
              <span>{item.title}</span>
              <ArrowUpRight size={18} strokeWidth={1.4} aria-hidden="true" />
            </span>
          </>
        );

        return item.link ? (
          <a key={item.id} href={item.link} className="work-case-study" aria-label={`Open ${item.title} case study`}>
            {content}
          </a>
        ) : (
          <article key={item.id} className="work-case-study" aria-label={item.title}>
            {content}
          </article>
        );
      })}
    </div>
  );
}

export function WorkArchive() {
  return (
    <main className="work-archive">
      <div className="work-archive-bg" aria-hidden="true" />
      <header className="work-archive-intro">
        <span className="work-archive-kicker">Selected work</span>
        <h1>
          Work <em>Archive</em>
        </h1>
      </header>

      <div className="work-archive-content">
        {archiveSections.map((section, index) => {
          const items = PROJECTS_DATA.filter((item) => item.category === section.id);

          return (
            <motion.section
              key={section.id}
              id={section.anchor}
              className="work-archive-section"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="work-archive-heading">
                <span style={{ color: section.accent }}>0{index + 1}</span>
                <div>
                  <p>{section.eyebrow}</p>
                  <h2>{section.title}</h2>
                </div>
              </div>

              {section.kind === "gallery" ? (
                <DynamicGallery items={items} accent={section.accent} composed={section.id === "graphic_design"} />
              ) : (
                <CaseStudyGrid items={items} accent={section.accent} />
              )}
            </motion.section>
          );
        })}
      </div>
    </main>
  );
}
