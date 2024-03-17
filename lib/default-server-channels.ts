import { ServerChannel, ServerChannelType } from "@prisma/client";

export const defaultServerChannels = (authorID: string) => {
  return [
    { name: "general", type: ServerChannelType.TEXT, authorID, id: "general" },
    { name: "to-do", type: ServerChannelType.TODO, authorID },
  ] as ServerChannel[];
};
