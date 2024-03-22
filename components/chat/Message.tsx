import React from "react";
// Next
import dynamic from "next/dynamic";
//  TS
import { Message as MessageType } from "@/ts/types";
// Provider
import { useCurrentAccount } from "../providers/CurrentAccountProvider";
// Lib
import { cn } from "@/lib/utils";
// Components
const UserAvatar = dynamic(() => import("@/components/ui/UserAvatar"));

// Props
interface MessageProps {
  message: MessageType;
  previousMessage: MessageType;
}

const Message = ({ message, previousMessage }: MessageProps) => {
  const currentAccount = useCurrentAccount();

  const sender = message.sender;
  const isMessageFromMe = sender.accountID === currentAccount.id;
  const areMessagesInRow = previousMessage?.senderID === sender.id;
  const addSpace = previousMessage && sender.id !== previousMessage.senderID;

  return (
    <div
      className={cn(
        "flex items-center",
        isMessageFromMe
          ? "float-right flex-row-reverse text-left"
          : "float-left space-x-2",
        addSpace && "mt-6 md:mt-3"
      )}
    >
      {/** Sender */}
      {!isMessageFromMe && !areMessagesInRow && (
        <UserAvatar imageURL={sender?.account?.imageURL} />
      )}
      <div
        className={cn(
          " py-2 px-4 rounded-3xl max-w-fit",
          isMessageFromMe ? " bg-myMSG" : "bg-strangerMSG",
          areMessagesInRow && !isMessageFromMe && "ml-[2.7rem]"
        )}
      >
        {/** Content */}
        <p
          className="text-[14px] sm:text-md max-w-[250px] sm:max-w-[400px]"
          style={{ overflowWrap: "break-word" }}
        >
          {message.content}
        </p>
      </div>
    </div>
  );
};

export default Message;
