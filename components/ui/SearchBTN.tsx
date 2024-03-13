import React from "react";
// Icons
import { Search } from "lucide-react";
// Lib
import { cn } from "@/lib/utils";
// Props
interface SearchBTNProps {
  className?: string;
  placeholder: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const SearchBTN = ({
  className = "",
  placeholder,
  children = <></>,
  onClick = () => {},
}: SearchBTNProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      title="Click to search"
      className={cn(
        "bg-black rounded-3xl p-2 px-3 w-full flex items-center space-x-2 transition-all hover:opacity-70",
        className
      )}
    >
      {/** Icon */}
      <Search className="w-6 h-6" />
      {/** Text */}
      <p className="text-secondary text-sm">{placeholder}</p>
      {/** Children ? */}
      {children}
    </button>
  );
};

export default SearchBTN;
