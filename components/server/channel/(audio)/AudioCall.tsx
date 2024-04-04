"use client";

import { useRTC } from "@/hooks/use-rtc";
import { IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import React, { useEffect } from "react";

// Props
interface AudioCallProps {
  channelID: string;
}

const AudioCall = ({ channelID }: AudioCallProps) => {
  const { participants } = useRTC({ channelID });

  return (
    <div>
      {participants?.map((participant) => {
        return <Participant key={participant.id} participant={participant} />;
      })}
    </div>
  );
};

export const Participant = ({
  participant,
}: {
  participant: {
    id: string;
    audioTrack?: IRemoteAudioTrack;
  };
}) => {
  useEffect(() => {
    participant?.audioTrack?.play();
  }, [participant]);

  return (
    <div>
      <h2>{participant?.id}</h2>
    </div>
  );
};

export default AudioCall;
