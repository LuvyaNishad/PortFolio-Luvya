"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export function TacticalButton({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative group flex items-center gap-4 px-6 py-3",
        "border border-border-tactical bg-black/40 backdrop-blur-sm",
        "hover:border-white/40 hover:bg-white/5 transition-colors duration-500",
        "font-sans text-sm tracking-widest text-foreground",
        className
      )}
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-accent-red group-hover:h-full transition-all duration-300 ease-out" />
      {children}
    </motion.button>
  );
}
