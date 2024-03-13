// Lib
import { initialAccount } from "@/lib/initial-account";
import { getInitialRedirectLink } from "@/lib/initial-redirect-link";
// TS
import { Account } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function InitialPage() {
  const account: Account = await initialAccount();

  const redirectLink: string = await getInitialRedirectLink(account);

  if (redirectLink) return redirect(redirectLink);

  return null;
}
