"use client";
import React from "react";
// Next
import dynamic from "next/dynamic";
// TS
import { FormField } from "@/ts/types";
// NPM
import { z } from "zod";
// Prisma / TS
import { ServerChannelType } from "@prisma/client";
import { createServerChannel } from "@/lib/(serverChannel)/create-channel";
import { useRouter } from "next/navigation";
import { channelRoute } from "@/lib/(routes)/channel-route";
// Components
const Form = dynamic(() => import("@/components/forms/Form"));

// Interface
interface CreateChannelFormProps {
  className?: string;
  afterOnSubmitDone?: (isSuccess: boolean) => void;
  serverID: string;
  channelType?: ServerChannelType;
}

export const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20, "Name should be less than 20 characters"),
  type: z.nativeEnum(ServerChannelType),
});

const formFields: FormField[] = [
  {
    name: "name",
    type: "input",
    label: "Channel name",
  },
  {
    name: "type",
    type: "radio",
    label: "Channel type",
    radioChoices: [
      ServerChannelType.TEXT,
      ServerChannelType.AUDIO,
      ServerChannelType.VIDEO,
      ServerChannelType.TODO,
    ],
  },
];

const CreateChannelForm = ({
  className = "",
  afterOnSubmitDone = () => {},
  serverID,
  channelType = ServerChannelType.TEXT,
}: CreateChannelFormProps) => {
  const router = useRouter();

  const onFormSubmit = async (formData: z.infer<typeof formSchema>) => {
    // 1)
    const newChannel = await createServerChannel({
      serverID,
      channelData: formData,
    });
    // 2)
    router.push(
      channelRoute({
        serverID,
        channelID: newChannel.id,
        channelType: newChannel.type,
      })
    );
  };

  return (
    <Form
      formSchema={formSchema}
      formFields={formFields}
      onSubmitAction={onFormSubmit}
      afterOnSubmitDone={afterOnSubmitDone}
      defaultValues={
        { name: "", type: channelType } as z.infer<typeof formSchema>
      }
      title="Create Channel"
      buttonTitle="Create"
      successMSG={`You've successfully created [success_key] channel`}
      successKey="name"
      className={`${className}`}
    />
  );
};

export default CreateChannelForm;
