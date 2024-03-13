import React from "react";
// Next
import dynamic from "next/dynamic";
// Components
const BackgroundImage = dynamic(
  () => import("@/components/ui/BackgroundImage")
);

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <BackgroundImage imageURL="/images/app-bg.webp" includeBlackOverlay />
      <main>{children}</main>
    </>
  );
};

export default AuthLayout;
