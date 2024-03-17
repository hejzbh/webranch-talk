import React from "react";
// Next
import Image from "next/image";
// Lib
import { cn } from "@/lib/utils";
// Icons
import { Circle } from "lucide-react";

// Props
interface HeaderProps {
  className?: string;
  children: React.ReactNode;
}
interface HeaderTitleProps {
  className?: string;
  text: string;
  spanText?: string;
  spanIcon?: any;
  imageURL?: string;
}

const Header = ({ className = "", children }: HeaderProps) => {
  return (
    <header
      className={cn(
        "p-5 min-h-20 ml-[-5%] pl-[7%] border-b-2 border-border-common-2 flex items-center justify-between",
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

export const HeaderTitle = ({
  text,
  spanText,
  spanIcon,
  imageURL,
  className,
}: HeaderTitleProps) => {
  const Icon = spanIcon;

  return (
    <h1 className="text-2xl flex items-center">
      {imageURL && (
        <Image
          width={35}
          height={35}
          src={imageURL}
          alt={text}
          loading="lazy"
          className="mr-2 rounded-full object-cover w-10 h-10"
        />
      )}
      {text}
      {spanText && (
        <span className="text-gray-500 text-md ml-2 flex items-center">
          {<Icon className="mr-[2px]" />} {spanText}
        </span>
      )}
    </h1>
  );
};
