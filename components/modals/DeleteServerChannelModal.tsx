import React, { useMemo } from "react";
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
import { useNotifications } from "../providers/NotificationsProvider";
import { deleteServerChannel } from "@/lib/(serverChannel)/delete-channel";
import { useParams, useRouter } from "next/navigation";
const DeclineOrSubmit = dynamic(() => import("@/components/DeclineOrSubmit"));

const DeleteServerChannelModal = () => {
  const { type, isOpen, onClose, data } = useModalControl();
  const { showNotification } = useNotifications();

  const router = useRouter();
  const params = useParams();

  const isUserCurrentlyInChannel = useMemo(
    () => params.channelID === data?.channel?.id,
    [params.channelID, data?.channel]
  );

  const isModalOpen = type === "deleteServerChannel" && isOpen;

  async function onDelete() {
    try {
      if (!data.channel) throw new Error("Channel data is missing in model");

      // 1)
      const deletedChannel = await deleteServerChannel(data.channel);

      // 2)
      if (!deletedChannel) throw new Error("Something went wrong");

      // 3)
      showNotification({
        title: "Channel delete",
        message: "Channel is successfully deleted",
        variant: "success",
      });

      // 4)

      if (isUserCurrentlyInChannel) {
        router.push(`/servers/${data?.channel.serverID}`);
      }

      router.refresh();

      // 5)
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
            <span className="text-main">{data?.channel?.name}</span> channel ?
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

export default DeleteServerChannelModal;
