// Lib
import { getCurrentAccount } from "./current-account";
import { db } from "./db";

export const getServerDetails = async (serverID: string, include = {}) => {
  try {
    // 1) Current logged in account
    const account = await getCurrentAccount();
    // 2)
    const server = await db.server.findUnique({
      where: {
        id: serverID,
        members: {
          some: {
            accountID: account?.id,
          },
        },
      },
      include,
    });
    // 3)
    return server;
  } catch {
    return null;
  }
};
