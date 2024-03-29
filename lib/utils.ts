import { DetailedServer, ServerMemberWithAccount } from "@/ts/types";
import {
  Server,
  ServerChannel,
  ServerMember,
  ServerRole,
} from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isFileImage = (fileUrl: string) => {
  // 1)
  const fileExtension: any = fileUrl.split(".").pop();
  // 2)
  const imgExtenstions = ["jpg", "png", "webp", "jpeg"];
  // 3)
  return imgExtenstions.includes(fileExtension);
};

export const extractInviteCodeFromURL = (inviteCodeURL: string) =>
  inviteCodeURL.slice(inviteCodeURL.lastIndexOf("/") + 1);

export const toCapitalize = (str: string) =>
  str[0].toUpperCase() + str.slice(1).toLowerCase();

export const isMemberServerOwner = ({
  member,
  server,
}: {
  member: ServerMemberWithAccount;
  server: DetailedServer | Server;
}) => server.ownerID === member?.accountID; //||member.account.appRole === ApplicationRole.ADMIN;

export const memberHasServerRole = ({
  member,
  role,
}: {
  member: ServerMember;
  role: ServerRole;
}) => member.role === role;

export const isMemberChannelAuthor = ({
  memberID,
  channel,
}: {
  memberID: string;
  channel: ServerChannel;
}) => channel.authorID === memberID;
