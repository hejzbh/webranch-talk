import { db } from "./db";

export const getAllUsers = async (accountId?: string) => {
  try {
    const users = await db.account.findMany({
      where: {
        id: {
          not: accountId,
        },
      },
    });
    return users;
  } catch {
    return [];
  }
};
