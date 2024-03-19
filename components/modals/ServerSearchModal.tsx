import React, { useMemo } from "react";
// Next
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
import { ServerSearchItem, ServerSearchType } from "@/ts/types";
// Lib
import { channelRoute } from "@/lib/(routes)/channel-route";
// Prisma / TS
import { ServerChannelType } from "@prisma/client";

const ServerSearchModal = () => {
  const { type, isOpen, onClose, data } = useModalControl();

  const nonEmptyData = useMemo(
    () => data?.serverSearchData?.filter((data) => data?.items?.length),
    [data]
  );

  const router = useRouter();

  const isModalOpen = isOpen && type === "serverSearch";

  const onItemSelect = (type: ServerSearchType, item: ServerSearchItem) => {
    // 1)
    const fn = {
      members: () => {
        alert("TODO: ServerSearchModal");
      },
      channels: () =>
        router.push(
          channelRoute({
            serverID: item.serverID,
            channelID: item.id,
            channelType: item.type as ServerChannelType,
          })
        ),
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
      <CommandInput placeholder={"Search over channels & members"} />
      {/** List */}
      <CommandList>
        {/** In case there are no results */}
        <CommandEmpty>No results found.</CommandEmpty>
        {/** Data */}
        {nonEmptyData?.map(({ label, type, items }) => (
          /** TODO: Insert require server role */
          <CommandGroup key={type} heading={label}>
            {items?.map((item) => (
              <CommandItem
                onSelect={() => onItemSelect(type, item)}
                className="cursor-pointer"
                key={item.id}
              >
                {item.icon && item.icon}
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

                <p className=" text-sm sm:text-md">{item.name}</p>
              </CommandItem>
            ))}
            <CommandSeparator />
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
};

export default ServerSearchModal;
