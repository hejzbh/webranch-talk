"use client";

import React from "react";
// TS
import { SocketApiURL } from "@/ts/types";
// Hooks
import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatSocket } from "@/hooks/use-chat-socket";

// Props
interface ChatMessagesProps {
  className?: string;
  apiURL: SocketApiURL;
  newMessageSocketKey: string;
  params?: {
    channelID?: string;
    serverID?: string;
  };
}

const ChatMessages = ({
  className = "",
  apiURL,
  params,
  newMessageSocketKey,
}: ChatMessagesProps) => {
  const {
    hasNextPage,
    fetchNextPage,
    messages,
    addNewMessage,
    updateMessage,
    deleteMessage,
  } = useChatQuery({
    params,
    apiURL,
  });

  useChatSocket({
    newMessageSocketKey,
    onNewMessageRecieved: addNewMessage,
    onMessageEdited: updateMessage,
    onMessageDeleted: deleteMessage,
  });

  return (
    <div className={`${className}`}>
      {hasNextPage && <button onClick={fetchNextPage}>Fetch more</button>}
      {messages?.map((message) => (
        <div key={message.id}> {message.content}</div>
      ))}
    </div>
  );
};

export default ChatMessages;
