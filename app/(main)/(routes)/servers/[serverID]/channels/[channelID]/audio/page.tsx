import React from "react";
// Next
import dynamic from "next/dynamic";
// Components
const AudioCall = dynamic(
  () => import("@/components/server/channel/(audio)/AudioCall"),
  { ssr: false }
);

const AudioChannelPage = async ({
  params,
}: {
  params: { channelID: string };
}) => {
  return (
    <div className="p-2 md:p-5">
      <AudioCall channelID={params.channelID} />
    </div>
  );
};

export default AudioChannelPage;
