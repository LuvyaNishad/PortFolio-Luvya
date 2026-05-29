"use client";

import { RevealUp } from "../motion/RevealUp";
import { FadeIn } from "../motion/FadeIn";
import { ProjectCard } from "../ui/ProjectCard";
import { MetadataText } from "../ui/MetadataText";

export function WorkLibrary() {
  const categories = [
    {
      id: "graphic-design",
      title: "GRAPHIC DESIGN",
      count: "04",
      projects: [
        { title: "Brand Identity X", year: "2024", mediaType: "image" as const },
        { title: "Poster Series Y", year: "2023", mediaType: "image" as const },
      ]
    },
    {
      id: "video-edits",
      title: "VIDEO EDITS",
      count: "03",
      projects: [
        { title: "Cinematic Reel", year: "2024", mediaType: "video" as const },
        { title: "Product Promo", year: "2023", mediaType: "video" as const },
      ]
    },
    {
      id: "ui-ux",
      title: "UI/UX DESIGN",
      count: "06",
      projects: [
        { title: "Tactical Dashboard", year: "2024", mediaType: "image" as const },
        { title: "E-Commerce App", year: "2023", mediaType: "image" as const },
      ]
    },
    {
      id: "code-projects",
      title: "CODE PROJECTS",
      count: "05",
      projects: [
        { title: "Webgl Experiment", year: "2024", mediaType: "video" as const },
        { title: "Portfolio V1", year: "2022", mediaType: "image" as const },
      ]
    }
  ];

  return (
    <section id="work" className="relative min-h-screen py-32 px-8 md:px-24 bg-black/40 backdrop-blur-md border-t border-border-soft mt-32">
      <div className="max-w-7xl mx-auto">
        
        <RevealUp>
          <div className="flex items-end gap-6 mb-24 border-b border-border-tactical pb-8">
            <h2 className="font-display text-5xl md:text-7xl text-foreground">WORK ARCHIVE</h2>
            <MetadataText className="text-accent-red mb-2 hidden md:block">ALL SYSTEMS ONLINE</MetadataText>
          </div>
        </RevealUp>

        <div className="flex flex-col gap-32">
          {categories.map((category, idx) => (
            <div key={category.id} className="relative">
              {/* Category Header */}
              <FadeIn delay={0.2} className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-accent-amber rounded-full" />
                  <h3 className="font-sans text-2xl md:text-3xl font-medium tracking-wide text-white">
                    {category.title}
                  </h3>
                </div>
                <MetadataText>INDEX: {category.count}</MetadataText>
              </FadeIn>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.projects.map((project, pIdx) => (
                  <FadeIn key={pIdx} delay={0.3 + (pIdx * 0.1)}>
                    <ProjectCard
                      title={project.title}
                      category={category.title}
                      year={project.year}
                      mediaType={project.mediaType}
                    />
                  </FadeIn>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
