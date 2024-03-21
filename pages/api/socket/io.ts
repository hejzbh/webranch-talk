// Next
import { NextApiRequest } from "next";
// TS
import { NextApiSocketResponse } from "@/ts/types";
// NPM
import { Server } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiSocketResponse
) {
  // Socket IO is already set up
  if (res.socket.server.io)
    return res.json({ message: "Socket server already running" });

  const path = `/api/socket/io`;
  const httpServer: any = res.socket.server;

  const serverIO = new Server(httpServer, {
    path,
    addTrailingSlash: false,
  });

  res.socket.server.io = serverIO;

  res.end();
}
