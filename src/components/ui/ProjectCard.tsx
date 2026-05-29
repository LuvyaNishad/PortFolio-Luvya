"use client";

import { motion } from "framer-motion";
import { HUDCorner } from "./HUDCorner";
import { MetadataText } from "./MetadataText";

export function ProjectCard({
  title,
  category,
  year,
  mediaType = "image",
}: {
  title: string;
  category: string;
  year: string;
  mediaType?: "image" | "video";
}) {
  return (
    <HUDCorner className="w-full">
      <motion.div 
        whileHover={{ scale: 0.98 }}
        className="group relative cursor-pointer block overflow-hidden bg-black/20 aspect-[4/3] sm:aspect-video md:aspect-[4/3] rounded-sm"
      >
        {/* Placeholder for actual media */}
        <div className="absolute inset-0 flex items-center justify-center border border-dashed border-border-tactical/50 m-4">
          <MetadataText className="text-muted/50">
            [ INSERT {mediaType.toUpperCase()} HERE ]
          </MetadataText>
        </div>

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Info that appears on hover */}
        <div className="absolute bottom-0 left-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex justify-between w-full items-end">
          <div>
            <MetadataText className="text-accent-red mb-2">{category}</MetadataText>
            <h3 className="font-sans text-xl text-white font-medium">{title}</h3>
          </div>
          <MetadataText>{year}</MetadataText>
        </div>
      </motion.div>
    </HUDCorner>
  );
}
