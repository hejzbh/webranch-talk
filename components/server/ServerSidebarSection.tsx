"use client";
import React from "react";
// Lib
import { cn } from "@/lib/utils";
// Components
import { ModalType, useModalControl } from "../providers/ModalProvider";
// TS
import { DetailedServer } from "@/ts/types";
// Constants
import { modalIcons } from "@/constants/icons";

// Props
interface ServerSidebarSectionProps {
  className?: string;
  title: string;
  children: React.ReactNode;
  modalType?: ModalType;
  server: DetailedServer;
}

const ServerSidebarSection = ({
  className = "",
  title = "",
  children = <></>,
  server,
  modalType,
}: ServerSidebarSectionProps) => {
  const { onOpen } = useModalControl();

  const Icon = modalType && (modalIcons as any)[modalType];

  return (
    <section className={cn("bg-black p-3 rounded-xl", className)}>
      {/** Heading */}
      <div className="flex items-center justify-between mb-4">
        {/** Title */}
        <h2 className="text-[0.9rem] md:text-lg">{title}</h2>
        {/** Toggle modal */}
        {modalType && (
          <button
            className="group"
            onClick={() => onOpen(modalType, { server })}
          >
            {
              <Icon
                size={22}
                className="group-hover:text-actionHover transition-all duration-300 ease-in-out"
              />
            }
          </button>
        )}
      </div>
      {/** Content */}
      <main>{children}</main>
    </section>
  );
};

export default ServerSidebarSection;
