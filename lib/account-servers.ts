// CLerk
import { redirectToSignIn } from "@clerk/nextjs";
// Lib
import { getCurrentAccount } from "./current-account";
import { db } from "./db";

export const getAccountServers = async function (paramAccountID?: string) {
  try {
    // 1)
    let accountID =
      paramAccountID || (await getCurrentAccount().then((res) => res?.id));

    // 2)
    if (!accountID) return redirectToSignIn();

    // 3)
    const servers = await db.server.findMany({
      where: {
        members: {
          some: {
            accountID,
          },
        },
      },
    });

    // 4)
    return servers;
  } catch {
    throw new Error("Servers cannot be found");
  }
};
