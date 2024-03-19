import React from "react";
// Next
import dynamic from "next/dynamic";
// Prisma & Types
import { DetailedServer, ServerMemberWithAccount } from "@/ts/types";
import { Server, ServerRole } from "@prisma/client";
import { cn, isMemberServerOwner } from "@/lib/utils";
import { OwnerIcon } from "@/constants/icons";
// Components
const UserAvatar = dynamic(() => import("@/components/ui/UserAvatar"));

// Props
interface ServerMembersProps {
  members: ServerMemberWithAccount[];
  server: DetailedServer | Server;
}

const memberRoleColor = {
  [ServerRole.OWNER]: "text-owner",
  [ServerRole.ADMIN]: "text-admin",
  [ServerRole.MODERATOR]: "text-moderator",
  [ServerRole.GUEST]: "text-guest",
};

const ServerMembers = ({ members = [], server }: ServerMembersProps) => {
  // TODO: Naparaviti da se na klik vodi u inbox...

  return (
    <ul className="space-y-3">
      {members?.map((member) => {
        //
        const isOwner = isMemberServerOwner({
          member,
          server,
        });

        return (
          <li
            key={member.id}
            className={`flex items-center space-x-2 ${
              memberRoleColor[member.role]
            }`}
          >
            {/** Avatar */}
            <UserAvatar imageURL={member.account?.imageURL} />
            {/** Name */}
            <p
              className={cn(
                "text-sm",
                isOwner && "flex items-center justify-between"
              )}
            >
              {member?.account?.name}{" "}
              {isOwner && <OwnerIcon size={15} className="ml-2" />}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default ServerMembers;
