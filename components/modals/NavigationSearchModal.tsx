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
import { useModalControl } from "../providers/ModalProvider";
// Interface
interface NavigationSearchModalProps {}

const NavigationSearchModal = ({}: NavigationSearchModalProps) => {
  const { type, isOpen, onClose } = useModalControl();

  const isModalOpen = isOpen && type === "navigationSearch";

  return (
    <CommandDialog open={isModalOpen} onOpenChange={onClose}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default NavigationSearchModal;
