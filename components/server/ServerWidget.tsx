import React from "react";
// Next
import dynamic from "next/dynamic";
import Image from "next/image";
// Lib
import { cn } from "@/lib/utils";
// TS
import { DetailedServer } from "@/ts/types";
import { Account } from "@prisma/client";
// Components
const ServerOptions = dynamic(
  () => import("@/components/server/ServerOptions")
);

// Props
interface ServerWidgetProps {
  className?: string;
  server: DetailedServer;
  currentAccount: Account;
}

const ServerWidget = ({
  className = "",
  server,
  currentAccount,
}: ServerWidgetProps) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {/** Image & Name */}
      <div className="flex items-center space-x-1">
        <Image
          src={server.imageURL}
          width={35}
          height={35}
          className="w-10 h-10 rounded-full object-cover mr-2"
          loading="lazy"
          alt={server.name + " photo"}
        />
        <h2>{server.name}</h2>
      </div>
      {/** Settings */}
      <ServerOptions currentAccount={currentAccount} server={server} />
    </div>
  );
};

export default ServerWidget;
