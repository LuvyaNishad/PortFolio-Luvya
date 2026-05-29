"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function RevealUp({ 
  children, 
  delay = 0, 
  duration = 0.8,
  className 
}: { 
  children: ReactNode; 
  delay?: number; 
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
