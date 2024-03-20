// NPM
import axios from "axios";
// Prisma
import { Server } from "@prisma/client";

export const leaveServer = async (server: Server) => {
  try {
    // 1)
    if (!server) throw new Error("Missing server data");
    // 2)
    const response = await axios.patch(`/api/servers/${server.id}/leave`);
    // 3)
    if (!response.data) throw new Error("Something went wrong");
    // 4)
    return true;
  } catch (err: any) {
    // Handling errors
    throw new Error(err?.response?.data || err?.message);
  }
};
