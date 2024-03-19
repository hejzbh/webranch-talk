import React from "react";
// Next
import dynamic from "next/dynamic";
// TS
import { DetailedServer, ServerMemberWithAccount } from "@/ts/types";
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
const ServerSidebarSection = dynamic(
  () => import("@/components/server/ServerSidebarSection")
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
          "linear-gradient(108deg, rgba(30,31,36,1) 0%, rgba(32,33,38,1) 66%)",
      }}
    >
      {/** Server Widget (Settings, picture, name and more...) */}
      <ServerWidget
        currentAccount={currentAccount}
        server={server}
        className="border-b-2 border-border-common-2 min-h-20 p-5"
      />

      <ScrollArea className="max-h-[90vh] p-5 space-y-7">
        {/** Server Channels */}
        <ServerSidebarSection
          title="Channels"
          modalType="createServerChannel"
          server={server}
        >
          <ServerChannels
            channels={server.channels}
            currentAccount={currentAccount}
            serverMembers={server.members}
          />
        </ServerSidebarSection>
        {/** Server Members */}
        <ServerSidebarSection
          title="Members"
          modalType="serverMembers"
          server={server}
        >
          <ServerMembers members={server.members} server={server} />
        </ServerSidebarSection>
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;

// TODO - AKO JE KORISNIK APP ROLE ADMIN, ULASAKOM U NEKI SERVER POSTAJE AUTOMATSKI OWNER!
