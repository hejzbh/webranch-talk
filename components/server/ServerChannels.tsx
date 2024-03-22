"use client";
import React, { useMemo } from "react";
// Next
import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";
// Icons
import { Plus, Trash } from "lucide-react";
// Prisma / Types
import {
  Account,
  ServerChannel as ServerChannelInterface,
  ServerChannelType,
  ServerMember,
  ServerRole,
} from "@prisma/client";
import { DetailedServer } from "@/ts/types";
// Constants
import { channelIconsMap } from "@/constants/icons";
// Lib
import { cn, isMemberChannelAuthor } from "@/lib/utils";
import { channelRoute } from "@/lib/(routes)/channel-route";
import { defaultServerChannels } from "@/lib/(serverChannel)/default-server-channels";
// Components
import { useModalControl } from "../providers/ModalProvider";
const Label = dynamic(() => import("@/components/ui/Label"));
const RequireServerRoles = dynamic(
  () => import("@/components/server/RequireServerRoles")
);

// Props
interface ServerChannelsProps {
  channels: ServerChannelInterface[];
  currentAccount: Account;
  server: DetailedServer;
}

const ServerChannels = ({
  channels,
  currentAccount,
  server,
}: ServerChannelsProps) => {
  const channelsGroupByType = useMemo(
    () =>
      channels.reduce(
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
      ),
    [channels]
  );

  return (
    <ul className="space-y-7">
      {Object.entries(channelsGroupByType).map(([type, channels]) => {
        return (
          <li key={type}>
            {" "}
            <ChannelsGroup
              server={server}
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
  server,
}: {
  channels: ServerChannelInterface[];
  type: ServerChannelType;
  currentAccount: Account;
  server: DetailedServer;
}) => {
  const { onOpen } = useModalControl();
  const accountAsServerMember = server.members.find(
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
          <button
            onClick={() =>
              onOpen("createServerChannel", { channelType: type, server })
            }
            title={`Create ${type} channel`}
            className="p-1 group"
          >
            <Plus
              size={16}
              className="text-secondary group-hover:text-actionHover transition-all duration-300 ease-in-out"
            />
          </button>
        </RequireServerRoles>
      </div>
      {/** Channels */}
      <ul className="space-y-1">
        {channels?.map((channel) => (
          <li key={channel.id}>
            <ServerChannel
              channel={channel}
              currentAccount={currentAccount}
              currentAccountAsMember={accountAsServerMember as ServerMember}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ServerChannel = ({
  channel,
  currentAccount,
  currentAccountAsMember,
}: {
  channel: ServerChannelInterface;
  currentAccount: Account;
  currentAccountAsMember: ServerMember;
}) => {
  const params = useParams();
  const { onOpen } = useModalControl();

  const isActiveChannel = params?.channelID === channel.id;

  const Icon = channelIconsMap[channel.type];

  return (
    <Link
      title={`Go to ${channel.name} channel`}
      onClick={(e: any) =>
        e.target.closest(".delete-channel") && e.preventDefault()
      }
      scroll={false}
      href={channelRoute({
        serverID: channel.serverID,
        channelType: channel.type,
        channelID: channel.id,
      })}
      className={cn(
        "text-md flex  items-center group justify-between py-1 w-full text-secondary hover:text-main/80 transition-all duration-300 ease-in-out",
        isActiveChannel && "text-main font-semibold"
      )}
    >
      {/** Icon & Name */}
      <div className="flex items-center space-x-1">
        <Icon size={18} className="mr-2" />
        {channel.name}
      </div>
      {/** Options ? */}
      {defaultServerChannels("").some(
        (defaultChannel) => defaultChannel.name === channel.name
      ) ? null : (
        <RequireServerRoles
          currentAccount={currentAccount}
          member={currentAccountAsMember as ServerMember}
          requiredServerRoles={
            isMemberChannelAuthor({ memberID: currentAccount.id, channel })
              ? []
              : [ServerRole.MODERATOR, ServerRole.ADMIN, ServerRole.OWNER]
          }
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onOpen("deleteServerChannel", { channel });
            }}
            type="button"
            title="Delete"
            className="opacity-100 delete-channel lg:opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out p-1  text-secondary hover:text-danger"
          >
            <Trash className="delete-channel" size={14} />
          </button>
        </RequireServerRoles>
      )}
    </Link>
  );
};

export default ServerChannels;
