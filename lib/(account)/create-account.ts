import { db } from "../db";

export const createAccount = async function (accountData: {
  userId: string;
  name: string;
  email: string;
  imageURL: string;
  birthday?: string;
}) {
  try {
    return await db.account.create({
      data: { ...accountData },
    });
  } catch {
    return null;
  }
};
