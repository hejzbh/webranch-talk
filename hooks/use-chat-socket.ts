import { useEffect } from "react";
// Components
import { useSocket } from "@/components/providers/SocketProvider";
// TS
import { Message } from "@/ts/types";

export const useChatSocket = ({
  newMessageSocketKey,
  onNewMessageRecieved,
  onMessageDeleted,
  onMessageEdited,
}: {
  newMessageSocketKey: string;
  onNewMessageRecieved: (message: Message) => void;
  onMessageEdited: (message: Message) => void;
  onMessageDeleted: (messageID: string) => void;
}) => {
  const socket = useSocket();

  useEffect(() => {
    /** TODO: Svakih 10 sekundi nek pravi request */
    if (!socket.isListeningToServer) return;

    socket.socket.on(newMessageSocketKey, onNewMessageRecieved);

    return () => {
      socket.socket.off(newMessageSocketKey);
    };
  }, [socket, newMessageSocketKey]); // eslint-disable-line

  return null;
};
