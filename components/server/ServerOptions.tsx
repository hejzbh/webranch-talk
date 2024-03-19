"use client";

import React from "react";
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
// Constants
import { modalIcons } from "@/constants/icons";
// Icons
import { Settings } from "lucide-react";

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
      modal: "invitePeople",
      Icon: modalIcons.invitePeople,
      className: "hover:!text-indigo-500 text-indigo-500",
    },
    {
      name: "Create Channel",
      data: { server },
      requiredRoles: [ServerRole.OWNER, ServerRole.ADMIN, ServerRole.MODERATOR],
      modal: "createServerChannel",
      Icon: modalIcons.createServerChannel,
    },
    {
      name: "Manage Members",
      data: { server },
      requiredRoles: [ServerRole.OWNER, ServerRole.ADMIN, ServerRole.MODERATOR],
      modal: "serverMembers",
      Icon: modalIcons.serverMembers,
    },
    {
      name: "Server Settings",
      Icon: modalIcons.serverSettings,
      modal: "serverSettings",
      data: { server },
      requiredRoles: [ServerRole.OWNER, ServerRole.ADMIN],
    },
    {
      name: "Leave Server",
      data: { server },
      modal: "leaveServer",
      requiredRoles: [], // Hiden from owner, owner cant leave his own server.
      hideFromOwner: true,
      Icon: modalIcons.leaveServer,
      className: "text-danger hover:!text-danger",
    },
    {
      name: "Delete Server",
      data: { server },
      modal: "deleteServer",
      requiredRoles: [ServerRole.OWNER], // Hiden from owner, owner cant leave his own server.
      Icon: modalIcons.deleteServer,
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
        <button title="Options" className="group">
          <Settings className="group-hover:text-actionHover transition-all duration-300 ease-in-out" />
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
                  "px-3 py-2 text-md cursor-pointer flex items-center justify-between",
                  option.className
                )}
              >
                <p>{option.name}</p>
                <Icon className="w-5 h-5" />
              </DropdownMenuItem>
            </RequireServerRoles>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerOptions;
