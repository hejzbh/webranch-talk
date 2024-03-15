import * as React from "react";

import { cn } from "@/lib/utils";

const classes = {
  default:
    "border-2 p-3 rounded-md max-w-[280px] md:max-w-[320px] min-w-[280px]",
  success: "bg-[limegreen]/70",
  error: "bg-red-500",
};

export const Notification = ({
  variant,
  children,
}: {
  variant: "error" | "success";
  children: React.ReactNode;
}) => {
  return (
    <div className={cn(classes.default, classes[variant])}>{children}</div>
  );
};

export const NotificationTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <h2 className="text-lg font-semibold">{children}</h2>;
};

export const NotificationDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <p className="text-md text-gray-200">{children}</p>;
};
