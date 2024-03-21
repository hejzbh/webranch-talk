import React from "react";
// Next
import dynamic from "next/dynamic";
// Components
const ChatInput = dynamic(() => import("@/components/chat/ChatInput"));

const ChannelChat = () => {
  return (
    <div className="min-h-[91vh] flex flex-col p-2 sm:p-5">
      {/** Header */}
      {/** Messsages */}
      <div className="flex-1">
        <h2>Messages</h2>
      </div>
      {/** Input */}
      <ChatInput />
    </div>
  );
};

export default ChannelChat;
