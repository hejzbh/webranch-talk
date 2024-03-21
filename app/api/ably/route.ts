import Ably from "ably/promises";
import { NextRequest } from "next/server";
// TS
import { NextAblyResponse } from "@/ts/types";

export async function GET(request: NextRequest, res: NextAblyResponse) {
  const ablySocket = new Ably.Realtime(process.env.ABLY_API_KEY!);
  const tokenRequestData = await ablySocket.auth.createTokenRequest({
    clientId: "ably-nextjs-demo",
  });

  res.ably = ablySocket;

  console.log(`Request: ${JSON.stringify(tokenRequestData)}`);
  return Response.json(tokenRequestData);
}
