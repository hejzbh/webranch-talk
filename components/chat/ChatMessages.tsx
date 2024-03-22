"use client";

import React, { useRef } from "react";
// Next
import dynamic from "next/dynamic";
// TS
import { SocketApiURL } from "@/ts/types";
// Hooks
import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatPusher } from "@/hooks/use-chat-pusher";
import { useChatScroll } from "@/hooks/use-chat-scroll";
// Components
const Message = dynamic(() => import("./Message"));
const Spinner = dynamic(() => import("@/components/Spinner"));

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
  const bottomRef: any = useRef();
  const chatRef: any = useRef();

  // Get message data
  const {
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    messages,
    isLoading,
    addNewMessage,
    updateMessage,
    deleteMessage,
  } = useChatQuery({
    params,
    apiURL,
  });
  // Listen on real-time changes in chat
  useChatPusher({
    newMessagePusherKey,
    pusherChannelKey,
    onNewMessageRecieved: addNewMessage,
    onMessageEdited: updateMessage,
    onMessageDeleted: deleteMessage,
  });
  //  On scroll
  useChatScroll({
    chatRef,
    bottomRef,
    messagesCount: messages?.length,
    initLoadingFinished: !isLoading,
  });

  return (
    <div
      ref={chatRef}
      className={` max-h-[82vh] overflow-y-scroll relative ${className}`}
    >
      {/** Loading on first load */}
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          {" "}
          <Spinner className="wm:w-[3.2rem] md:w-[4rem] sm:h-[3.2rem] md:h-[4rem] text-spinner" />
        </div>
      )}

      {/** Messages */}
      <ul className={`flex flex-col space-y-3 justify-end min-h-[80vh]  py-5`}>
        {/** Load more */}
        {hasNextPage && (
          <button
            title="Load previous messages"
            className="text-center uppercase text-secondary text-md hover:underline transition-all duration-300 ease-in-out"
            onClick={fetchNextPage}
          >
            {isFetchingNextPage ? (
              <Spinner className="w-7 h-7 text-spinner mx-auto" />
            ) : (
              "Load more"
            )}
          </button>
        )}

        {/** Messages list */}
        {messages?.map((message, idx, messages) => (
          <li key={message.id}>
            <Message message={message} previousMessage={messages[idx - 1]} />
          </li>
        ))}

        {/** Bottom */}
        <span ref={bottomRef} className="opacity-0"></span>
      </ul>
    </div>
  );
};

export default ChatMessages;
