import React from "react";
// Next
import dynamic from "next/dynamic";
// Prisma
import { DetailedServerChannel } from "@/ts/types";
// Constants
import { channelIconsMap } from "@/constants/icons";
// Components
const Header = dynamic(() => import("@/components/Header"));
const HeaderTitle = dynamic(() =>
  import("@/components/Header").then((res) => res.HeaderTitle)
);
const HeaderRightContent = dynamic(() =>
  import("@/components/Header").then((res) => res.HeaderRightContent)
);
const ServerSidebarBurger = dynamic(
  () => import("@/components/burgers/ServerSidebarBurger")
);

// Props
type ServerChannelHeaderProps = {
  channel: DetailedServerChannel;
};

const ServerChannelHeader = ({ channel }: ServerChannelHeaderProps) => {
  const channelServer = channel.server;

  return (
    <Header>
      <HeaderTitle
        imageURL={channelServer?.imageURL}
        text={channelServer.name}
        spanText={channel.name}
        spanIcon={channelIconsMap[channel.type]}
      />
      <HeaderRightContent>
        <div className="block lg:hidden">
          <ServerSidebarBurger server={channel.server} />
        </div>
      </HeaderRightContent>
    </Header>
  );
};

export default ServerChannelHeader;
