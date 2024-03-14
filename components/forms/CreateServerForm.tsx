"use client";
import React from "react";
// Next
import dynamic from "next/dynamic";
// TS
import { FormField } from "@/ts/types";
// NPM
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Lib
import { cn } from "@/lib/utils";
// Components
const Input = dynamic(() => import("@/components/ui/Input"));
const FileUpload = dynamic(() => import("@/components/FileUpload"));

// Interface
interface CreateServerFormProps {
  className?: string;
}

const formSchema = z.object({
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

const CreateServerForm = ({ className = "" }: CreateServerFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageURL: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {};

  const onImageUploaded = (imageURL?: string) =>
    form.setValue("imageURL", imageURL || "");

  return (
    <form
      className={cn("w-full", className)}
      onSubmit={() => form.handleSubmit(onSubmit)}
    >
      {formFields?.map((field, idx) => {
        switch (field.type) {
          // 1) FILE UPLOAD
          case "file":
            return (
              <FileUpload
                key={idx}
                label={field.label}
                value={form.watch(field.name as "imageURL")}
                endpoint="serverImage"
                onChange={onImageUploaded}
                className="max-w-fit mx-auto text-center"
              />
            );
          // 2) INPUT
          case "input":
            return (
              <Input
                key={idx}
                {...field}
                type={field.inputType}
                register={form.register}
                className="w-full"
                error={form?.formState?.errors?.name?.message}
              />
            );
          default:
            return null;
        }
      })}

      <button type="submit">Click</button>
    </form>
  );
};

export default CreateServerForm;
