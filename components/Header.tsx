import React from "react";
// Next
import dynamic from "next/dynamic";
import Image from "next/image";
// Lib
import { cn } from "@/lib/utils";
// Components
const NavigationSidebarBurger = dynamic(
  () => import("@/components/burgers/NavigationSidebarBurger")
);

// Props
interface HeaderProps {
  className?: string;
  children: React.ReactNode;
}
interface HeaderTitleProps {
  className?: string;
  text: string;
  spanText?: string;
  children?: React.ReactNode;
  spanIcon?: any;
  imageURL?: string;
}

const Header = ({ className = "", children }: HeaderProps) => {
  return (
    <header
      className={cn(
        "p-5 min-h-20 ml-[-5%] pl-[7%] border-b-2 border-border-common-2 flex items-center",
        className
      )}
      style={{
        background:
          "linear-gradient(108deg, rgba(30,31,36,1) 0%, rgba(32,33,38,1) 66%)",
      }}
    >
      <div className="block lg:hidden mr-4">
        <NavigationSidebarBurger />
      </div>
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
  children,
}: HeaderTitleProps) => {
  const Icon = spanIcon;

  return (
    <h1 className={cn("text-lg xl:text-xl flex items-center", className)}>
      {imageURL && (
        <Image
          width={35}
          height={35}
          src={imageURL}
          alt={text}
          loading="lazy"
          className="mr-2 rounded-full object-cover w-8 h-8 sm:w-9 sm:h-9 xl:w-10 xl:h-10"
        />
      )}
      {text}
      {children && children}
      {spanText && (
        <span className="text-gray-500 text-[14px] xl:text-lg ml-2 flex items-center">
          {<Icon className="w-[17px] h-[17px] sm:w-5 sm:h-5 mr-[2px]" />}{" "}
          {spanText}
        </span>
      )}
    </h1>
  );
};

export const HeaderRightContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="ml-auto">{children}</div>;
};
