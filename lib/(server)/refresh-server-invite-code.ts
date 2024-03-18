import { Server } from "@prisma/client";
import axios from "axios";

export const refreshServerInviteCode = async (inviteCode: string) => {
  try {
    // 1)
    if (!inviteCode) throw new Error("MISSING INVITE CODE");
    // 2)
    const response = await axios.patch(
      `/api/servers/invite/${inviteCode}/regenerate`,
      {
        inviteCode,
      }
    );
    // 3)
    const server: Server = response?.data;
    // 4)
    if (!server.id) throw new Error("Missing server data");
    // 5)
    return server;
  } catch (err: any) {
    throw new Error(err?.response?.data || err?.message);
  }
};
