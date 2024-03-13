"use client";
import React from "react";
// Next
import dynamic from "next/dynamic";
// Lib
import { cn } from "@/lib/utils";
// TS
import { NavigationSearchData } from "@/ts/types";
// Components
import { useModalControl } from "../providers/ModalProvider";
const SearchBTN = dynamic(() => import("@/components/ui/SearchBTN"));
const Shortcut = dynamic(() => import("@/components/ui/Shortcut"));

// Props
interface NavigationSearchProps {
  className?: string;
  data: NavigationSearchData;
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
          toggleModal("navigationSearch", { navigationSearchData: data });
        }}
      >
        <Shortcut
          keys={["CTRL", "f"]}
          className="absolute top-[50%] translate-y-[-50%] right-2 z-[2]"
          onShortcutPress={(e) => {
            // Stop propagation (because parent element (SearchBTN) has initialized onClick event too)
            e.stopPropagation();

            toggleModal("navigationSearch", { navigationSearchData: data });
          }}
        />
      </SearchBTN>
    </div>
  );
};

export default NavigationSearch;
