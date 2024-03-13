import React from "react";
// Next
import Image from "next/image";
// Lib
import { cn } from "@/lib/utils";
// Props
interface BackgroundImageProps {
  className?: string;
  imageURL: string;
  includeBlackOverlay?: boolean;
}
const BackgroundImage = ({
  className = "",
  imageURL = "/images/app-bg.webp",
  includeBlackOverlay,
}: BackgroundImageProps) => {
  return (
    <div className={cn("fixed top-0 left-0 w-full h-full z-[-1]", className)}>
      <Image
        src={imageURL}
        alt={process.env.NEXT_PUBLIC_ALT_IMG_TEXT!!}
        className="rounded-md object-cover"
        fill
      />
      {includeBlackOverlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black to-black/95 opacity-95" />
      )}
    </div>
  );
};

export default BackgroundImage;
