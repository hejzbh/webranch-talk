import { NextResponse } from "next/server";
// Lib
import { db } from "@/lib/db";
import { getCurrentAccount } from "@/lib/(account)/current-account";
// Constants
import { UNAUTHORIZED_ERROR } from "@/constants/errorMessages";
import { Account } from "@prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: { serverID: string } }
) {
  try {
    // 1)
    const currentAccount: Account = await getCurrentAccount();

    // 2)
    if (!currentAccount) throw new Error(UNAUTHORIZED_ERROR);

    // 3)
    const server = await db.server.update({
      where: {
        id: params.serverID,
        ownerID: {
          not: currentAccount.id, // Owner cant leave his own server, he only can delete entire server
        },
        members: {
          some: {
            accountID: currentAccount.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            accountID: currentAccount.id,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 400,
    });
  }
}
