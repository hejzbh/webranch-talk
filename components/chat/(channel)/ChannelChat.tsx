import React from "react";
// Next
import dynamic from "next/dynamic";
// Lib
import {
  channelChatKey,
  newChannelMessageKey,
} from "@/lib/(pusher-keys)/(channelChat)";
// Components
const ChatInput = dynamic(() => import("@/components/chat/ChatInput"));
const ChatMessages = dynamic(() => import("@/components/chat/ChatMessages"));

// Props
interface ChannelChatProps {
  channelID: string;
}
const ChannelChat = ({ channelID }: ChannelChatProps) => {
  return (
    <div className="h-full flex flex-col p-2 sm:p-5">
      {/** Header */}
      {/** Messsages */}

      <ChatMessages
        params={{ channelID }}
        pusherChannelKey={channelChatKey(channelID)}
        newMessagePusherKey={newChannelMessageKey(channelID)}
        apiURL="/api/chat/channelMessages"
        className="flex-1"
      />

      {/** Input */}
      <ChatInput params={{ channelID }} apiURL="/api/chat/channelMessages" />
    </div>
  );
};

export default ChannelChat;
