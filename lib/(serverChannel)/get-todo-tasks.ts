import { UNAUTHORIZED_ERROR } from "@/constants/errorMessages";
import { getCurrentAccount } from "../(account)/current-account";
import { db } from "../db";
import { Task } from "@prisma/client";

export const getTodoTasks = async (channelID: string) => {
  try {
    // 1)
    const account = await getCurrentAccount();
    // 2)
    if (!account) throw new Error(UNAUTHORIZED_ERROR);
    // 3)
    const tasks: Task[] = await db.task.findMany({
      where: {
        authorID: account.id,
        channelID,
      },
      include: {
        author: true,
      },
    });
    // 4)
    return tasks;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
