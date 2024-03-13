"use client";
import React from "react";
// Clerk
import { UserButton } from "@clerk/nextjs";
// Lib
import { cn } from "@/lib/utils";
// Props
interface AccountWidgetProps {
  className?: string;
  account: {
    name: string;
    email: string;
    imageURL: string;
    birthday?: string | null;
  };
}

const AccountWidget = ({ className = "", account }: AccountWidgetProps) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {/** Settings */}
      <UserButton
        appearance={{
          elements: {
            avatarBox: {
              width: 45,
              height: 45,
            },
          },
        }}
        afterSignOutUrl="/"
      />
      {/** Information */}
      <div>
        <h2 className="text-primary">{account?.name}</h2>
        <p className="text-secondary text-sm">{account?.email}</p>
      </div>
    </div>
  );
};

export default AccountWidget;
