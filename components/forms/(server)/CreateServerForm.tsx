"use client";
import React from "react";
// Next
import dynamic from "next/dynamic";
// TS
import { FormField } from "@/ts/types";
// NPM
import { z } from "zod";
// Lib
import { createServer } from "@/lib/(server)/create-server";
// Components
const Form = dynamic(() => import("@/components/forms/Form"));

// Interface
interface CreateServerFormProps {
  className?: string;
  afterOnSubmitDone?: (isSuccess: boolean) => void;
}

export const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20, "Name should be less than 20 characters"),
  imageURL: z.string().min(1, "Image is required"),
});

const formFields: FormField[] = [
  {
    name: "imageURL",
    type: "file",
    label: "Server Image",
  },
  {
    name: "name",
    type: "input",
    label: "Server name",
  },
];

const CreateServerForm = ({
  className = "",
  afterOnSubmitDone = () => {},
}: CreateServerFormProps) => {
  const onFormSubmit = async (formData: z.infer<typeof formSchema>) => {
    await createServer(formData);
  };

  return (
    <Form
      formSchema={formSchema}
      formFields={formFields}
      onSubmitAction={onFormSubmit}
      afterOnSubmitDone={afterOnSubmitDone}
      defaultValues={{ name: "", imageURL: "" } as z.infer<typeof formSchema>}
      title="Create Server"
      buttonTitle="Create"
      successMSG={`You've successfully created [success_key] server`}
      successKey="name"
      className={`${className}`}
    />
  );
};

export default CreateServerForm;
