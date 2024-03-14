import React from "react";
// Next
import dynamic from "next/dynamic";
// Lib
import { cn } from "@/lib/utils";
// Components
const Label = dynamic(() => import("@/components/ui/Label"));

// Props
interface NavigationSectionProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

const NavigationSection = ({
  label = "",
  children,
  className = "",
}: NavigationSectionProps) => {
  return (
    <section className={cn("space-y-2", className)}>
      {/** Label */}
      <Label text={label} />
      {/* Children */}
      {children}
    </section>
  );
};

export default NavigationSection;
