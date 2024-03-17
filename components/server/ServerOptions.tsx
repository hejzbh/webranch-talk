"use client";

import React from "react";
// Icons
import { UserPlus, Plus, Users, LogOut, Trash, Settings } from "lucide-react";
// Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import RequireServerRoles from "./RequireServerRoles";
// TS
import { DetailedServer, ServerOption } from "@/ts/types";
// Prisma
import { Account, Server, ServerMember, ServerRole } from "@prisma/client";
import { useModalControl } from "../providers/ModalProvider";
// Lib
import { cn } from "@/lib/utils";

// Props
interface ServerOptionsProps {
  server: DetailedServer;
  currentAccount: Account;
}

function getServerOptions(server: DetailedServer | Server) {
  return [
    {
      name: "Invite People",
      data: { server },
      requiredRoles: [],
      modal: "serverInvite",
      Icon: UserPlus,
      className: "hover:!text-indigo-500 text-indigo-500",
    },
    {
      name: "Create Channel",
      data: { server },
      requiredRoles: [ServerRole.OWNER, ServerRole.ADMIN, ServerRole.MODERATOR],
      modal: "createServerChannel",
      Icon: Plus,
    },
    {
      name: "Manage Members",
      data: { server },
      requiredRoles: [ServerRole.OWNER, ServerRole.ADMIN, ServerRole.MODERATOR],
      modal: "serverMembers",
      Icon: Users,
    },
    {
      name: "Server Settings",
      Icon: Settings,
      modal: "serverSettings",
      data: { server },
      requiredRoles: [ServerRole.OWNER, ServerRole.ADMIN],
    },
    {
      name: "Leave Server",
      data: { server },
      requiredRoles: [], // Hiden from owner, owner cant leave his own server.
      hideFromOwner: true,
      Icon: LogOut,
      className: "text-danger hover:!text-danger",
    },
    {
      name: "Delete Server",
      data: { server },
      requiredRoles: [ServerRole.OWNER], // Hiden from owner, owner cant leave his own server.
      Icon: Trash,
      className: "text-danger hover:!text-danger",
    },
  ] as ServerOption[];
}

const ServerOptions = ({ server, currentAccount }: ServerOptionsProps) => {
  const serverOptionsList: ServerOption[] = getServerOptions(server);

  const { onOpen } = useModalControl();

  const accountAsServerMember = server.members.find(
    (member) => member.accountID === currentAccount?.id
  );

  return (
    <DropdownMenu>
      {/** Header (Trigger icon) */}
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button title="Options">
          <Settings />
        </button>
      </DropdownMenuTrigger>
      {/** Server options list (Opens after trigger being clicked) */}
      <DropdownMenuContent className="w-56 p-3 text-xs font-medium text-neutral-400 space-y-[2px] bg-[#0C0A09] border-none mr-3 mt-1">
        {serverOptionsList?.map((option, idx) => {
          const Icon = option.Icon;

          return (
            <RequireServerRoles
              key={idx}
              requiredServerRoles={option.requiredRoles}
              currentAccount={currentAccount}
              member={accountAsServerMember as ServerMember}
              hideFromOwner={option.hideFromOwner}
            >
              <DropdownMenuItem
                title={`Open modal for ${option.name}`}
                onClick={() =>
                  onOpen(option.modal, { server: option.data.server })
                }
                className={cn(
                  "px-3 py-2 text-sm cursor-pointer flex items-center justify-between",
                  option.className
                )}
              >
                <p>{option.name}</p>
                <Icon />
              </DropdownMenuItem>
            </RequireServerRoles>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerOptions;