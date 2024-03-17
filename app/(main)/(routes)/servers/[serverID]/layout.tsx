import React from "react";
// Next
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
// Lib
import { getServerDetails } from "@/lib/(server)/get-server-details";
// TS
import { DetailedServer } from "@/ts/types";
// Components
const ServerSidebar = dynamic(
  () => import("@/components/server/ServerSidebar")
);

const ServerLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    serverID: string;
    channelID: string;
  };
}) => {
  const server: DetailedServer | any = await getServerDetails(params.serverID, {
    members: {
      include: {
        account: true,
      },
    },
    channels: true,
  });

  if (!server) return notFound();

  return (
    <div className="flex h-full">
      {/** Page */}
      <main className="w-full">{children}</main>
      {/** Sidebar */}
      <div className="hidden lg:block  min-w-[270px] xl:min-w-[300px]">
        <ServerSidebar server={server} />
      </div>
    </div>
  );
};

export default ServerLayout;
