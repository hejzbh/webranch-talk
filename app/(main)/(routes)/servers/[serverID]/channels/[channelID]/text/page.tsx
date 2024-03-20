import React from "react";

// Props
interface TextChannelPageProps {
  params: {
    serverID: string;
    channelID: string;
  };
}

const TextChannelPage = ({}: TextChannelPageProps) => {
  return <div>Text</div>;
};

export default TextChannelPage;
