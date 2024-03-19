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
        return (
          <li key={member.id}>
            <ServerMember member={member} server={server} />
          </li>
        );
      })}
    </ul>
  );
};

export const ServerMember = ({
  member,
  server,
}: {
  server: DetailedServer | Server;
  member: ServerMemberWithAccount;
}) => {
  //
  const isOwner = isMemberServerOwner({
    member,
    server,
  });

  return (
    <div
      className={`flex items-center space-x-2 ${memberRoleColor[member.role]}`}
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
    </div>
  );
};

export default ServerMembers;
