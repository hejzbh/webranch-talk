import { NextResponse } from "next/server";
// Lib
import { db } from "@/lib/db";
import { getCurrentAccount } from "@/lib/(account)/current-account";
// Constants
import { UNAUTHORIZED_ERROR } from "@/constants/errorMessages";
import { Account, ServerRole } from "@prisma/client";

export async function DELETE(
  req: Request,
  { params }: { params: { serverID: string; channelID: string } }
) {
  try {
    // 1)
    const currentAccount: Account = await getCurrentAccount();

    // 2)
    if (!currentAccount) throw new Error(UNAUTHORIZED_ERROR);

    // 3)
    const channel = await db.serverChannel.delete({
      where: {
        serverID: params.serverID,
        id: params.channelID,
        server: {
          members: {
            some: {
              accountID: currentAccount.id,
            },
          },
        },
        OR: [
          // If user is admin/moderator/admin
          {
            server: {
              members: {
                some: {
                  accountID: currentAccount.id,
                  role: {
                    in: [
                      ServerRole.ADMIN,
                      ServerRole.MODERATOR,
                      ServerRole.OWNER,
                    ],
                  },
                },
              },
            },
          },
          // Or, if user is author of channel
          {
            authorID: currentAccount.id,
          },
        ],
      },
    });

    return NextResponse.json(channel);
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 400,
    });
  }
}
