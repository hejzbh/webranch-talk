"use client";
import React from "react";
// Next
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
// TS
import { FormField } from "@/ts/types";
// NPM
import { z } from "zod";
import { extractInviteCodeFromURL } from "@/lib/utils";
import { useServerInviteCode } from "@/lib/(server)/use-server-invite-code";

// Components
const Form = dynamic(() => import("@/components/forms/Form"));

// Interface
interface InviteCodeFormProps {
  type: "use" | "manage";
  inviteCode?: string;
  afterOnSubmitDone?: (isSuccess: boolean) => void;
}

export const formSchema = z.object({
  inviteCode: z
    .string()
    .min(10, "Invite code should be at least 10 charachters"),
});

const formFields: FormField[] = [
  {
    name: "inviteCode",
    type: "input",
    label: "Enter your invite code",
  },
];

const InviteCodeForm = ({
  type,
  inviteCode = "",
  afterOnSubmitDone = () => {},
}: InviteCodeFormProps) => {
  const router = useRouter();

  async function useInviteCode(formData: z.infer<typeof formSchema>) {
    // 1)
    let { inviteCode } = formData;

    // 2)
    const isCodeLink =
      inviteCode.includes("https") || inviteCode.includes("servers");

    // 3)
    if (isCodeLink) inviteCode = extractInviteCodeFromURL(inviteCode);

    // 4)
    const joinedServer = await useServerInviteCode(inviteCode);

    // 5)
    router.push(`/servers/${joinedServer?.id}`);
  }

  async function regenerateInviteCode(formData: z.infer<typeof formSchema>) {}

  return (
    <Form
      formSchema={formSchema}
      formFields={formFields}
      onSubmitAction={type === "use" ? useInviteCode : regenerateInviteCode}
      afterOnSubmitDone={afterOnSubmitDone}
      defaultValues={{ inviteCode } as z.infer<typeof formSchema>}
      title="Use Invite Code"
      buttonTitle={type === "use" ? "Join Server" : "Re-generate link"}
      successMSG={
        type === "use" ? "Welcome to the new server" : "New code is generated"
      }
    />
  );
};

export default InviteCodeForm;
