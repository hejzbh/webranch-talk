import React from "react";
// Next
import dynamic from "next/dynamic";
// TS
import { Account, ApplicationRole } from "@prisma/client";
// Lib
import { getCurrentAccount } from "@/lib/current-account";
import { getAllUsers } from "@/lib/all-app-users";
// Components
const AccountWidget = dynamic(() => import("@/components/AccountWidget"));
const NavigationSearch = dynamic(
  () => import("@/components/navigation/NavigationSearch")
);
const NavigationSection = dynamic(
  () => import("@/components/navigation/NavigationSection")
);
const NavigationLinks = dynamic(
  () => import("@/components/navigation/NavigationLinks")
);
// Props
interface NavigationSidebarProps {}

async function getUserServers(account: Account): Promise<any[]> {
  return Promise.resolve([]);
}

async function getNavigationSidebarData(account: Account) {
  const [servers, users]: any = await Promise.allSettled([
    getUserServers(account),
    account.appRole !== ApplicationRole.ADMIN
      ? Promise.resolve([])
      : getAllUsers(account?.id),
  ]);

  return { servers: servers?.value, users: users?.value };
}

const NavigationSidebar = async ({}: NavigationSidebarProps) => {
  const account: Account = await getCurrentAccount();

  const navigationData = await getNavigationSidebarData(account);

  return (
    <div
      className="relative w-full h-full p-5 rounded-r-xl"
      style={{
        background:
          "linear-gradient(108deg, rgba(30,31,36,1) 0%, rgba(32,33,38,1) 66%)",
      }}
    >
      <div className="relative z-10 h-full flex flex-col">
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
        <NavigationSearch
          data={[
            { label: "Servers", type: "servers", items: [] },
            {
              label: "Users",
              requiredRoles: [ApplicationRole.ADMIN],
              type: "users",
              items: navigationData?.users?.map((account: Account) => ({
                name: account.name,
                id: account.id,
                imageURL: account.imageURL,
              })),
            },
          ]}
          className="my-6"
        />
        {/* Overview / Navigation Links */}
        <NavigationSection label="Overview" className="flex-1 overflow-auto">
          <NavigationLinks />
        </NavigationSection>

        {/** Onboarding */}
        <NavigationSection label="Onboarding">
          <h1>Add Server</h1>
        </NavigationSection>
      </div>
    </div>
  );
};

export default NavigationSidebar;