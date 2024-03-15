import React, { useMemo } from "react";
// Next
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
// TS
import { NavigationSearchItem, NavigationSearchType } from "@/ts/types";
// Components
const RequireRoles = dynamic(() => import("@/components/auth/RequireRoles"));

// Interface
interface NavigationSearchModalProps {}

const NavigationSearchModal = ({}: NavigationSearchModalProps) => {
  const { type, isOpen, onClose, data } = useModalControl();

  const nonEmptyData = useMemo(
    () => data?.navigationSearchData?.filter((data) => data?.items?.length),
    [data]
  );

  const router = useRouter();

  const isModalOpen = isOpen && type === "navigationSearch";

  const getPlaceholder = () =>
    `Search over ${nonEmptyData?.map((data) => data.type).join(", ")}...`;

  const onItemSelect = (
    type: NavigationSearchType,
    item: NavigationSearchItem
  ) => {
    // 1)
    const fn = {
      servers: () => router.push(`/servers/${item.id}/`),
      users: () => router.push(`/inbox/${item.id}`),
    };
    // 2)
    fn[type]?.call(type);
    // 3)
    onClose();
  };

  if (!isModalOpen) return null;

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
          <RequireRoles key={label} requiredRoles={requiredRoles}>
            <CommandGroup key={type} heading={label}>
              {items?.map((item) => (
                <CommandItem
                  onSelect={() => onItemSelect(type, item)}
                  className="cursor-pointer"
                  key={item.id}
                >
                  {item.imageURL && (
                    <Image
                      loading="lazy"
                      src={item.imageURL}
                      alt={`Item image`}
                      width={28}
                      height={28}
                      className="rounded-full w-7 h-7 object-cover mr-2"
                    />
                  )}
                  {item.name}
                </CommandItem>
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
