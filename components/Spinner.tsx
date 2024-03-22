import React from "react";
// Icons
import { Loader } from "lucide-react";

// Props
interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className = "" }: SpinnerProps) => {
  return (
    <Loader
      className={`transition-all duration-1000 ease-linear animate-spin ${className}`}
    />
  );
};

export default Spinner;
