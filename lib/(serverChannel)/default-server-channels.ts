import { ServerChannel, ServerChannelType } from "@prisma/client";

export const defaultServerChannels = (authorID: string) => {
  return [
    { name: "general", type: ServerChannelType.TEXT, authorID },
    { name: "to-do", type: ServerChannelType.TODO, authorID },
  ] as ServerChannel[];
};
