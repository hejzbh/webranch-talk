import {
  UNAUTHORIZED_ERROR,
  USE_INVITE_CODE_ERROR,
  USE_INVITE_CODE_MISSING_ERROR,
} from "@/constants/errorMessages";
import { getCurrentAccount } from "@/lib/(account)/current-account";
import { newServerMember } from "@/lib/(serverMember)/new-server-member";
import { db } from "@/lib/db";
import { Account } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1) Extracting inviteCode from request body
    const { inviteCode } = await req.json();
    // 2) Checking if code is missing
    if (!inviteCode)
      return new NextResponse(USE_INVITE_CODE_MISSING_ERROR, { status: 400 });

    // 3) Getting current account
    const currentAccount: Account = await getCurrentAccount();

    // 4) Checking if account is not found
    if (!currentAccount)
      return new NextResponse(UNAUTHORIZED_ERROR, { status: 401 });

    // 5) Joining in server
    const joinedServer = await db.server.update({
      where: {
        inviteCode,
        members: {
          some: {
            NOT: {
              accountID: currentAccount.id,
            },
          },
        },
      },
      data: {
        members: {
          create: [newServerMember(currentAccount.id)],
        },
      },
    });

    // 6)
    return NextResponse.json(joinedServer);
  } catch (err: any) {
    // Handling errors
    return new NextResponse(
      err.message?.length < 20 ? err.message : USE_INVITE_CODE_ERROR,
      { status: 400 }
    );
  }
}
