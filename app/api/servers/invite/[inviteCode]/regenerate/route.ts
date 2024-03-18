import {
  UNAUTHORIZED_ERROR,
  REEGNERATE_INVITE_CODE_MISSING_ERROR,
  REEGNERATE_INVITE_CODE_ERROR,
} from "@/constants/errorMessages";
import { getCurrentAccount } from "@/lib/(account)/current-account";
import { db } from "@/lib/db";
import { Account } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function PATCH(req: Request) {
  try {
    // 1) Extracting inviteCode from request body
    const { inviteCode } = await req.json();
    // 2) Checking if code is missing
    if (!inviteCode)
      return new NextResponse(REEGNERATE_INVITE_CODE_MISSING_ERROR, {
        status: 400,
      });

    // 3) Getting current account
    const currentAccount: Account = await getCurrentAccount();

    // 4) Checking if account is not found
    if (!currentAccount)
      return new NextResponse(UNAUTHORIZED_ERROR, { status: 401 });

    // 5) Joining in server
    const updatedServer = await db.server.update({
      where: {
        inviteCode,
        members: {
          some: {
            accountID: currentAccount.id,
          },
        },
      },
      data: {
        inviteCode: `${uuid()}`,
      },
    });

    // 6)
    return NextResponse.json(updatedServer);
  } catch (err: any) {
    // Handling errors
    return new NextResponse(
      err.message?.length < 20 ? err.message : REEGNERATE_INVITE_CODE_ERROR,
      { status: 400 }
    );
  }
}
