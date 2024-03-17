import {
  Account,
  ApplicationRole,
  ServerMember,
  ServerRole,
} from "@prisma/client";
import React from "react";
// Props
interface RequireServerRolesProps {
  currentAccount: Account;
  member: ServerMember;
  requiredServerRoles?: ServerRole[];
  children: React.ReactNode;
  hideFromOwner?: boolean;
}
const RequireServerRoles = ({
  requiredServerRoles = [],
  currentAccount,
  member,
  children,
  hideFromOwner,
}: RequireServerRolesProps) => {
  if (hideFromOwner && member.role === ServerRole.OWNER) return null;

  // 1) Return content if there are no required roles of current user is ADMIN on entire application
  if (
    !requiredServerRoles?.length ||
    currentAccount.appRole === ApplicationRole.ADMIN
  )
    return children;

  // 2)
  if (!currentAccount || !member) return null;

  // 3)
  if (requiredServerRoles.indexOf(member.role) !== -1) return children;

  // 4)
  return null;
};

export default RequireServerRoles;
