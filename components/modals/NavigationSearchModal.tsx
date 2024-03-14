import React, { useMemo } from "react";
// Next
import dynamic from "next/dynamic";
// Components
import { useModalControl } from "../providers/ModalProvider";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/Command";
const RequireRoles = dynamic(() => import("@/components/auth/RequireRoles"));
// Interface
interface NavigationSearchModalProps {}

const NavigationSearchModal = ({}: NavigationSearchModalProps) => {
  const { type, isOpen, onClose, data } = useModalControl();

  const nonEmptyData = useMemo(
    () => data?.navigationSearchData?.filter((data) => data.items.length),
    [data]
  );

  const isModalOpen = isOpen && type === "navigationSearch";

  const getPlaceholder = () =>
    `Search over ${nonEmptyData?.map((data) => data.type).join(", ")}...`;

  return (
    <CommandDialog open={isModalOpen} onOpenChange={onClose}>
      {/** Placeholder */}
      <CommandInput placeholder={getPlaceholder()} />
      {/** List */}
      <CommandList>
        {/** In case there are no results */}
        <CommandEmpty>No results found.</CommandEmpty>
        {/** Data */}
        {nonEmptyData?.map(({ label, type, items, requiredRoles = [] }) => (
          <RequireRoles requiredRoles={requiredRoles}>
            <CommandGroup key={type} heading={label}>
              {items?.map((item) => (
                <CommandItem key={item.id}>{item.name}</CommandItem>
              ))}
              <CommandSeparator />
            </CommandGroup>
          </RequireRoles>
        ))}
      </CommandList>
    </CommandDialog>
  );
};

export default NavigationSearchModal;
