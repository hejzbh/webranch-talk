import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isFileImage = (fileUrl: string) => {
  // 1)
  const fileExtension: any = fileUrl.split(".").pop();
  // 2)
  const imgExtenstions = ["jpg", "png", "webp", "jpeg"];
  // 3)
  return imgExtenstions.includes(fileExtension);
};

export const extractInviteCodeFromURL = (inviteCodeURL: string) =>
  inviteCodeURL.slice(inviteCodeURL.lastIndexOf("/") + 1);
