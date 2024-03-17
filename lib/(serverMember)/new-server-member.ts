import { ServerRole } from "@prisma/client";

export const newServerMember = (accountID: string) => ({
  accountID,
  role: ServerRole.GUEST,
});
