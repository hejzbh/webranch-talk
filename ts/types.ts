import {
  ApplicationRole,
  Server,
  ServerChannel,
  ServerMember,
} from "@prisma/client";

export type DetailedServer = Server & {
  channels: ServerChannel[];
  members: ServerMember[];
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
};
