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
import { refreshServerInviteCode } from "@/lib/(server)/refresh-server-invite-code";
import { useModalControl } from "@/components/providers/ModalProvider";

// Components
const Form = dynamic(() => import("@/components/forms/Form"));

// Interface
interface InviteCodeFormProps {
  type: "use" | "manage";
  inviteCode?: string;
  afterOnSubmitDone?: (isSuccess: boolean) => void; // eslint-disable-line
}

export const formSchema = z.object({
  inviteCode: z.string().min(10, "Please enter valid invite code"),
});

const formFieldsTypeUse: FormField[] = [
  {
    name: "inviteCode",
    type: "input",
    label: "Enter your invite code",
  },
];

const formFieldsTypeManage: FormField[] = [
  {
    name: "inviteCode",
    type: "input",
    label: "Invite code",
    disabled: true,
  },
];

const InviteCodeForm = ({
  type,
  inviteCode = "",
  afterOnSubmitDone = () => {},
}: InviteCodeFormProps) => {
  const router = useRouter();
  const { changeData } = useModalControl();

  async function useInviteCode(formData: z.infer<typeof formSchema>) {
    // 1)
    let { inviteCode } = formData;

    // 2)
    const isCodeLink =
      inviteCode.includes("https") || inviteCode.includes("invite");

    // 3)
    if (isCodeLink) inviteCode = extractInviteCodeFromURL(inviteCode);

    // 4)
    const joinedServer = await useServerInviteCode(inviteCode);

    // 5)
    router.push(`/servers/${joinedServer?.id}`);
  }

  async function regenerateInviteCode(formData: z.infer<typeof formSchema>) {
    // 1)
    let { inviteCode } = formData;

    // 2)
    inviteCode = extractInviteCodeFromURL(inviteCode);

    // 3)
    const serverWithNewCode = await refreshServerInviteCode(inviteCode);

    // 4)
    changeData({ server: serverWithNewCode });

    // 5)
    router.refresh();
  }

  return (
    <Form
      formSchema={formSchema}
      formFields={type === "manage" ? formFieldsTypeManage : formFieldsTypeUse}
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
