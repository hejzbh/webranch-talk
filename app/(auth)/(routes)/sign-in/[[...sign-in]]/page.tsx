import React from "react";
// Clerk
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <main className="flex items-center justify-center h-full">
      <SignIn />
    </main>
  );
};

export default SignInPage;
