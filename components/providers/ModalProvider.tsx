"use client";

import { createContext, useContext, useState } from "react";

export type ModalType = "navigationSearch";

export interface ModalData {}

const ModalControlContext = createContext({});

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
      {children}
    </ModalControlContext.Provider>
  );
};

export const useModalControl = () =>
  useContext(ModalControlContext) as ModalStoreWithFunctions;

export default ModalControlProvider;
