"use client";

import { motion } from "framer-motion";
import { MetadataText } from "./MetadataText";

export function CapacityBar({
  value,
  max = 10,
  label = "CAPACITY",
}: {
  value: number;
  max?: number;
  label?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <MetadataText className="text-[10px] text-muted-foreground">{label}</MetadataText>
      
      <div className="flex items-center gap-1">
        <MetadataText className="text-[10px] text-white">
          {String(value).padStart(2, "0")}/{String(max).padStart(2, "0")}
        </MetadataText>
        
        <div className="flex gap-[2px] ml-2">
          {Array.from({ length: max }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className={`w-2 h-3 rounded-sm ${
                i < value ? "bg-accent-red" : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
