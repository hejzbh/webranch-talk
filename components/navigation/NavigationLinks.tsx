import React from "react";
// Next
import dynamic from "next/dynamic";
// TS
import { NavigationLink as NavigationLinkType } from "@/ts/types";
// Icons
import { Home, Rss, Send, Activity, ListTodo } from "lucide-react";
// Prisma
import { ApplicationRole } from "@prisma/client";
// Lib
import { cn } from "@/lib/utils";
// Components
const RequireRoles = dynamic(() => import("@/components/auth/RequireRoles"));
const ScrollArea = dynamic(() => import("@/components/ui/ScrollArea"));
const NavigationLink = dynamic(() => import("./NavigationLink"));

// Props
interface NavigationLinksProps {
  className?: string;
}

async function getNavigationLinks() {
  return [
    {
      id: "1",
      Icon: <Home />,
      title: "Welcome",
      href: "/welcome",
      type: "defaultLink",
    },
    {
      id: "2",
      Icon: <Rss />,
      title: "Servers",
      type: "serverLink",
      sublinks: [],
    },
    {
      id: "3",
      Icon: <Send />,
      title: "Inbox",
      type: "defaultLink",
    },
    {
      id: "4",
      Icon: <Activity />,
      title: "Activities",
      type: "defaultLink",
      requiredRoles: [ApplicationRole.ADMIN],
    },
    {
      id: "5",
      Icon: <ListTodo />,
      title: "To-Do",
      type: "defaultLink",
      requiredRoles: [ApplicationRole.ADMIN],
    },
  ] as NavigationLinkType[];
}

const NavigationLinks = async ({ className = "" }: NavigationLinksProps) => {
  const links: NavigationLinkType[] = await getNavigationLinks();

  return (
    <ScrollArea list className={(cn("space-y-7"), className)}>
      {links?.map((link) => (
        <RequireRoles key={link.id} requiredRoles={link.requiredRoles}>
          <li>
            <NavigationLink link={link} />
          </li>
        </RequireRoles>
      ))}
    </ScrollArea>
  );
};

export default NavigationLinks;
