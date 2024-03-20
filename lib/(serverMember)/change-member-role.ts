// Prisma & TS
import { ServerMemberWithAccount } from "@/ts/types";
import { ServerMember, ServerRole } from "@prisma/client";
// Consants
import { CHANGE_ROLE_MISSING_DATA_ERROR } from "@/constants/errorMessages";
// NPM
import axios from "axios";

export const changeMemberRole = async function ({
  member,
  role,
}: {
  member: ServerMember | ServerMemberWithAccount;
  role: ServerRole;
}) {
  try {
    // 1)
    if (!member || !role) throw new Error(CHANGE_ROLE_MISSING_DATA_ERROR);
    // 2)
    const response: { data: ServerMember } = await axios.patch(
      `/api/servers/${member.serverID}/members/${member.id}/updateRole`,
      { role }
    );
    // 3)
    if (!response.data.id) throw new Error("Something went wrong");
    // 4)
    return response.data as ServerMember;
  } catch (err: any) {
    throw new Error(err?.response?.data || err?.message);
  }
};
