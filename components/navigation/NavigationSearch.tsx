import React from "react";
// Lib
import { cn } from "@/lib/utils";
// Interface
interface NavigationSearchProps {
  className?: string;
}

const NavigationSearch = ({ className = "" }: NavigationSearchProps) => {
  return <div className={cn("", className)}>NavigationSearch</div>;
};

export default NavigationSearch;
