// Clerk
import { redirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

export const getCurrentAccount = async function (paramUserId?: string) {
  // 1)
  const { userId } = paramUserId ? { userId: paramUserId } : auth();
  // 2)
  if (!userId) return redirectToSignIn();
  // 3)
  const account = db.account.findUnique({ where: { userId } });
  // 4)
  if (!account) return redirectToSignIn();
  // 5)
  return account;
};
