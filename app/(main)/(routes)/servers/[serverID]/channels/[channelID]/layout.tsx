import React from "react";
// Next
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
// Lib
import { getChannelDetails } from "@/lib/(serverChannel)/get-channel-details";
import { DetailedServerChannel } from "@/ts/types";
// Components
const ChannelHeader = dynamic(
  () => import("@/components/server/channel/ServerChannelHeader")
);
// Props
interface ServerChannelPageProps {
  params: {
    serverID: string;
    channelID: string;
  };
  children: React.ReactNode;
}

const ServerChannelPage = async ({
  params,
  children,
}: ServerChannelPageProps) => {
  const channelDetails: DetailedServerChannel | any = await getChannelDetails({
    channelID: params.channelID,
    serverID: params.serverID,
    include: {
      server: {
        include: {
          members: {
            include: {
              account: true,
            },
          },
          channels: {
            include: {
              server: {
                include: {
                  members: {
                    include: {
                      account: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!channelDetails) return notFound();

  return (
    <>
      {" "}
      <ChannelHeader channel={channelDetails} />
      <main className="!overflow-hidden h-full !max-h-[91vh]">{children}</main>
    </>
  );
};

export default ServerChannelPage;
