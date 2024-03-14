import React from "react";
// Components
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/Command";
import { useModalControl } from "@/components/providers/ModalProvider";

const CreateServerModal = () => {
  const { type, isOpen, onClose } = useModalControl();

  const isModalOpen = type === "createServer" && isOpen;

  if (!isModalOpen) return null;

  return (
    <CommandDialog open={isModalOpen} onOpenChange={onClose}>
      CreateServerForm
    </CommandDialog>
  );
};

export default CreateServerModal;
