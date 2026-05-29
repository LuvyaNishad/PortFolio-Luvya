import { cn } from "@/utils/cn";
import { ReactNode } from "react";

export function MetadataText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("font-mono text-xs tracking-widest text-muted uppercase", className)}>
      {children}
    </span>
  );
}
