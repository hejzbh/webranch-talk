import React from "react";
// Lib
import { cn } from "@/lib/utils";

// Props
interface HeaderProps {
  className?: string;
  children: React.ReactNode;
}

const Header = ({ className = "", children }: HeaderProps) => {
  return (
    <header
      className={cn(
        "p-5 min-h-20 ml-[-5%] border-b-2 border-border-common-2",
        className
      )}
      style={{
        background:
          "linear-gradient(90deg, rgba(26,27,31,1) 0%, rgba(26,27,31,1) 35%, rgba(18,18,22,1) 100%)",
      }}
    >
      {children}
    </header>
  );
};

export default Header;
