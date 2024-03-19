import React, { useMemo } from "react";
// Next
import Image from "next/image";
// Components
import { useModalControl } from "../providers/ModalProvider";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
} from "@/components/ui/Command";
import { ServerMember } from "@/components/server/ServerMember";
// TS
import { DetailedServer } from "@/ts/types";

const ServerMembersModal = () => {
  const { type, isOpen, onClose, data } = useModalControl();

  const isModalOpen = isOpen && type === "serverMembers";

  const server = useMemo(() => data?.server as DetailedServer, [data?.server]);

  if (!isModalOpen) return null;

  return (
    <CommandDialog open={isModalOpen} onOpenChange={onClose}>
      {/** Placeholder */}
      <CommandInput placeholder={`Search ${data?.server?.name} members`} />
      {/** List */}
      <CommandList>
        {/** In case there are no results */}
        <CommandEmpty>No members found.</CommandEmpty>
        {/** Members list */}
        <CommandGroup className="mt-3">
          {server?.members?.map((member) => (
            <CommandItem className="!bg-transparent" key={member.id}>
              <ServerMember member={member} server={server} />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default ServerMembersModal;
