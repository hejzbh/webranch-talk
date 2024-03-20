"use client";
import React from "react";
import { createContext, useContext, useState } from "react";
// Components
import {
  Notification,
  NotificationTitle,
  NotificationDescription,
} from "@/components/ui/Notification";
// Lib
import { cn } from "@/lib/utils";

// Props
type NotificationType = {
  title: string;
  message: string;
  variant: "error" | "success";
};

export const NOTIFICATION_DURATION_VALUE = 4000;

const NotificationsContext = createContext({});

const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [notification, setNotification] = useState<NotificationType | null>();

  const showNotification = (
    newNotification: NotificationType,
    hideAfter?: number
  ) => {
    // 1)
    if (notification) setNotification(null);
    // 2)
    setNotification(newNotification);
    // 3)
    setTimeout(() => {
      setNotification(null);
    }, hideAfter || NOTIFICATION_DURATION_VALUE);
  };

  return (
    <NotificationsContext.Provider value={{ showNotification }}>
      <div
        className={cn(
          "fixed top-2 right-2 z-[100] transition-all duration-300 ease-in-out opacity-0 translate-y-[-50%]",
          notification && "opacity-100 translate-y-0"
        )}
      >
        <Notification variant={notification?.variant as any}>
          <NotificationTitle>{notification?.title}</NotificationTitle>
          <NotificationDescription>
            {notification?.message}
          </NotificationDescription>
        </Notification>
      </div>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () =>
  useContext(NotificationsContext) as {
    showNotification: (
      notification: NotificationType, // eslint-disable-line
      hideAfter?: number // eslint-disable-line
    ) => void;
  };

export default NotificationsProvider;
