import { NextResponse } from "next/server";
// Lib
import { db } from "@/lib/db";
import { getCurrentAccount } from "@/lib/(account)/current-account";
// Constants
import {
  CHANGE_ROLE_MISSING_DATA_ERROR,
  UNAUTHORIZED_ERROR,
} from "@/constants/errorMessages";
import { Account } from "@prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: { serverID: string; memberID: string } }
) {
  try {
    // 1)
    const { role } = await req.json();

    // 2)
    if (!role)
      return new NextResponse(CHANGE_ROLE_MISSING_DATA_ERROR, {
        status: 400,
      });

    // 3)
    const currentAccount: Account = await getCurrentAccount();

    // 4)
    if (!currentAccount) throw new Error(UNAUTHORIZED_ERROR);

    // 5)
    const member = await db.serverMember.update({
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
      data: {
        role,
      },
    });

    return NextResponse.json(member);
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 400,
    });
  }
}
