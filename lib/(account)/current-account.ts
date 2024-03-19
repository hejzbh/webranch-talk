// Clerk
import { auth } from "@clerk/nextjs/server";
// Prisma
import { Account } from "@prisma/client";
// Lib
import { db } from "../db";
import { initialAccount } from "../initial-account";

let count = 0;

export const getCurrentAccount: any = async function (paramUserId?: string) {
  try {
    // 1)
    const { userId } = paramUserId ? { userId: paramUserId } : auth();
    // 2)
    if (!userId) throw new Error();
    // 3)
    const account = await db.account.findUnique({ where: { userId } });
    // 4)
    if (!account) {
      if (count < 1) {
        count++;
        await initialAccount({ ignoreCurrentAccount: true });

        return await getCurrentAccount(userId);
      } else throw new Error("");
    }

    // 5)
    return account as Account;
  } catch {
    throw new Error("Unauthorized");
  }
};
