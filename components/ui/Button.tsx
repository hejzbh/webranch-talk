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
        "bg-main rounded-3xl shadow-md px-5 py-3 text-white border-2 border-main hover:bg-transparent hover:text-main transition-all duration-300 ease-in-out",
        className
      )}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
