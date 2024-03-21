"use client";
// React
import { createContext, useContext, useEffect, useState } from "react";
// NPM
import ClientIO from "socket.io-client";

// Types
export type SocketContextData = {
  socket: any;
  isListeningToServer: boolean;
};

// ...

const SocketContext = createContext({});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const [sockeData, setSocketData] = useState<SocketContextData>({
    socket: null,
    isListeningToServer: false,
  });

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }

    // 1)
    const socket = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
      path: "/api/socket/io",
      addTrailingSlash: false,
      reconnection: true,
      reconnectionAttempts: 500,
      reconnectionDelayMax: 5000,
      reconnectionDelay: 1000,
      transports: ["polling", "websocket"],
    });

    // 2)
    socket.on("connect", () => {
      setSocketData((socketData) => ({
        ...socketData,
        isListeningToServer: true,
      }));
    });

    // 3)
    socket.on("disconnect", () =>
      setSocketData((socketData) => ({
        ...socketData,
        isListeningToServer: false,
      }))
    );

    // 4)
    setSocketData((socketData) => ({ ...socketData, socket }));

    return () => socket.disconnect();
  }, [isMounted]);

  return (
    <SocketContext.Provider value={sockeData}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext) as SocketContextData;

export default SocketProvider;
