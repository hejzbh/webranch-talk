"use client";
import React from "react";
// Next
import dynamic from "next/dynamic";
// Icons
import { Plus } from "lucide-react";
// Lib
import { cn } from "@/lib/utils";
import { useModalControl } from "../providers/ModalProvider";
// Components
const Shortcut = dynamic(() => import("@/components/ui/Shortcut"));

// Props
interface CreateServerTogglerProps {
  className?: string;
}

const CreateServerToggler = ({ className = "" }: CreateServerTogglerProps) => {
  const { toggleModal } = useModalControl();

  return (
    <button
      onClick={() => toggleModal("createServer")}
      title="Create new server"
      className={cn(
        "flex items-center relative justify-center flex-col bg-black border-[2px] border-dashed p-7 border-white/40 w-full rounded-2xl",
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
      {/** Shortcut */}
      <Shortcut
        onShortcutPress={() => toggleModal("createServer")}
        keys={["CTRL", "s"]}
        className="absolute top-2 right-2"
      />
    </button>
  );
};

export default CreateServerToggler;
