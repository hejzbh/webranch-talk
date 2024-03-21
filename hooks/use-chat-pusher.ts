"use client";

import { useEffect } from "react";
// TS
import { Message } from "@/ts/types";
// Lib
import { pusherClient } from "@/lib/pusher/client";

export const useChatPusher = ({
  newMessagePusherKey,
  pusherChannelKey,
  onNewMessageRecieved,
  onMessageDeleted,
  onMessageEdited,
}: {
  newMessagePusherKey: string;
  pusherChannelKey: string;
  onNewMessageRecieved: (message: Message) => void;
  onMessageEdited: (message: Message) => void;
  onMessageDeleted: (messageID: string) => void;
}) => {
  useEffect(() => {
    //TODO: Svakih 10 sekundi nek pravi request
    if (!pusherClient) return;

    const listeningChannel = pusherClient
      .subscribe(pusherChannelKey)
      .bind(newMessagePusherKey, onNewMessageRecieved);

    return () => {
      listeningChannel?.unbind();
    };
  }, [pusherClient, newMessagePusherKey, pusherChannelKey]);

  // eslint-disable-line */

  return null;
};
