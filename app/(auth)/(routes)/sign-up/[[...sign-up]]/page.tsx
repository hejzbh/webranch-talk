import React from "react";
// Clerk
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <main className="flex items-center justify-center h-full">
      <SignUp />
    </main>
  );
};

export default SignUpPage;
