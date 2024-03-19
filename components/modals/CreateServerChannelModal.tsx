import React from "react";
// Next
import dynamic from "next/dynamic";
// Components
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/Dialog";
//
import { useModalControl } from "@/components/providers/ModalProvider";
const CreateServerChannelForm = dynamic(
  () => import("@/components/forms/(server)/CreateServerChannelForm")
);

const CreateServerChannelModal = () => {
  const { type, isOpen, onClose, data } = useModalControl();

  const isModalOpen = type === "createServerChannel" && isOpen;

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        {/** Header */}
        <DialogHeader className="mb-10">
          {" "}
          <DialogTitle className="text-center text-white text-2xl">
            Create new channel
          </DialogTitle>
        </DialogHeader>
        {/** Body */}
        <main>
          <CreateServerChannelForm
            serverID={data?.server?.id as string}
            channelType={data?.channelType}
            afterOnSubmitDone={(isSuccess) => (isSuccess ? onClose() : {})}
          />
        </main>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerChannelModal;
