"use client";
import React from "react";
// Providers
import { useSocket } from "./providers/SocketProvider";

const SocketStatus = () => {
  const { isListeningToServer } = useSocket();
  return (
    <span
      className={`p-3 rounded-full ${
        isListeningToServer ? "bg-green-500" : "bg-red-500"
      }`}
    ></span>
  );
};

export default SocketStatus;
