import {
  ListTodo,
  Video,
  Hash,
  Volume2,
  UserPlus,
  Plus,
  Users,
  LogOut,
  Trash,
  Settings,
  Crown,
} from "lucide-react";

import { ServerChannelType } from "@prisma/client";

export const channelIconsMap = {
  [ServerChannelType.AUDIO]: Volume2,
  [ServerChannelType.TEXT]: Hash,
  [ServerChannelType.TODO]: ListTodo,
  [ServerChannelType.VIDEO]: Video,
};

export const modalIcons = {
  invitePeople: UserPlus,
  createServerChannel: Plus,
  serverMembers: Users,
  serverSettings: Settings,
  leaveServer: LogOut,
  deleteServer: Trash,
};

export const OwnerIcon = Crown;
