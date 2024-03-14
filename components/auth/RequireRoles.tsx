"use client";
import React from "react";
// Prisma
import { ApplicationRole } from "@prisma/client";
// Components / Providres
import { useCurrentAccount } from "../providers/CurrentAccountProvider";

// Props
interface RequireRolesProps {
  children: React.ReactNode;
  requiredRoles?: ApplicationRole[];
  oneOfRoles?: ApplicationRole[];
}

const findRole = (rolesList: ApplicationRole[], role: ApplicationRole) =>
  rolesList.find((userRole) => userRole === role);

function hasRoles(
  userRoles: ApplicationRole[],
  requiredRoles: ApplicationRole[]
): boolean {
  return requiredRoles.reduce(
    (acc, role) => acc && !!findRole(userRoles, role),
    true
  );
}

function hasOneOfRoles(
  userRoles: ApplicationRole[],
  givenRoles: ApplicationRole[]
): boolean {
  return givenRoles.some((role) => !!findRole(userRoles, role));
}

const RequireRoles = ({
  children,
  requiredRoles,
  oneOfRoles,
}: RequireRolesProps) => {
  const currentAcc = useCurrentAccount();

  if (currentAcc.appRole === ApplicationRole.ADMIN) return children;

  // 1)
  if (!currentAcc) return null;

  // 2)
  if (requiredRoles && hasRoles([currentAcc.appRole], requiredRoles))
    return children;

  // 3)
  if (oneOfRoles && hasOneOfRoles([currentAcc.appRole], oneOfRoles))
    return children;

  // 4)
  return null;
};

export default RequireRoles;
