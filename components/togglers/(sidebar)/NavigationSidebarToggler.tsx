import React from "react";
// Next
import dynamic from "next/dynamic";
// Icons
import { Menu } from "lucide-react";
// Components
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { DetailedServer } from "@/ts/types";
const ServerSidebar = dynamic(
  () => import("@/components/server/ServerSidebar")
);

// Props
interface ServerSidebarTogglerProps {
  server: DetailedServer;
}

const ServerSidebarToggler = async ({ server }: ServerSidebarTogglerProps) => {
  if (!server) return null;

  return (
    <Sheet>
      {/** Toggler */}
      <SheetTrigger asChild>
        <button
          title={`Open ${server.name} sidebar`}
          className="border border-gray-700 rounded-md p-1"
        >
          {" "}
          <Menu className="text-white" size={23} />
        </button>
      </SheetTrigger>
      {/** Sidebar */}
      <SheetContent
        side="right"
        className="p-0 flex gap-0 w-full max-w-[90%] border-none bg-none"
      >
        <ServerSidebar server={server} />
      </SheetContent>
    </Sheet>
  );
};

export default ServerSidebarToggler;
