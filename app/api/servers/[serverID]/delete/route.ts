import { NextResponse } from "next/server";
// Lib
import { db } from "@/lib/db";
import { getCurrentAccount } from "@/lib/(account)/current-account";
// Constants
import { UNAUTHORIZED_ERROR } from "@/constants/errorMessages";
import { Account, ApplicationRole } from "@prisma/client";

export async function DELETE(
  req: Request,
  { params }: { params: { serverID: string } }
) {
  try {
    // 1)
    const currentAccount: Account = await getCurrentAccount();

    // 2)
    if (!currentAccount) throw new Error(UNAUTHORIZED_ERROR);

    // 3)
    const server = await db.server.delete({
      where: {
        id: params.serverID,

        OR: [
          // If user is owner of this server
          { ownerID: currentAccount.id },
          // Of user is admin of complete application Webranch talk
          {
            members: {
              some: {
                account: {
                  id: currentAccount.id,
                  appRole: ApplicationRole.ADMIN,
                },
              },
            },
          },
        ],
      },
    });

    return NextResponse.json(server);
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 400,
    });
  }
}
