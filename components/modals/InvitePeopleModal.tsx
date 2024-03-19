import React from "react";
// Next
import dynamic from "next/dynamic";
// Components
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
//
import { useModalControl } from "../providers/ModalProvider";
import { useOrigin } from "@/lib/use-origin";
const InviteCodeForm = dynamic(
  () => import("@/components/forms/(server)/InviteCodeForm")
);

const InvitePeopleModal = () => {
  const { type, isOpen, onClose, data } = useModalControl();

  const isModalOpen = type === "invitePeople" && isOpen;

  const server = data?.server;

  const origin = useOrigin();

  const inviteCode = `${origin}/invite/${data?.server?.inviteCode}`;

  if (!isModalOpen || !server) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        {/** Header */}
        <DialogHeader className="mb-10">
          {" "}
          <DialogTitle className="text-center text-white">
            Invite people to <span className="text-main">{server?.name}</span>
          </DialogTitle>
          <DialogDescription className="text-center text-md">
            Copy server's invite code and share with your partners
          </DialogDescription>
        </DialogHeader>
        {/** Code */}
        <InviteCodeForm type="manage" inviteCode={inviteCode} />
      </DialogContent>
    </Dialog>
  );
};

export default InvitePeopleModal;
