import React, { useEffect } from "react";
// NEXT
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
// NPM
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// TS
import { FormField } from "@/ts/types";
// Lib
import { cn } from "@/lib/utils";

// Components
import { useNotifications } from "@/components/providers/NotificationsProvider";
const Input = dynamic(() => import("@/components/ui/Input"));
const FileUpload = dynamic(() => import("@/components/FileUpload"));
const Button = dynamic(() => import("@/components/ui/Button"));
const RadioGroup = dynamic(() => import("@/components/ui/RadioGroup"));
const TextEditor = dynamic(() => import("@/components/TextEditor"));

// Props
interface FormProps {
  className?: string;
  onSubmitAction: (formData: any) => Promise<void>; // eslint-disable-line
  afterOnSubmitDone?: (isSuccessRequest: boolean) => void; // eslint-disable-line
  formSchema: z.ZodObject<any>;
  defaultValues: any;
  formFields: FormField[];
  title: string;
  successMSG?: string;
  successKey?: string;
  buttonTitle: string;
}

const Form = ({
  title,
  successMSG = "",
  className = "",
  buttonTitle = "Create",
  formSchema,
  defaultValues,
  formFields = [],
  successKey = "",
  onSubmitAction,
  afterOnSubmitDone = () => {},
}: FormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const disabled = form?.formState.isSubmitting;

  const router = useRouter();

  const { showNotification } = useNotifications();

  useEffect(() => {
    if (!defaultValues) return;
    const valuesEntries = Object.entries(defaultValues);

    for (const [key, value] of valuesEntries) {
      form.setValue(key, value);
    }
  }, [defaultValues]); // eslint-disable-line

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      // 1)
      await onSubmitAction(formData);
      // 2)
      showNotification({
        title,
        message: successMSG.replaceAll("[success_key]", formData[successKey]),
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

      const errorMsg = err?.response?.data || err?.message;

      showNotification(
        {
          title: "Create Server",
          message: errorMsg,
          variant: "error",
        },
        5000
      );
    }
  };

  const onImageUploaded = (imageURL?: string) =>
    form.setValue("imageURL", imageURL || "");

  const onTextContentChange = (name: string, content: string) =>
    form.setValue(name, content || "");

  return (
    <form
      className={cn("w-full space-y-5", className)}
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
                error={form?.formState?.errors[field.name]?.message as string}
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
                disabled={field.disabled || disabled}
                type={field.inputType}
                register={form.register}
                className="w-full"
                error={form?.formState?.errors[field.name]?.message as string}
              />
            );
          // 3) Radio
          case "radio":
            return (
              <RadioGroup
                key={idx}
                {...field}
                disabled={field.disabled || disabled}
                label={field.label}
                name={field.name}
                register={form.register}
                choices={field.radioChoices as any[]}
                error={form?.formState?.errors[field.name]?.message as string}
              />
            );
          // 4) Text editor
          case "textEditor":
            return (
              <TextEditor
                key={idx}
                label={field.label}
                value={form.watch(field.name)}
                error={form?.formState?.errors[field.name]?.message as string}
                onChange={(content) => {
                  onTextContentChange(field.name, content);
                }}
              />
            );
          default:
            return null;
        }
      })}
      <Button
        disabled={disabled}
        type="submit"
        title={buttonTitle}
        className="float-right mt-5 disabled:opacity-50"
      />
    </form>
  );
};

export default Form;
