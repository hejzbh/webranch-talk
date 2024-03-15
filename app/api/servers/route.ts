import { NextResponse } from "next/server";
// NPM
import { v4 as uuid } from "uuid";
// Constants
import {
  CANNOT_FOUND_ACCOUNT_ERROR,
  CREATE_SERVER_ERROR,
  CREATE_SERVER_MISSING_DATA_ERROR,
} from "@/constants/errorMessages";
// Lib
import { getCurrentAccount } from "@/lib/current-account";
import { db } from "@/lib/db";
import { defaultServerChannels } from "@/lib/default-server-channels";
// Prisma
import { Account, ServerRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    // 1) Extracting name and imageURL from request body
    const { name, imageURL } = await req.json();

    // 2) Checking if name or imageURL is missing
    if (!name || !imageURL)
      return new NextResponse(CREATE_SERVER_MISSING_DATA_ERROR, {
        status: 400,
      });

    // 3) Getting current account
    const account: Account = await getCurrentAccount();

    // 4) Checking if account is not found
    if (!account)
      return new NextResponse(CANNOT_FOUND_ACCOUNT_ERROR, { status: 401 });

    // 5) Creating a new server in the database
    const server = await db.server.create({
      data: {
        name,
        imageURL,
        ownerID: account?.id,
        inviteCode: uuid(),
        channels: {
          create: defaultServerChannels(account?.id),
        },
        members: {
          create: [{ accountID: account?.id, role: ServerRole.OWNER }],
        },
      },
    });

    // 6) Returning JSON response with the created server
    return NextResponse.json(server);
  } catch {
    // Handling errors
    return new NextResponse(CREATE_SERVER_ERROR);
  }
}
