"use client";

import { useRTC } from "@/hooks/use-rtc";
import React from "react";

// Props
interface AudioCallProps {
  channelID: string;
}

const AudioCall = ({ channelID }: AudioCallProps) => {
  const {} = useRTC({ channelID });

  return <div>AudioCall</div>;
};

export default AudioCall;
