import React from "react";
// Next
import dynamic from "next/dynamic";
// Components
const ChannelChat = dynamic(
  () => import("@/components/chat/(channel)/ChannelChat")
);
// Props
interface TextChannelPageProps {
  params: {
    serverID: string;
    channelID: string;
  };
}

const TextChannelPage = ({ params }: TextChannelPageProps) => {
  return (
    <main>
      <ChannelChat channelID={params.channelID} />
    </main>
  );
};

export default TextChannelPage;
