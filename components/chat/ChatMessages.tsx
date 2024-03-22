"use client";

import React from "react";
// Next
import dynamic from "next/dynamic";
// TS
import { SocketApiURL } from "@/ts/types";
// Hooks
import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatPusher } from "@/hooks/use-chat-pusher";
// Components
const Message = dynamic(() => import("./Message"));

// Props
interface ChatMessagesProps {
  className?: string;
  apiURL: SocketApiURL;
  newMessagePusherKey: string;
  pusherChannelKey: string;
  params?: {
    channelID?: string;
    serverID?: string;
  };
}

const ChatMessages = ({
  className = "",
  apiURL,
  params,
  newMessagePusherKey,
  pusherChannelKey,
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

  useChatPusher({
    newMessagePusherKey,
    pusherChannelKey,
    onNewMessageRecieved: addNewMessage,
    onMessageEdited: updateMessage,
    onMessageDeleted: deleteMessage,
  });

  return (
    <div
      className={`max-h-[80vh] overflow-y-scroll py-5 scrollbar-hide ${className}`}
    >
      {/** Load more messages */}
      {hasNextPage && <button onClick={fetchNextPage}>Fetch more</button>}
      {/** Messages list */}
      <ul className="flex flex-col space-y-3">
        {messages?.map((message, idx, messages) => (
          <li key={message.id}>
            {" "}
            <Message message={message} previousMessage={messages[idx - 1]} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatMessages;
