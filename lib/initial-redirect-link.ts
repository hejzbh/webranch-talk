// TS
import { Account } from "@prisma/client";
// Lib
import { getCurrentAccount } from "./current-account";
// Clerk
import { redirectToSignIn } from "@clerk/nextjs";

export const getInitialRedirectLink = async function (
  currentAccount?: Account
) {
  try {
    // 1)
    const account: Account = currentAccount || (await getCurrentAccount());
    // 2)
    if (!account) return redirectToSignIn();
    // 3)
    return account.lastVisitedServerId || "/welcome";
  } catch {
    return "/welcome";
  }
};
