"use client";
import "@uploadthing/react/styles.css";
import React from "react";
// Lib
import { UploadDropzone } from "@/lib/file-upload";
import { isFileImage } from "@/lib/utils";
// Components
import ImagePreview from "./ImagePreview";
import Label from "./ui/Label";
// TS
import { FileUploadEndpoint } from "@/ts/types";
// Interface
interface FileUploadProps {
  endpoint: FileUploadEndpoint;
  className?: string;
  value: string;
  onChange: (url?: string) => void;
  label?: string;
  error?: string;
}
const FileUpload = ({
  className = "",
  endpoint,
  value,
  label,
  error,
  onChange = () => {},
}: FileUploadProps) => {
  //
  console.log(value);
  if (value && isFileImage(value))
    return (
      <div className={`${className}`}>
        <ImagePreview imageURL={value} onDelete={onChange.bind("")} />
      </div>
    );

  return (
    <div className={`${className}`}>
      {/** Label ? */}
      {label && (
        <div>
          <Label text={label} />
          {error && (
            <span className="text-rose-500 text-sm mt-1 block">{error}</span>
          )}
        </div>
      )}
      {/** Upload zone */}
      <UploadDropzone
        endpoint={endpoint}
        /**
         * TODO
         *  onBeforeUploadBegin={(files) => {
          // 1)
          const [file] = files;
          // 2)
          if (!isFileImage((file as any).path)) return null;

          return files;
        }} */
        onClientUploadComplete={(res) => {
          onChange(res[0]?.url);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
      />
    </div>
  );
};

export default FileUpload;
