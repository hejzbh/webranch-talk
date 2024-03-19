import React from "react";
// Next
import dynamic from "next/dynamic";
// Icons
import { EllipsisVertical, Check } from "lucide-react";
// Prisma
import { Account, ServerRole } from "@prisma/client";
// TS
import { ServerMemberWithAccount } from "@/ts/types";
// Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from "@/components/ui/DropdownMenu";
import { memberRoleColor } from "./ServerMember";
import { memberHasServerRole } from "@/lib/utils";
const RequireServerRoles = dynamic(
  () => import("@/components/server/RequireServerRoles")
);

// Props
interface MemberOptionsProps {
  member: ServerMemberWithAccount;
  currentAccount: Account;
  currentAccountAsMember: ServerMemberWithAccount;
  className?: string;
}

const MemberOptions = ({
  member,
  className = "",
  currentAccount,
  currentAccountAsMember,
}: MemberOptionsProps) => {
  const isCurrentAccountOwner =
    currentAccountAsMember.role === ServerRole.OWNER;

  const isCurrentAccountAdmin =
    isCurrentAccountOwner || currentAccountAsMember.role === ServerRole.ADMIN;

  const isCurrentAccountModerator =
    currentAccountAsMember.role === ServerRole.MODERATOR;

  const memberIsNotAdmin =
    member.role !== ServerRole.ADMIN && member.role !== ServerRole.OWNER;

  const canDoProtectedStuff = isCurrentAccountOwner
    ? true
    : isCurrentAccountAdmin && memberIsNotAdmin;

  const canKick =
    canDoProtectedStuff || (memberIsNotAdmin && isCurrentAccountModerator);

  return (
    <div className={className}>
      <DropdownMenu>
        {/** Trigger */}
        <DropdownMenuTrigger>
          <EllipsisVertical className="w-5 h-5" />
        </DropdownMenuTrigger>
        {/** Options */}
        <DropdownMenuContent className="w-56 p-3 text-xs font-medium text-neutral-400 space-y-[2px] bg-[#0C0A09] border-none mr-5">
          {/** Change role (Required roles needed) */}
          {canDoProtectedStuff && (
            <RequireServerRoles
              requiredServerRoles={[
                ServerRole.ADMIN,
                ServerRole.OWNER,
                ServerRole.MODERATOR,
              ]}
              member={currentAccountAsMember as ServerMemberWithAccount}
              currentAccount={currentAccount}
            >
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="px-3 py-2 text-md cursor-pointer flex items-center justify-between">
                  <span>Role</span>
                </DropdownMenuSubTrigger>

                <DropdownMenuSubContent>
                  {/** Only owner and admin can add ADMIN role to the user */}

                  <RequireServerRoles
                    requiredServerRoles={[ServerRole.ADMIN, ServerRole.OWNER]}
                    member={currentAccountAsMember as ServerMemberWithAccount}
                    currentAccount={currentAccount}
                  >
                    {" "}
                    <DropdownMenuItem
                      className={`px-3 py-2 text-md cursor-pointer flex items-center ${memberRoleColor.ADMIN}`}
                    >
                      {memberHasServerRole({
                        member,
                        role: ServerRole.ADMIN,
                      }) && <Check className="w-4 h-4 text-green-400 mr-1" />}
                      {ServerRole.ADMIN}
                    </DropdownMenuItem>
                  </RequireServerRoles>

                  <DropdownMenuItem
                    className={`px-3 py-2 text-md cursor-pointer flex items-center ${memberRoleColor.MODERATOR}`}
                  >
                    {" "}
                    {memberHasServerRole({
                      member,
                      role: ServerRole.MODERATOR,
                    }) && <Check className="w-4 h-4 text-green-400 mr-1" />}
                    {ServerRole.MODERATOR}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`px-3 py-2 text-md cursor-pointer flex items-center ${memberRoleColor.GUEST}`}
                  >
                    {memberHasServerRole({
                      member,
                      role: ServerRole.GUEST,
                    }) && <Check className="w-4 h-4 text-green-400 mr-1" />}
                    {ServerRole.GUEST}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </RequireServerRoles>
          )}
          {/** Message */}
          <DropdownMenuItem className="px-3 py-2 text-md cursor-pointer flex items-center justify-between">
            Send message
          </DropdownMenuItem>
          {/** Kick */}
          {canKick && (
            <RequireServerRoles
              requiredServerRoles={[
                ServerRole.ADMIN,
                ServerRole.OWNER,
                ServerRole.MODERATOR,
              ]}
              member={currentAccountAsMember as ServerMemberWithAccount}
              currentAccount={currentAccount}
            >
              <DropdownMenuItem className="px-3 py-2 text-md cursor-pointer flex items-center justify-between !text-danger">
                Kick
              </DropdownMenuItem>
            </RequireServerRoles>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MemberOptions;
