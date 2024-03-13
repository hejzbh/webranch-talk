import React from "react";
// Next
import Image from "next/image";
import { cn } from "@/lib/utils";
// Components
// Props
interface UserAvatarProps {
  imageURL: string;
  className?: string;
}

const UserAvatar = ({ imageURL, className = "" }: UserAvatarProps) => {
  if (!imageURL) return null;

  return (
    <Image
      src={imageURL}
      alt={process.env.NEXT_PUBLIC_ALT_IMG_TEXT!!}
      width={50}
      height={50}
      className={cn("", className)}
    />
  );
};

export default UserAvatar;
