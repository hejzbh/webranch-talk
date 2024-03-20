import { NextResponse } from "next/server";
// Lib
import { db } from "@/lib/db";
import { getCurrentAccount } from "@/lib/(account)/current-account";
// Constants
import { UNAUTHORIZED_ERROR } from "@/constants/errorMessages";
import { Account } from "@prisma/client";

export async function DELETE(
  req: Request,
  { params }: { params: { serverID: string; memberID: string } }
) {
  try {
    // 1)
    const currentAccount: Account = await getCurrentAccount();

    // 2)
    if (!currentAccount) throw new Error(UNAUTHORIZED_ERROR);

    // 3)
    const member = await db.serverMember.delete({
      where: {
        serverID: params.serverID,
        id: params.memberID,
        accountID: {
          not: currentAccount.id,
        },
        server: {
          members: {
            some: {
              accountID: currentAccount.id,
            },
          },
          ownerID: {
            not: params.memberID,
          },
        },
      },
    });

    return NextResponse.json(member);
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 400,
    });
  }
}
