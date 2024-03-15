// Clerk
import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { Account } from "@prisma/client";

export const getCurrentAccount = async function (paramUserId?: string) {
  try {
    // 1)
    const { userId } = paramUserId ? { userId: paramUserId } : auth();
    // 2)
    if (!userId) throw new Error();
    // 3)
    const account = await db.account.findUnique({ where: { userId } });
    // 4)
    if (!account) throw new Error();
    // 5)
    return account as Account;
  } catch {
    throw new Error("Unauthorized");
  }
};
