// Clerk
import { getAuth } from "@clerk/nextjs/server";
// Next
import { NextApiRequest } from "next";
// Lib
import { db } from "../db";
// Prisma
import { Account } from "@prisma/client";

export const getCurrentAccountReq = async function (req: NextApiRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) throw new Error("");

    const account = await db.account.findUnique({
      where: {
        userId,
      },
    });

    if (!account) throw new Error("");

    return account as Account;
  } catch {
    throw new Error("Unauthorized");
  }
};
