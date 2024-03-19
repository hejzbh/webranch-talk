"use client";
import React from "react";
// Next
import dynamic from "next/dynamic";
// Prisma & Types
import { DetailedServer, ServerMemberWithAccount } from "@/ts/types";
import { Server } from "@prisma/client";
// Components
const ServerMember = dynamic(() => import("./ServerMember"));

// Props
interface ServerMembersProps {
  members: ServerMemberWithAccount[];
  server: DetailedServer | Server;
}

const ServerMembers = ({ members = [], server }: ServerMembersProps) => {
  // TODO: Naparaviti da se na klik vodi u inbox...

  return (
    <ul className="space-y-3">
      {members?.map((member) => {
        return (
          <li key={member.id}>
            <ServerMember member={member} server={server as DetailedServer} />
          </li>
        );
      })}
    </ul>
  );
};

export default ServerMembers;
