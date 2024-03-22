"use client";
import React, { useState } from "react";
// Next
import dynamic from "next/dynamic";
// NPM
import axios from "axios";
// Icons
import { Paperclip, Send } from "lucide-react";
// TS
import { SocketApiURL } from "@/ts/types";
// Components
const Button = dynamic(() => import("@/components/ui/Button"));

// Props
interface ChatInputProps {
  className?: string;
  apiURL: SocketApiURL;
  params: {
    channelID?: string;
  };
}

const ChatInput = ({ className = "", params = {}, apiURL }: ChatInputProps) => {
  const [message, setMessage] = useState<string>();

  async function sendMessage(message: any) {
    // 3)
    setMessage("");

    // 1)
    const response = await axios.post(apiURL, {
      message,
      ...params,
    });

    // 2)
    if (!response.data) throw new Error("Potential problem with chat");
  }

  return (
    <form
      autoComplete="false"
      onSubmit={(e) => {
        e.preventDefault();
        //
        if (!message) return;
        //
        sendMessage(message);
      }}
      className={`shadow-md flex justify-between items-center bg-black/80 rounded-3xl px-1 sm:px-3 ${className}`}
    >
      {/** Attachment */}
      <button
        type="button"
        title="Send Attachment"
        className="p-2 sm:p-3 pr-3 sm:pr-6 group"
      >
        <Paperclip
          className="text-secondary group-hover:text-main transition-all duration-300 ease-in-out"
          size={20}
        />
      </button>
      {/** Input */}
      <input
        type="text"
        value={message}
        role="presentation"
        autoComplete="off"
        onChange={(e) => setMessage(e.target.value)}
        className="pl-0 p-2 sm:p-3 bg-transparent text-sm md:text-md w-full placeholder:text-sm placeholder:md:text-md text-zinc-300"
        placeholder="Type a message here..."
      />
      {/** Options (Send btn, emoji and more...) */}
      <div className="p-3 ">
        <Button
          type="submit"
          title=""
          className="!bg-chat !text-white border-chat !rounded-full !p-1 sm:!p-2 flex items-center jusitfy-center hover:scale-105"
        >
          <Send size={17} />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
