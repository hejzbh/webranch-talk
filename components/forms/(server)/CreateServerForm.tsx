"use client";
import React from "react";
// Next
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
// TS
import { FormField } from "@/ts/types";
// NPM
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
// Lib
import { cn } from "@/lib/utils";
// Components
import { useNotifications } from "@/components/providers/NotificationsProvider";
const Input = dynamic(() => import("@/components/ui/Input"));
const FileUpload = dynamic(() => import("@/components/FileUpload"));
const Button = dynamic(() => import("@/components/ui/Button"));

// Interface
interface CreateServerFormProps {
  className?: string;
  afterOnSubmitDone?: (isSuccess: boolean) => void;
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

const CreateServerForm = ({
  className = "",
  afterOnSubmitDone = () => {},
}: CreateServerFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageURL: "",
    },
  });

  const { showNotification } = useNotifications();
  const router = useRouter();

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      // 1)
      await axios.post(`/api/servers/`, formData);
      // 2)
      showNotification({
        title: "Create Server",
        message: `You successfully created a  ${formData?.name} server`,
        variant: "success",
      });
      //3)
      router.refresh();
      // 4)
      form.reset();
      // 5)
      afterOnSubmitDone(true);
    } catch (err: any) {
      afterOnSubmitDone(false);
      showNotification(
        {
          title: "Create Server",
          message: err?.response?.data || err?.message,
          variant: "error",
        },
        5000
      );
    }
  };

  const onImageUploaded = (imageURL?: string) =>
    form.setValue("imageURL", imageURL || "");

  return (
    <form
      className={cn("w-full", className)}
      onSubmit={form.handleSubmit(onSubmit)}
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
                error={form?.formState?.errors?.imageURL?.message}
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
      <Button type="submit" title="Create" className="float-right mt-5" />
    </form>
  );
};

export default CreateServerForm;
