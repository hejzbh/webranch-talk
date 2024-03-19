import React from "react";
// Next
import dynamic from "next/dynamic";
// TS
import { NavigationLink as NavigationLinkType } from "@/ts/types";
// Icons
import { Home, Rss, Send, Activity, ListTodo, CodeXml } from "lucide-react";
// Prisma
import { ApplicationRole, Server } from "@prisma/client";
// Lib
import { cn } from "@/lib/utils";
import { getAccountServers } from "@/lib/(account)/account-servers";
// Components
const RequireRoles = dynamic(() => import("@/components/auth/RequireRoles"));
const ScrollArea = dynamic(() => import("@/components/ui/ScrollArea"));
const NavigationLink = dynamic(() => import("./NavigationLink"));

// Props
interface NavigationLinksProps {
  className?: string;
}

async function getNavigationLinks() {
  const servers = await getAccountServers();

  return [
    {
      id: "1",
      Icon: <Home className="w-5 h-5" />,
      title: "Welcome",
      href: "/welcome",
      type: "defaultLink",
    },
    {
      id: "2",
      Icon: <Rss className="w-5 h-5" />,
      title: "Servers",
      href: "/servers",
      type: "serverLink",
      sublinks: servers
        ? servers?.map((server: Server) => ({
            id: server.id,
            title: server.name,
            type: "serverLink",
            imageURL: server?.imageURL,
            sublinks: [],
          }))
        : [],
    },
    {
      id: "62",
      Icon: <CodeXml className="w-5 h-5" />,
      title: "Projects",
      type: "defaultLink",
      sublinks: [],
    },
    {
      id: "3",
      Icon: <Send className="w-5 h-5" />,
      title: "Inbox",
      type: "defaultLink",
    },
    {
      id: "4",
      Icon: <Activity className="w-5 h-5" />,
      title: "Activities",
      type: "defaultLink",
      requiredRoles: [ApplicationRole.ADMIN],
    },
    {
      id: "5",
      Icon: <ListTodo className="w-5 h-5" />,
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
