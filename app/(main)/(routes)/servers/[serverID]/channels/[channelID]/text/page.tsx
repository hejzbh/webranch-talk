import React from "react";

// Props
interface TextChannelPageProps {
  params: {
    serverID: string;
    channelID: string;
  };
}

const TextChannelPage = ({ params }: TextChannelPageProps) => {
  return <div>Text</div>;
};

export default TextChannelPage;
