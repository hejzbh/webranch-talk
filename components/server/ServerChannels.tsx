"use client";
import React from "react";
// Next
import dynamic from "next/dynamic";
// Icons
import { Plus } from "lucide-react";
// Prisma
import {
  Account,
  ServerChannel as ServerChannelInterface,
  ServerChannelType,
  ServerMember,
  ServerRole,
} from "@prisma/client";
import { channelIconsMap } from "@/constants/icons";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { channelRoute } from "@/lib/(routes)/channel-route";
// Components
const Label = dynamic(() => import("@/components/ui/Label"));
const RequireServerRoles = dynamic(
  () => import("@/components/server/RequireServerRoles")
);

// Props
interface ServerChannelsProps {
  channels: ServerChannelInterface[];
  currentAccount: Account;
  serverMembers: ServerMember[];
}

const ServerChannels = ({
  channels,
  currentAccount,
  serverMembers,
}: ServerChannelsProps) => {
  const channelsGroupdByType = channels.reduce(
    (group, channel) => {
      group[channel.type].push(channel);
      return group;
    },
    {
      [ServerChannelType.TEXT]: [] as ServerChannelInterface[],
      [ServerChannelType.TODO]: [] as ServerChannelInterface[],
      [ServerChannelType.AUDIO]: [] as ServerChannelInterface[],
      [ServerChannelType.VIDEO]: [] as ServerChannelInterface[],
    }
  );

  return (
    <ul className="space-y-7">
      {Object.entries(channelsGroupdByType).map(([type, channels]) => {
        return (
          <li key={type}>
            {" "}
            <ChannelsGroup
              serverMembers={serverMembers}
              currentAccount={currentAccount}
              type={type as ServerChannelType}
              channels={channels}
            />
          </li>
        );
      })}
    </ul>
  );
};

export const ChannelsGroup = ({
  channels,
  type,
  currentAccount,
  serverMembers,
}: {
  channels: ServerChannelInterface[];
  type: ServerChannelType;
  currentAccount: Account;
  serverMembers: ServerMember[];
}) => {
  const accountAsServerMember = serverMembers.find(
    (member) => member.accountID === currentAccount.id
  );

  return (
    <div>
      {/** Heading */}
      <div className="flex items-center justify-between mb-2">
        {/** Label */}
        <Label text={type + " channels"} />
        {/** Add channel */}
        <RequireServerRoles
          member={accountAsServerMember as ServerMember}
          currentAccount={currentAccount}
          requiredServerRoles={[
            ServerRole.MODERATOR,
            ServerRole.ADMIN,
            ServerRole.OWNER,
          ]}
        >
          <button title={`Create ${type} channel`}>
            <Plus
              size={16}
              className="text-secondary hover:text-actionHover transition-all duration-300 ease-in-out"
            />
          </button>
        </RequireServerRoles>
      </div>
      {/** Channels */}
      <ul className="space-y-2">
        {channels?.map((channel) => (
          <li key={channel.id}>
            <ServerChannel channel={channel} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ServerChannel = ({
  channel,
}: {
  channel: ServerChannelInterface;
}) => {
  const router = useRouter();
  const params = useParams();

  const isActiveChannel = params.channelID === channel.id;

  const Icon = channelIconsMap[channel.type];

  const onClick = () => {
    router.push(
      channelRoute({
        serverID: channel.serverID,
        channelType: channel.type,
        channelID: channel.id,
      })
    );
  };

  return (
    <button
      title={`Go to ${channel.name} channel`}
      onClick={onClick}
      className={cn(
        "text-md flex items-center sppace-x-2 text-secondary hover:text-main/80 transition-all duration-300 ease-in-out",
        isActiveChannel && "text-main"
      )}
    >
      <Icon size={18} className="mr-2" />
      {channel.name}
    </button>
  );
};

export default ServerChannels;
