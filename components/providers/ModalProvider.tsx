"use client";
import { createContext, useContext, useState } from "react";
// Next
import dynamic from "next/dynamic";
// TS
import {
  DetailedServer,
  NavigationSearchData,
  ServerSearchData,
} from "@/ts/types";
import { Server, ServerChannel, ServerChannelType } from "@prisma/client";
// Modals
const NavigationSearchModal = dynamic(
  () => import("@/components/modals/NavigationSearchModal")
);
const CreateServerModal = dynamic(
  () => import("@/components/modals/CreateServerModal")
);
const InvitePeopleModal = dynamic(
  () => import("@/components/modals/InvitePeopleModal")
);
const CreateServerChannelModal = dynamic(
  () => import("@/components/modals/CreateServerChannelModal")
);
const ServerSearchModal = dynamic(
  () => import("@/components/modals/ServerSearchModal")
);
const ServerMembersModal = dynamic(
  () => import("@/components/modals/ServerMembersModal")
);
const DeleteServerChannelModal = dynamic(
  () => import("@/components/modals/DeleteServerChannelModal")
);

// Types
export type ModalType =
  | "navigationSearch"
  | "serverSearch"
  | "createServer"
  | "serverMembers"
  | "createServerChannel"
  | "deleteServerChannel"
  | "deleteServer"
  | "leaveServer"
  | "invitePeople"
  | "serverSettings";

export interface ModalData {
  navigationSearchData?: NavigationSearchData;
  serverSearchData?: ServerSearchData;
  server?: DetailedServer | Server;
  channelType?: ServerChannelType;
  channel?: ServerChannel;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
}

type ModalStoreWithFunctions = ModalStore & {
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
  toggleModal: (type: ModalType, data?: ModalData) => void;
  changeData: (data: ModalData) => void;
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

  function changeData(data: ModalData) {
    setModalStore((modalStore: ModalStore) => ({
      ...modalStore,
      data,
    }));
  }

  return (
    <ModalControlContext.Provider
      value={{ ...modalStore, onOpen, onClose, toggleModal, changeData }}
    >
      <NavigationSearchModal />
      <CreateServerModal />
      <InvitePeopleModal />
      <CreateServerChannelModal />
      <ServerSearchModal />
      <ServerMembersModal />
      <DeleteServerChannelModal />
      {children}
    </ModalControlContext.Provider>
  );
};

// Use modal control
export const useModalControl = () =>
  useContext(ModalControlContext) as ModalStoreWithFunctions;

export default ModalControlProvider;
