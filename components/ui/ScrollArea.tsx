import React from "react";
// Lib
import { cn } from "@/lib/utils";
// Interface
interface ScrollAreaProps {
  className?: string;
  children: React.ReactNode;
  list?: boolean;
}

const ScrollArea = ({ className = "", children, list }: ScrollAreaProps) => {
  if (list)
    return (
      <ul className={cn("flex flex-col space-y-2 overflow-y-auto", className)}>
        {children}
      </ul>
    );

  return (
    <div className={cn("flex flex-col space-y-2 overflow-y-auto", className)}>
      {children}
    </div>
  );
};

export default ScrollArea;
