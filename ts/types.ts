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
