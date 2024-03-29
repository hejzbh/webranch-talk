import { auth } from "@clerk/nextjs";

import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handelAuth = () => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized");

  return { userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Upload server image
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handelAuth())
    .onUploadComplete(() => {}),
  // Upload while in message
  messageFile: f(["image", "pdf"])
    .middleware(() => handelAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
