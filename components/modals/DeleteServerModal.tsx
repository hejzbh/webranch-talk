import React from "react";
// Next
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
// Components
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/Dialog";
//
import { useModalControl } from "@/components/providers/ModalProvider";
import { useNotifications } from "../providers/NotificationsProvider";
import { deleteServer } from "@/lib/(server)/delete-server";
const DeclineOrSubmit = dynamic(() => import("@/components/DeclineOrSubmit"));

const DeleteServerModal = () => {
  const { type, isOpen, onClose, data } = useModalControl();
  const { showNotification } = useNotifications();

  const router = useRouter();

  const isModalOpen = type === "deleteServer" && isOpen;

  async function onDelete() {
    try {
      // 1)
      if (!data?.server) throw new Error("Missing server data");

      // 2)
      const deletedServer = await deleteServer(data.server);

      // 3)
      if (!deletedServer) throw new Error("Something went wrong!");

      // 4)
      showNotification({
        title: "Server delete",
        message: "Server is successfully deleted",
        variant: "success",
      });

      // 5)
      router.push("/welcome");
      router.refresh();
      // 6)
      onClose();
    } catch (err: any) {
      const errorMsg = err?.response?.data || err?.message;

      showNotification(
        {
          title: "Create Server",
          message: errorMsg,
          variant: "error",
        },
        5000
      );
    }
  }

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        {/** Header */}
        <DialogHeader className="mb-10">
          {" "}
          <DialogTitle className="text-center text-white">
            Are you sure you want delete{" "}
            <span className="text-main">{data?.server?.name}</span> server ?
          </DialogTitle>
        </DialogHeader>
        {/** Body */}
        <main>
          <DeclineOrSubmit
            onSubmit={onDelete}
            onDecline={onClose}
            submitTitle="Delete"
          />
        </main>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServerModal;
