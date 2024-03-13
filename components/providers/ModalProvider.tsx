"use client";
import { createContext, useContext, useState } from "react";
// Next
import dynamic from "next/dynamic";
// Modals
const NavigationSearchModal = dynamic(
  () => import("@/components/modals/NavigationSearchModal")
);
// Types
export type ModalType = "navigationSearch";

export interface ModalData {}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
}

type ModalStoreWithFunctions = ModalStore & {
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
  toggleModal: (type: ModalType, data?: ModalData) => void;
};

// Provider
const ModalControlContext = createContext({});

export const ModalControlProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modalStore, setModalStore] = useState<ModalStore>({
    type: null,
    data: {},
    isOpen: false,
  });

  function toggleModal(type: ModalType, data?: ModalData) {
    if (modalStore.isOpen) {
      onClose();
    } else {
      onOpen(type, data);
    }
  }

  function onOpen(type: ModalType, data?: ModalData) {
    setModalStore((modalStore: ModalStore) => ({
      ...modalStore,
      isOpen: true,
      type,
      data: data || {},
    }));
  }

  function onClose() {
    setModalStore((modalStore: ModalStore) => ({
      ...modalStore,
      isOpen: false,
      type: null,
      data: {},
    }));
  }

  return (
    <ModalControlContext.Provider
      value={{ ...modalStore, onOpen, onClose, toggleModal }}
    >
      <NavigationSearchModal />
      {children}
    </ModalControlContext.Provider>
  );
};

// Use modal control
export const useModalControl = () =>
  useContext(ModalControlContext) as ModalStoreWithFunctions;

export default ModalControlProvider;
