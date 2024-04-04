"use client";

import { useRTC } from "@/hooks/use-rtc";
import React from "react";

// Props
interface AudioCallProps {
  channelID: string;
}

const AudioCall = ({ channelID }: AudioCallProps) => {
  const { participants } = useRTC({ channelID });

  return (
    <div>
      {participants?.map((participant) => {
        participant.audioTrack?.setVolume(100);
        participant?.audioTrack?.play();
        console.log(participant);

        return (
          <div key={participant.id}>
            <h2>{participant?.id}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default AudioCall;
