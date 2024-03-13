// Clerk
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
// Lib
import { getCurrentAccount } from "./current-account";
import { createAccount } from "./create-account";

export const initialAccount = async function () {
  // 1)
  const currentLoggedInUser = await currentUser();
  // 2)
  if (!currentLoggedInUser) return redirectToSignIn();
  // 3)
  const account = await getCurrentAccount(currentLoggedInUser.id);
  // 4)
  if (account) return account;
  // 5)
  const newAccount = await createAccount({
    userId: currentLoggedInUser.id,
    name: currentLoggedInUser.username || currentLoggedInUser.firstName || "",
    email: currentLoggedInUser.emailAddresses[0]?.emailAddress || "",
    imageURL: currentLoggedInUser.imageUrl || "/images/default/avatar.webp",
    birthday: currentLoggedInUser.birthday,
  });
  // 6)
  if (!newAccount) throw new Error("Account cannot be created");
  // 7)
  return newAccount;
};
