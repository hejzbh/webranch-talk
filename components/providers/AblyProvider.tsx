"use client";
// React
import { useContext, createContext, useEffect } from "react";
// NPM
import * as Ably from "ably";
import { AblyProvider as AblyProviderReact } from "ably/react";

const AblyContext = createContext({});

export const AblyProvider = ({ children }: { children: React.ReactNode }) => {
  const ablySocket = new Ably.Realtime.Promise({ authUrl: "/api/ably" });

  ablySocket.connection.on("connected", () => {
    console.log("🤣🤣🤣🤣");
  });

  ablySocket.connection.on("disconnected", () => {
    console.log(":((:(:(:(:");
  });

  return (
    <AblyContext.Provider value={{}}>
      <AblyProviderReact client={ablySocket}>{children}</AblyProviderReact>
    </AblyContext.Provider>
  );
};

export const useCurrentAccount = () => {
  return useContext(AblyContext) as any;
};

export default AblyProvider;
