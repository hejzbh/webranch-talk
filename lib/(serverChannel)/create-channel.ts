// Prisma
import { ServerChannel, ServerChannelType } from "@prisma/client";
// NPM
import axios from "axios";

export const createServerChannel = async function ({
  serverID,
  channelData,
}: {
  serverID: string;
  channelData: { name: string; type: ServerChannelType };
}) {
  try {
    // 1)
    const response = await axios.post(
      `/api/servers/${serverID}/channels`,
      channelData
    );
    // 2)
    if (!response.data) throw new Error("");
    // 3)
    return response.data as ServerChannel;
  } catch (err: any) {
    throw new Error(err?.response?.data || err?.message);
  }
};
