import React from "react";
// Next
import dynamic from "next/dynamic";
// Components
import { Dialog, DialogHeader, DialogContent } from "@/components/ui/Dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
//
import { useModalControl } from "@/components/providers/ModalProvider";
const CreateServerForm = dynamic(
  () => import("@/components/forms/(server)/CreateServerForm")
);
const InviteCodeForm = dynamic(
  () => import("@/components/forms/(server)/InviteCodeForm")
);

const CreateServerModal = () => {
  const { type, isOpen, onClose } = useModalControl();

  const isModalOpen = type === "createServer" && isOpen;

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <Tabs defaultValue="server" className="w-full my-5">
          {/** Header */}
          <DialogHeader className="mb-10">
            <TabsList className="w-full">
              <TabsTrigger className="w-full" value="server">
                Create Server
              </TabsTrigger>
              <TabsTrigger className="w-full" value="inviteCode">
                Use Invite Code
              </TabsTrigger>
            </TabsList>
          </DialogHeader>
          {/** Tabs Content */}
          <TabsContent value="server">
            <CreateServerForm
              afterOnSubmitDone={(created) => (created ? onClose() : {})}
            />
          </TabsContent>
          <TabsContent value="inviteCode">
            <InviteCodeForm type="use" afterOnSubmitDone={onClose} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerModal;
