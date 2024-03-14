import { ApplicationRole } from "@prisma/client";

export type FileUploadEndpoint = "serverImage" | "messageFile";

export type NavigationSearchData = {
  label: string;
  type: "users" | "servers";
  requiredRoles?: ApplicationRole[];
  items: {
    icon: React.ReactNode;
    imageURL?: string;
    name: string;
    id: string;
  }[];
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
