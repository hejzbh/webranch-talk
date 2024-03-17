// NPM
import axios from "axios";
// Constants (ERORRs)
import {
  USE_INVITE_CODE_ERROR,
  USE_INVITE_CODE_MISSING_ERROR,
} from "@/constants/errorMessages";
import { Server } from "@prisma/client";

export const useServerInviteCode = async function (inviteCode: string) {
  try {
    // 1)
    if (!inviteCode) throw new Error(USE_INVITE_CODE_MISSING_ERROR);

    // 2)
    const response = await axios.post(`/api/servers/invite/${inviteCode}`, {
      inviteCode,
    });

    // 3)
    const joinedServer = response.data?.id && response.data;

    // 4)
    if (!joinedServer) throw new Error(USE_INVITE_CODE_ERROR);

    // 5)
    return joinedServer as Server;
  } catch (err: any) {
    throw new Error(err?.response?.data || err?.message);
  }
};
