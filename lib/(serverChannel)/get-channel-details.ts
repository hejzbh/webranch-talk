import { getCurrentAccount } from "../(account)/current-account";
import { db } from "../db";

export const getChannelDetails = async ({
  channelID,
  serverID,
  include = {},
}: {
  channelID: string;
  serverID?: string;
  include?: any;
}) => {
  try {
    // 1)
    const account = await getCurrentAccount();
    // 2)
    if (!account) throw new Error("Unauthorized");
    // 3)
    const channel = await db.serverChannel.findFirst({
      where: {
        id: channelID,
        server: {
          members: {
            some: {
              accountID: account?.id,
            },
          },
        },
        ...(serverID ? { serverID } : {}),
      },
      include,
    });
    // 4)
    return channel;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
