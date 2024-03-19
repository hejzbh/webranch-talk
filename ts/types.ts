import { ModalType } from "@/components/providers/ModalProvider";
import {
  Account,
  ApplicationRole,
  Server,
  ServerChannel,
  ServerMember,
  ServerRole,
} from "@prisma/client";

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
  type: "file" | "input" | "textarea";
  inputType?: "text" | "password" | "email";
  label?: string;
  placeholder?: string;
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
