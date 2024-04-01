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
const TextEditor = dynamic(() => import("@/components/TextEditor"));

const ManageTaskModal = () => {
  const { type, isOpen, onClose, data } = useModalControl();

  const isModalOpen = type === "manageTask" && isOpen;

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        {/** Header */}
        <DialogHeader className="mb-10">
          {" "}
          <DialogTitle className="text-center text-white">
            Task: {data?.task?.name}
          </DialogTitle>
        </DialogHeader>
        {/** Body */}
        <main>
          <TextEditor
            value={data?.task?.content as string}
            onChange={() => {}}
          />
        </main>
      </DialogContent>
    </Dialog>
  );
};

export default ManageTaskModal;
