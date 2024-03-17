import { ListTodo, Video, Hash, Volume2 } from "lucide-react";

import { ServerChannelType } from "@prisma/client";

export const channelIconsMap = {
  [ServerChannelType.AUDIO]: Volume2,
  [ServerChannelType.TEXT]: Hash,
  [ServerChannelType.TODO]: ListTodo,
  [ServerChannelType.VIDEO]: Video,
};
