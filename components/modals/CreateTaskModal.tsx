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
const CreateTaskForm = dynamic(
  () => import("@/components/forms/(to-do)/CreateTaskForm")
);

const CreateTaskModal = () => {
  const { type, isOpen, onClose, data } = useModalControl();

  const isModalOpen = type === "createTask" && isOpen;

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        {/** Header */}
        <DialogHeader className="mb-10">
          {" "}
          <DialogTitle className="text-center text-white">
            Create new task
          </DialogTitle>
        </DialogHeader>
        {/** Body */}
        <main>
          <CreateTaskForm />
        </main>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskModal;
