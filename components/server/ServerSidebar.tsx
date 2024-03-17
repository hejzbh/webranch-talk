import React from "react";
// Next
import dynamic from "next/dynamic";
// TS
import { DetailedServer } from "@/ts/types";
// Lib
import { getCurrentAccount } from "@/lib/(account)/current-account";
// Prisma
import { Account } from "@prisma/client";
// Components
const ServerWidget = dynamic(() => import("@/components/server/ServerWidget"));
const ServerChannels = dynamic(
  () => import("@/components/server/ServerChannels")
);
const ServerMembers = dynamic(
  () => import("@/components/server/ServerMembers")
);
const ScrollArea = dynamic(() => import("@/components/ui/ScrollArea"));

// Props
interface ServerSidebarProps {
  server: DetailedServer;
}

const ServerSidebar = async ({ server }: ServerSidebarProps) => {
  const currentAccount: Account = await getCurrentAccount();

  return (
    <div
      className="bg-red-500 h-full flex-1 border-l-2 border-border-common-2"
      style={{
        background:
          "radial-gradient(circle, rgba(26,27,31,1) 0%, rgba(26,27,31,1) 35%, rgba(18,18,22,1) 100%)",
      }}
    >
      {/** Server Widget (Settings, picture, name and more...) */}
      <ServerWidget
        currentAccount={currentAccount}
        server={server}
        className="border-b-2 border-border-common-2 min-h-20 p-5"
      />

      <ScrollArea className="max-h-[90vh]">
        {/** Server Channels */}
        <ServerChannels />
        {/** Server Members */}
        <ServerMembers />
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
