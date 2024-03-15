import React from "react";
// Next
import dynamic from "next/dynamic";
// Components
const ChannelHeader = dynamic(
  () => import("@/components/server/channel/ServerChannelHeader")
);
// Props
interface ServerChannelPageProps {}

const ServerChannelPage = () => {
  return (
    <main>
      <ChannelHeader />
    </main>
  );
};

export default ServerChannelPage;
