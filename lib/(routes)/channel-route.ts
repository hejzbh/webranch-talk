import { ServerChannelType } from "@prisma/client";
import { serverRoute } from "./server-route";

export const channelRoute = ({
  serverID,
  channelType,
  channelID,
}: {
  channelID: string;
  serverID: string;
  channelType: ServerChannelType;
}) =>
  `${serverRoute(serverID)}/channels/${channelID}/${channelType.toLowerCase()}`;
