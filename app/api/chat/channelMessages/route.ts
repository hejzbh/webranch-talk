// Next
import { NextRequest, NextResponse } from "next/server";
// TS
import { DetailedServerChannel } from "@/ts/types";
// Lib
import { getCurrentAccount } from "@/lib/(account)/current-account";
import {
  newChannelMessageKey,
  channelChatKey,
} from "@/lib/(pusher-keys)/(channelChat)";
import { db } from "@/lib/db";
import { getPusherInstance } from "@/lib/pusher/server";
// Constants
import { UNAUTHORIZED_ERROR } from "@/constants/errorMessages";

const pusherServer = getPusherInstance();

export async function POST(req: NextRequest) {
  try {
    // 1)
    const { message, channelID } = await req.json();

    // 2)
    if (!message || !channelID)
      return new NextResponse("Missing message data", { status: 400 });

    // 3)
    const currentAccount = await getCurrentAccount();

    // 4)
    if (!currentAccount)
      return new NextResponse(UNAUTHORIZED_ERROR, { status: 401 });

    // 5)
    const channel: DetailedServerChannel | any =
      await db.serverChannel.findFirst({
        where: {
          id: channelID,
          server: {
            members: {
              some: {
                accountID: currentAccount.id,
              },
            },
          },
        },
        include: {
          server: {
            include: {
              members: {
                include: {
                  account: true,
                },
              },
            },
          },
        },
      });

    // 6)
    if (!channel)
      return new NextResponse("Channel doesnt exists or something went wrong", {
        status: 400,
      });

    //
    // 7)
    const sender = (channel as DetailedServerChannel)?.server?.members?.find(
      (member) => member.accountID === currentAccount.id
    );

    // 8)
    if (!sender)
      return new NextResponse("Problem with sender data", { status: 400 });

    // 5)
    const newMessage = await db.channelMessage.create({
      data: {
        channelID,
        senderID: sender?.id,
        content: message,
      },
      include: {
        sender: {
          include: {
            account: true,
          },
        },
      },
    });

    // 6)
    await pusherServer.trigger(
      channelChatKey(channelID),
      newChannelMessageKey(channelID),
      newMessage
    );

    // 7)
    return NextResponse.json(newMessage);
  } catch (err: any) {
    // Handling errors
    return new NextResponse(err.message, {
      status: 400,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    // 1)

    const channelID = req.nextUrl.searchParams.get("channelID");
    const cursor = req.nextUrl.searchParams.get("cursor");
    const page = req.nextUrl.searchParams.get("page");

    // 2)
    if (!channelID)
      return new NextResponse("Channel ID is missing", { status: 400 });

    // 3)
    const hasCursor = cursor && cursor?.length > 3 && cursor !== "undefined";

    // 3)
    const currentAccount = await getCurrentAccount();

    // 4)
    if (!currentAccount) throw new Error(UNAUTHORIZED_ERROR);

    // 5)
    const channel: DetailedServerChannel | any =
      await db.serverChannel.findFirst({
        where: {
          id: channelID as string,
          server: {
            members: {
              some: {
                accountID: currentAccount.id,
              },
            },
          },
        },
      });

    // 6)
    if (!channel)
      return new NextResponse("Channel doesnt exists or you are not member", {
        status: 400,
      });

    const skip = 1;
    const perPage = 15;

    // 5) DB
    const messages = await db.channelMessage.findMany({
      ...(hasCursor
        ? {
            skip,
            cursor: {
              id: cursor,
            },
          }
        : {}),
      where: {
        channelID,
      },
      include: {
        sender: {
          include: {
            account: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: perPage,
    });

    const totalMessages = await db.channelMessage.count({
      where: { channelID },
    });

    const totalPages = Math.ceil(totalMessages / perPage);

    const hasNextPage = +(page || 1) < totalPages;

    const nextCursor = messages[perPage - skip]?.id ?? null;

    // 7)
    return NextResponse.json({
      messages: messages.sort((a: any, b: any) => a.createdAt - b.createdAt),
      nextCursor,
      hasNextPage,
      totalPages,
      page,
    });
  } catch (err: any) {
    // Handling errors
    return new NextResponse(err.message, {
      status: 400,
    });
  }
}
