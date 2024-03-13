"use client";
import React from "react";
// Next
import dynamic from "next/dynamic";
// Lib
import { cn } from "@/lib/utils";
// Components
import { useModalControl } from "../providers/ModalProvider";
const SearchBTN = dynamic(() => import("@/components/ui/SearchBTN"));
const Shortcut = dynamic(() => import("@/components/ui/Shortcut"));
const NavigationSearchModal = dynamic(
  () => import("@/components/modals/NavigationSearchModal")
);

// Props
interface NavigationSearchProps {
  className?: string;
  data: {
    label: string;
    type: "users" | "servers";
    data: {
      icon: React.ReactNode;
      imageURL?: string;
      name: string;
      id: string;
    }[];
  }[];
}

const NavigationSearch = ({
  className = "",
  data = [],
}: NavigationSearchProps) => {
  const { toggleModal } = useModalControl();

  return (
    <div className={cn("", className)}>
      {/** Togger */}
      <SearchBTN
        placeholder="Search"
        className="relative"
        onClick={() => {
          toggleModal("navigationSearch");
        }}
      >
        <Shortcut
          keys={["CTRL", "f"]}
          className="absolute top-[50%] translate-y-[-50%] right-2 z-[2]"
          onShortcutPress={() => {
            toggleModal("navigationSearch");
          }}
        />
      </SearchBTN>
      {/** Search modal */}
      <NavigationSearchModal />
    </div>
  );
};

export default NavigationSearch;
