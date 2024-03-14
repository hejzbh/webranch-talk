"use client";
// React
import { useContext, createContext } from "react";
// Prisma
import { Account } from "@prisma/client";

const CurrentAccountContext = createContext({});

export const CurrentAccountProvider = ({
  children,
  account,
}: {
  children: React.ReactNode;
  account: Account;
}) => {
  return (
    <CurrentAccountContext.Provider value={account as Account}>
      {children}
    </CurrentAccountContext.Provider>
  );
};

export const useCurrentAccount = () => {
  return useContext(CurrentAccountContext) as Account;
};

export default CurrentAccountProvider;
