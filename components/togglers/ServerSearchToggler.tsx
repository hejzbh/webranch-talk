"use client";
import React, { useMemo } from "react";
// Next
import dynamic from "next/dynamic";
// Prisma / Types
import { DetailedServer, ServerSearchData } from "@/ts/types";
import { ServerChannelType } from "@prisma/client";
// Consatnts
import { channelIconsMap } from "@/constants/icons";
// Components
import { useModalControl } from "../providers/ModalProvider";
const SearchBTN = dynamic(() => import("@/components/ui/SearchBTN"));
const Shortcut = dynamic(() => import("@/components/ui/Shortcut"));

// Props
interface ServerSearchTogglerProps {
  server: DetailedServer;
  className?: string;
}

function getServerSearchData(server: ServerSearchTogglerProps["server"]) {
  return [
    {
      label: "Text Channels",
      type: "channels",
      items: server?.channels
        ?.filter((channel) => channel.type === ServerChannelType.TEXT)
        ?.map((channel) => {
          const Icon = channelIconsMap[channel.type];
          return {
            name: channel.name,
            serverID: channel.serverID,
            type: channel.type,
            id: channel.id,
            icon: <Icon className="mr-2" size={18} />,
          };
        }),
    },
    {
      label: "Audio Channels",
      type: "channels",
      items: server?.channels
        ?.filter((channel) => channel.type === ServerChannelType.AUDIO)
        ?.map((channel) => {
          const Icon = channelIconsMap[channel.type];
          return {
            name: channel.name,
            id: channel.id,
            type: channel.type,
            serverID: channel.serverID,
            icon: <Icon className="mr-2" size={18} />,
          };
        }),
    },
    {
      label: "To-Do Channels",
      type: "channels",
      items: server?.channels
        ?.filter((channel) => channel.type === ServerChannelType.TODO)
        ?.map((channel) => {
          const Icon = channelIconsMap[channel.type];
          return {
            name: channel.name,
            id: channel.id,
            type: channel.type,
            serverID: channel.serverID,
            icon: <Icon className="mr-2" size={18} />,
          };
        }),
    },
    {
      label: "Video Channels",
      type: "channels",
      items: server?.channels
        ?.filter((channel) => channel.type === ServerChannelType.VIDEO)
        ?.map((channel) => {
          const Icon = channelIconsMap[channel.type];
          return {
            name: channel.name,
            type: channel.type,
            id: channel.id,
            serverID: channel.serverID,
            icon: <Icon className="mr-2" size={18} />,
          };
        }),
    },
    {
      label: "Members",
      type: "members",
      items: server?.members?.map((member) => ({
        name: member.account.name,
        id: member.id,
        serverID: member.serverID,
        imageURL: member?.account.imageURL,
      })),
    },
  ] as ServerSearchData;
}

const ServerSearchToggler = ({
  className = "",
  server,
}: ServerSearchTogglerProps) => {
  const { toggleModal } = useModalControl();
  const serverSearchData: ServerSearchData = useMemo(
    () => getServerSearchData(server),
    [server]
  );

  return (
    <div className={className}>
      {/** Togger */}
      <SearchBTN
        placeholder="Server Search"
        className="relative"
        onClick={() => {
          toggleModal("serverSearch", { serverSearchData: serverSearchData });
        }}
      >
        <Shortcut
          keys={["CTRL", "g"]}
          className="absolute top-[50%] translate-y-[-50%] right-2 z-[2]"
          onShortcutPress={(e) => {
            // Stop propagation (because parent element (SearchBTN) has initialized onClick event too)
            e.stopPropagation();

            toggleModal("serverSearch", { serverSearchData: serverSearchData });
          }}
        />
      </SearchBTN>
    </div>
  );
};

export default ServerSearchToggler;
