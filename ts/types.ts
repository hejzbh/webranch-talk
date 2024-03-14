import { ApplicationRole } from "@prisma/client";

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
  type: "defaultLink" | "serverLink";
  sublinks?: NavigationLink[];
};
