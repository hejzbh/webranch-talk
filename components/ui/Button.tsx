import React from "react";
// Lib
import { cn } from "@/lib/utils";

// Props
interface ButtonProps {
  className?: string;
  type?: "button" | "submit";
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  className = "",
  type = "button",
  title,
  onClick = () => {},
  disabled,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      title={title}
      type={type}
      className={cn(
        "bg-[#2563EB] rounded-3xl shadow-md px-3 md:px-4 py-1 md:py-2 text-white border-2 border-[#2563EB] hover:bg-transparent hover:text-[#2563EB] transition-all duration-300 ease-in-out text-md md:text-lg",
        className
      )}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
