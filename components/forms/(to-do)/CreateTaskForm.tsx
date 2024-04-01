"use client";
import React from "react";
// Next
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
// TS
import { FormField } from "@/ts/types";
// NPM
import { z } from "zod";
import { createTask } from "@/lib/(tasks)/create-task";
// Components
const Form = dynamic(() => import("@/components/forms/Form"));

// Interface
interface CreateTaskFormProps {
  className?: string;
  afterOnSubmitDone?: (isSuccess: boolean) => void; // eslint-disable-line
  channelID: string;
}

export const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name should be less than 50 characters"),
  content: z.string().min(1, "Content is required"),
});

const formFields: FormField[] = [
  {
    name: "name",
    type: "input",
    label: "Task name",
  },
  {
    name: "content",
    type: "textEditor",
    label: "Content",
  },
];

const CreateTaskForm = ({
  className = "",
  afterOnSubmitDone = () => {},
  channelID,
}: CreateTaskFormProps) => {
  const router = useRouter();

  const onFormSubmit = async (formData: z.infer<typeof formSchema>) => {
    // 1)
    await createTask({ data: formData, channelID });
    // 2)
    router.refresh();
  };

  return (
    <Form
      formSchema={formSchema}
      formFields={formFields}
      onSubmitAction={onFormSubmit}
      afterOnSubmitDone={afterOnSubmitDone}
      defaultValues={{ name: "", content: "" } as z.infer<typeof formSchema>}
      title="Create Task"
      buttonTitle="Create"
      successMSG={`You've successfully created task`}
      successKey="name"
      className={`${className}`}
    />
  );
};

export default CreateTaskForm;
