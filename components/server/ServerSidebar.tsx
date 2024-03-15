import React from "react";
// TS
import { DetailedServer } from "@/ts/types";
// Props
interface ServerSidebarProps {
  server: DetailedServer;
}

const ServerSidebar = async ({ server }: ServerSidebarProps) => {
  return (
    <div
      className="bg-red-500 h-full flex-1 border-l-2 border-border-common-2"
      style={{
        background:
          "radial-gradient(circle, rgba(26,27,31,1) 0%, rgba(26,27,31,1) 35%, rgba(18,18,22,1) 100%)",
      }}
    >
      {server?.name}
    </div>
  );
};

export default ServerSidebar;
