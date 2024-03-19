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
      width={35}
      height={35}
      className={cn("rounded-full", className)}
    />
  );
};

export default UserAvatar;
