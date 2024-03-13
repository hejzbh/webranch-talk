import React from "react";
// Lib
import { cn } from "@/lib/utils";
// Props
interface LabelProps {
  className?: string;
  text: string;
}
const Label = ({ className = "", text = "" }: LabelProps) => {
  return (
    <label
      className={cn(
        "text-secondary text-sm font-semibold uppercase",
        className
      )}
    >
      {text}
    </label>
  );
};

export default Label;
