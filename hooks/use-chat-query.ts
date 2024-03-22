import { useEffect, useState } from "react";
// TS
import { Message, SocketApiURL } from "@/ts/types";
// NPM
import axios from "axios";

// Types
type DataState = {
  messages: Message[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  nextCursor: string | null;
  isLoading: boolean;
  page: number;
};

type DataReturned = DataState & {
  fetchNextPage: () => {};
  addNewMessage: (message: Message) => void;
  updateMessage: (message: Message) => void;
  deleteMessage: (messageID: string) => void;
};

// Props
interface ChatQueryProps {
  apiURL?: SocketApiURL;
  params?: {
    channelID?: string;
    serverID?: string;
  };
}

export const useChatQuery = ({ apiURL, params = {} }: ChatQueryProps) => {
  const [data, setData] = useState<DataState>({
    messages: [],
    hasNextPage: false,
    isFetchingNextPage: false,
    isLoading: true,
    nextCursor: null,
    page: 1,
  });
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
    // On first load get messages from first page (PAGE: 1)
    fetchMessages();
  }, [isMounted]);

  async function fetchMessages(cursor?: string, page?: number) {
    try {
      const response = await axios.get(
        `${apiURL}?cursor=${cursor}&page=${page || 1}&${Object.entries(params)
          ?.map(([key, value]) => `${key}=${value}`)
          .join("&")}`
      );

      const responseData = response.data;

      if (!responseData?.messages) {
        console.log("USE_CHAT_QUERY ERROR");
        return;
      }

      setData((data) => ({
        ...data,
        messages: [...responseData?.messages, ...data.messages], // Because chat start from bottom. ([newMessages, oldMessages]),
        page: +responseData.page,
        hasNextPage: responseData.hasNextPage,
        nextCursor: responseData.nextCursor,
      }));
    } finally {
      setTimeout(() => {
        setData((data) => ({ ...data, isLoading: false }));
      }, 250);
    }
  }

  async function fetchNextPage() {
    try {
      if (!data.hasNextPage || !data.nextCursor) return;
      // 2)
      setData((data) => ({ ...data, isFetchingNextPage: true }));
      // 3)
      const nextPage = data.page + 1;
      // 3)
      await fetchMessages(data.nextCursor, nextPage);
    } finally {
      setData((data) => ({ ...data, isFetchingNextPage: false }));
    }
  }

  function addNewMessage(newMessage: Message) {
    // TODO: Dodati check da li message vec postoji (Trebalo bi da je nemoguca ova situacija, ali za svaki slucaj !)
    // 1)
    if (!newMessage) return;
    // 4)
    setData((data) => ({
      ...data,
      messages: [...data.messages, newMessage],
    }));
  }
  function updateMessage() {}
  function deleteMessage() {}

  return {
    ...data,
    fetchNextPage,
    addNewMessage,
    updateMessage,
    deleteMessage,
  } as DataReturned;
};
