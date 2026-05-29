import { cn } from "@/utils/cn";
import { ReactNode } from "react";

export function HUDCorner({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative group", className)}>
      {/* Top Left Corner */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-border-tactical opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Top Right Corner */}
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-border-tactical opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Bottom Left Corner */}
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-border-tactical opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Bottom Right Corner */}
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-border-tactical opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Content */}
      <div className="p-4 h-full">
        {children}
      </div>
    </div>
  );
}
