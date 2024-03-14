import React from "react";
// Components
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/Dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModalControl } from "@/components/providers/ModalProvider";

const CreateServerModal = () => {
  const { type, isOpen, onClose } = useModalControl();

  const isModalOpen = type === "createServer" && isOpen;

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <Tabs defaultValue="server" className="w-full my-5">
          {/** Header */}
          <DialogHeader>
            {/** Tabs */}{" "}
            <TabsList className="w-full">
              <TabsTrigger className="w-full" value="server">
                Create Server
              </TabsTrigger>
              <TabsTrigger className="w-full" value="invite">
                Use Invite Code
              </TabsTrigger>
            </TabsList>
          </DialogHeader>
          {/** Tabs Content */}
          <TabsContent value="server">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="invite">Change your password here.</TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerModal;
