import React from "react";
// Next
import dynamic from "next/dynamic";
// TS
import { Account } from "@prisma/client";
// Lib
import { getCurrentAccount } from "@/lib/current-account";
// Components
const AccountWidget = dynamic(() => import("@/components/AccountWidget"));
const NavigationSearch = dynamic(
  () => import("@/components/navigation/NavigationSearch")
);
const NavigationSection = dynamic(
  () => import("@/components/navigation/NavigationSection")
);
// Props
interface NavigationSidebarProps {}

const NavigationSidebar = async ({}: NavigationSidebarProps) => {
  const account: Account = await getCurrentAccount();

  return (
    <div
      className="relative w-full h-full p-5 rounded-r-xl"
      style={{
        background:
          "linear-gradient(108deg, rgba(30,31,36,1) 0%, rgba(32,33,38,1) 66%)",
      }}
    >
      <div className="relative z-10">
        {/** Account Widget */}
        <AccountWidget
          account={{
            name: account.name,
            email: account.email,
            imageURL: account.imageURL,
            birthday: account.birthday,
          }}
        />
        {/** Search */}
        <NavigationSearch className="my-5" />
        {/* Overvieww */}
        <NavigationSection label="Overview">
          <h1>Cao</h1>
        </NavigationSection>
      </div>
    </div>
  );
};

export default NavigationSidebar;
