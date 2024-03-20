// Prisma & TS
import { ServerMemberWithAccount } from "@/ts/types";
import { ServerMember } from "@prisma/client";
// NPM
import axios from "axios";

export const kickServerMember = async function ({
  member,
}: {
  member: ServerMember | ServerMemberWithAccount;
}) {
  try {
    // 2)
    const response: { data: ServerMember } = await axios.delete(
      `/api/servers/${member.serverID}/members/${member.id}/kick`
    );
    // 3)
    if (!response.data.id) throw new Error("Something went wrong");
    // 4)
    return true;
  } catch (err: any) {
    throw new Error(err?.response?.data || err?.message);
  }
};
