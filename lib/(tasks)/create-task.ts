// NPM
import { Task } from "@prisma/client";
import axios from "axios";

export const createTask = async ({
  data,
  channelID,
}: {
  data: { name: string; content: string };
  channelID: string;
}) => {
  try {
    // 1)
    const response = await axios.post(
      `/api/servers/id/channels/${channelID}/tasks`,
      data
    );
    // 2)
    if (!response.data) throw new Error("");
    // 3)
    return response.data as Task;
  } catch (err: any) {
    throw new Error(err?.response?.data || err?.message);
  }
};
