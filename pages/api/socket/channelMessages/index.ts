// Next
import { NextApiRequest } from "next";
// TS
import { DetailedServerChannel, NextApiSocketResponse } from "@/ts/types";
// Lib
import { getCurrentAccountReq } from "@/lib/(account)/current-account-req";
import { db } from "@/lib/db";
// Constants
import { UNAUTHORIZED_ERROR } from "@/constants/errorMessages";
import { newChannelMessageKey } from "@/lib/(socket-keys)/channelNewMessageKey";

export default async function handler(
  req: NextApiRequest,
  res: NextApiSocketResponse
) {
  try {
    // 1)
    const methodsFN = {
      POST: sendChannelMessage,
      GET: getChannelMessages,
      undefined: null,
    };

    // 2)
    const fn = methodsFN[req.method as "POST" | "GET"];

    // 2)
    if (!fn) throw new Error("Method is not allowed");

    // 3)
    return await fn(req, res);
  } catch (err: any) {
    return res.status(500).json({ error: "[CHANNEL_MESSAGES] " + err.message });
  }
}

async function sendChannelMessage(
  req: NextApiRequest,
  res: NextApiSocketResponse
) {
  try {
    // 1)
    const { message, channelID } = req.body;

    // 2)
    if (!message || !channelID) throw new Error("Missing message data");

    // 3)
    const currentAccount = await getCurrentAccountReq(req);

    // 4)
    if (!currentAccount) throw new Error(UNAUTHORIZED_ERROR);

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
      throw new Error(
        "Channel does not exists or you are not member in channel's server"
      );

    // 7)
    const sender = (channel as DetailedServerChannel)?.server?.members?.find(
      (member) => member.accountID === currentAccount.id
    );

    // 8)
    if (!sender) throw new Error("Problem with sender data");

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
    res.socket.server.io.emit(newChannelMessageKey(channelID), newMessage);

    // 7)
    return res.status(200).json(newMessage);
  } catch (err: any) {
    // Handling errors
    throw new Error(err.message);
  }
}

async function getChannelMessages(
  req: NextApiRequest,
  res: NextApiSocketResponse
) {
  try {
    // 1)
    const { channelID, cursor, page } = req.query as {
      channelID: string;
      cursor: string;
      page: string;
    };

    // 2)
    if (!channelID) throw new Error("Channel ID is missing");

    // 3)
    const hasCursor = cursor && cursor?.length > 3 && cursor !== "undefined";

    // 3)
    const currentAccount = await getCurrentAccountReq(req);

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
      throw new Error(
        "Channel does not exists or you are not member in channel's server"
      );

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

    const hasNextPage = +page < totalPages;

    const nextCursor = messages[perPage - skip]?.id ?? null;

    // 7)
    return res.status(200).json({
      messages: messages.sort((a: any, b: any) => a.createdAt - b.createdAt),
      nextCursor,
      hasNextPage,
      totalPages,
      page,
    });
  } catch (err: any) {
    // Handling errors
    throw new Error(err.message);
  }
}
