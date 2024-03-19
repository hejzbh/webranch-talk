import { NextResponse } from "next/server";
// NPM
import { v4 as uuid } from "uuid";
// Constants
import {
  UNAUTHORIZED_ERROR,
  CREATE_SERVER_ERROR,
  CREATE_SERVER_MISSING_DATA_ERROR,
} from "@/constants/errorMessages";
// Lib
import { getCurrentAccount } from "@/lib/(account)/current-account";
import { db } from "@/lib/db";
import { defaultServerChannels } from "@/lib/default-server-channels";
// Prisma
import { Account, ServerRole } from "@prisma/client";

export async function POST(
  req: Request,
  { params }: { params: { serverID: string } }
) {
  try {
    // 1) Extracting name and type from request body
    const { name, type } = await req.json();

    // 2) Checking if name or type is missing
    if (!name || !type)
      return new NextResponse(CREATE_SERVER_MISSING_DATA_ERROR, {
        status: 400,
      });

    // 3) Getting current account
    const currentAccount: Account = await getCurrentAccount();

    // 4) Checking if account is not found
    if (!currentAccount)
      return new NextResponse(UNAUTHORIZED_ERROR, { status: 401 });

    // 5) Creating a new channel in the database
    const channel = await db.serverChannel.create({
      data: {
        name: name.toLowerCase(),
        type,
        authorID: currentAccount.id,
        serverID: params.serverID,
      },
    });

    // 6) Returning JSON response with the created server
    return NextResponse.json(channel);
  } catch (err: any) {
    // Handling errors
    return new NextResponse(
      err.message?.length < 20 ? err.message : CREATE_SERVER_ERROR,
      { status: 400 }
    );
  }
}
