// TS
import { Message } from "@/ts/types";
// NPM
import { useChannel } from "ably/react";

export const useChatSocket = ({
  newMessageSocketKey,
  onNewMessageRecieved,
  onMessageDeleted,
  onMessageEdited,
  channelID,
}: {
  newMessageSocketKey?: string;
  onNewMessageRecieved?: (message: Message) => void;
  onMessageEdited?: (message: Message) => void;
  onMessageDeleted?: (messageID: string) => void;
  channelID: string;
}) => {
  const { channel: socketChannel } = useChannel(channelID);

  return {
    socketChannel,
  };
};
