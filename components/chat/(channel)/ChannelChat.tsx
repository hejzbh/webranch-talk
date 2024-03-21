import React from "react";
// Next
import dynamic from "next/dynamic";
// Lib
import { newChannelMessageKey } from "@/lib/(socket-keys)/channelNewMessageKey";
// Components
const ChatInput = dynamic(() => import("@/components/chat/ChatInput"));
const ChatMessages = dynamic(() => import("@/components/chat/ChatMessages"));

// Props
interface ChannelChatProps {
  channelID: string;
}
const ChannelChat = ({ channelID }: ChannelChatProps) => {
  return (
    <div className="min-h-[91vh] flex flex-col p-2 sm:p-5">
      {/** Header */}
      {/** Messsages */}

      <ChatMessages
        params={{ channelID }}
        newMessageSocketKey={newChannelMessageKey(channelID)}
        apiURL="/api/socket/channelMessages"
        className="flex-1"
      />

      {/** Input */}
      <ChatInput params={{ channelID }} apiURL="/api/socket/channelMessages" />
    </div>
  );
};

export default ChannelChat;
