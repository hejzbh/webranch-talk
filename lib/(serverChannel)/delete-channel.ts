// NPM
import axios from "axios";
// Prisma
import { ServerChannel } from "@prisma/client";

export const deleteServerChannel = async (channel: ServerChannel) => {
  try {
    // 1)
    if (!channel) throw new Error("Missing channel data");
    // 2)
    const response = await axios.delete(
      `/api/servers/${channel.serverID}/channels/${channel.id}/delete`
    );
    // 3)
    if (!response.data) throw new Error("Something went wrong");
    // 4)
    return true;
  } catch (err: any) {
    // Handling errors
    throw new Error(err?.response?.data || err?.message);
  }
};
