import { ModalType } from "@/components/providers/ModalProvider";
import {
  Account,
  ApplicationRole,
  ChannelMessage,
  Server,
  ServerChannel,
  ServerChannelType,
  ServerMember,
  ServerRole,
} from "@prisma/client";
import { Socket, Server as NetServer } from "net";
import { NextApiResponse } from "next";

export type DetailedServer = Server & {
  channels: ServerChannel[];
  members: ServerMemberWithAccount[];
};

export type DetailedServerChannel = ServerChannel & {
  server: DetailedServer;
};

export type FileUploadEndpoint = "serverImage" | "messageFile";

export type NavigationSearchType = "users" | "servers";

export type NavigationSearchItem = {
  icon: React.ReactNode;
  imageURL?: string;
  name: string;
  id: string;
};

export type NavigationSearchData = {
  label: string;
  type: NavigationSearchType;
  requiredRoles?: ApplicationRole[];
  items: NavigationSearchItem[];
}[];

export type NavigationLink = {
  id: string;
  Icon?: any;
  requiredRoles?: ApplicationRole[];
  imageURL?: string;
  href?: string;
  title: string;
  type: "defaultLink" | "serverLink" | "serverChannelLink";
  sublinks?: NavigationLink[];
};

export type FormField = {
  name: string;
  type: "file" | "input" | "textarea" | "radio";
  inputType?: "text" | "password" | "email";
  label?: string;
  placeholder?: string;
  radioChoices?: any[];
  disabled?: boolean;
};

export type ServerOption = {
  name: string;
  data: { server: Server | DetailedServer };
  requiredRoles?: ServerRole[];
  modal: ModalType;
  Icon: any;
  hideFromOwner?: boolean;
  className?: string;
};

export type ServerMemberWithAccount = ServerMember & { account: Account };

export type ServerSearchType = "channels" | "members";

export type ServerSearchItem = {
  icon?: any;
  imageURL?: string;
  serverID: string;
  name: string;
  type?: ServerChannelType | null;
  id: string;
};

export type ServerSearchData = {
  label: string;
  type: ServerSearchType;
  requiredRoles?: ServerRole[];
  items: ServerSearchItem[];
}[];

export type ChannelMessageWithSender = ChannelMessage & {
  sender: ServerMemberWithAccount;
};

export type SocketApiURL = "/api/chat/channelMessages";

export type Message = ChannelMessageWithSender;
