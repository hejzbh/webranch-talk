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
  const [sockeData, setSocketData] = useState<SocketContextData>({
    socket: null,
    isListeningToServer: false,
  });

  useEffect(() => {
    // 1)
    const socket = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    // 2)
    socket.on("connect", () =>
      setSocketData((socketData) => ({
        ...socketData,
        isListeningToServer: true,
      }))
    );

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
  }, []);

  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
