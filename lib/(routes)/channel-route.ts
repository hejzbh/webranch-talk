import { ServerChannelType } from "@prisma/client";

export const channelRoute = ({
  serverID,
  channelType,
  channelID,
}: {
  channelID: string;
  serverID: string;
  channelType: ServerChannelType;
}) => `/servers/${serverID}/channels/${channelID}/${channelType.toLowerCase()}`;
