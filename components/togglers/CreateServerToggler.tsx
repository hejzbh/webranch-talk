"use client";
import React from "react";
// Icons
import { Plus } from "lucide-react";
// Lib
import { cn } from "@/lib/utils";
import { useModalControl } from "../providers/ModalProvider";

// Props
interface CreateServerTogglerProps {
  className?: string;
}

const CreateServerToggler = ({ className = "" }: CreateServerTogglerProps) => {
  const { onOpen } = useModalControl();

  return (
    <button
      onClick={() => onOpen("createServer")}
      title="Create new server"
      className={cn(
        "flex items-center justify-center flex-col bg-black border-[2px] border-dashed p-7 border-white/40 w-full rounded-2xl",
        className
      )}
    >
      {/** Plus Icon */}
      <span className="bg-main rounded-full p-2 mb-2">
        <Plus />
      </span>
      {/** Text */}
      <p className="text-white text-md">Create new server</p>
      <p className="text-sm">
        or use <span className="text-main">invite code</span>
      </p>
    </button>
  );
};

export default CreateServerToggler;
