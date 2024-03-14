"use client";
import React from "react";
// Next
import Image from "next/image";
// Components
import { X } from "lucide-react";
// NPM
import axios from "axios";
// Interface
interface ImagePreviewProps {
  className?: string;
  imageURL: string;
  onDelete: () => void;
}
const ImagePreview = ({
  imageURL = "",
  className = "",

  onDelete,
}: ImagePreviewProps) => {
  const onImageDelete = async function () {
    if (!imageURL) return;

    const { data } = await axios.delete("/api/uploadthing", {
      data: {
        url: imageURL,
      },
    });

    if (data?.message === "ok") onDelete();
  };

  return (
    <div className={`relative ${className}`}>
      {/** Render image */}
      <Image
        src={imageURL}
        alt={"Webranch"}
        width={250}
        height={150}
        className="rounded-full drop-shadow-md w-full h-full min-w-[200px] max-w-[200px]  min-h-[200px] max-h-[200px] object-cover"
      />
      {/** Remove img */}
      <X
        onClick={onImageDelete}
        xlinkTitle="Remove image"
        className="absolute top-3 cursor-pointer z-10 right-3  bg-red-700 text-white rounded-full"
      />
    </div>
  );
};

export default ImagePreview;
