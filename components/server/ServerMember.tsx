"use client";

// Next
import dynamic from "next/dynamic";
// Prisma & Types
import { DetailedServer, ServerMemberWithAccount } from "@/ts/types";
import { ServerRole } from "@prisma/client";
// Lib
import { cn, isMemberServerOwner } from "@/lib/utils";
// Constants
import { OwnerIcon } from "@/constants/icons";
// Components
import { useCurrentAccount } from "../providers/CurrentAccountProvider";
const UserAvatar = dynamic(() => import("@/components/ui/UserAvatar"));
const MemberOptions = dynamic(
  () => import("@/components/server/MemberOptions")
);

export const memberRoleColor = {
  [ServerRole.OWNER]: "text-owner",
  [ServerRole.ADMIN]: "text-admin",
  [ServerRole.MODERATOR]: "text-moderator",
  [ServerRole.GUEST]: "text-guest",
};

export const ServerMember = ({
  member,
  server,
}: {
  server: DetailedServer;
  member: ServerMemberWithAccount;
}) => {
  const currentAccount = useCurrentAccount();
  const currentAccountAsMember = (server as DetailedServer).members.find(
    (member) => member.accountID === currentAccount.id
  );
  //
  const isOwner = isMemberServerOwner({
    member,
    server,
  });

  return (
    <div
      className={`flex w-full items-center space-x-2 group ${
        memberRoleColor[member.role]
      }`}
    >
      {/** Avatar */}
      <UserAvatar imageURL={member.account?.imageURL} />
      {/** Name  & Options? */}
      <p
        className={cn(
          "text-sm md:text-md flex items-center justify-between w-full"
        )}
      >
        <div className={cn(isOwner && "flex items-center justify-between")}>
          {" "}
          {member?.account?.name}{" "}
          {isOwner && <OwnerIcon size={15} className="ml-2" />}
        </div>
        {/** Options?   */}
        {member.id !== currentAccountAsMember?.id && (
          <MemberOptions
            currentAccount={currentAccount}
            currentAccountAsMember={
              currentAccountAsMember as ServerMemberWithAccount
            }
            className="lg:opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"
            member={member}
          />
        )}
      </p>
    </div>
  );
};

export default ServerMember;
