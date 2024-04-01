// Lib
import { db } from "@/lib/db";
import { getCurrentAccount } from "@/lib/(account)/current-account";
// Constants
import { UNAUTHORIZED_ERROR } from "@/constants/errorMessages";
// Prisma
import { Account } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  res: { params: { serverID: string; channelID: string } }
) {
  try {
    // 1) Extracting name and content from request body
    const { name, content } = await req.json();

    // 2) Checking if name or content is missing
    if (!name || !content)
      return new NextResponse("Data is missing", {
        status: 400,
      });

    // 3)

    const { channelID } = res.params;

    // 4)
    if (!channelID)
      return new NextResponse("Channel ID is missing", {
        status: 400,
      });

    // 5)
    const currentAccount: Account = await getCurrentAccount();

    // 6)
    if (!currentAccount) throw new Error(UNAUTHORIZED_ERROR);

    // 7)
    const task = await db.task.create({
      data: {
        channelID,
        name,
        content,
        authorID: currentAccount?.id,
      },
    });

    // 8)
    return Response.json(task);
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 400,
    });
  }
}
