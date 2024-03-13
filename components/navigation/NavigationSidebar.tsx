import React from "react";
// Next
import dynamic from "next/dynamic";
// TS
import { Account, ApplicationRole } from "@prisma/client";
// Lib
import { getCurrentAccount } from "@/lib/current-account";
import { db } from "@/lib/db";
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

async function getNavigationSidebarData(account: Account) {
  const [servers, users]: any = await Promise.allSettled([
    getUserServers(),
    getAllUsers(),
  ]);

  async function getUserServers() {
    return Promise.resolve([]);
  }

  async function getAllUsers() {
    // 1) Only app admin should be able to view all users in application and search over them
    if (account.appRole !== ApplicationRole.ADMIN) return [];
    // 2)
    const users = await db.account.findMany({
      where: {
        id: {
          not: account.id, // Skip ourself.
        },
      },
    });
    // 3)
    return users;
  }

  return { servers: servers?.value, users: users?.value };
}

const NavigationSidebar = async ({}: NavigationSidebarProps) => {
  const account: Account = await getCurrentAccount();

  const navigationData = await getNavigationSidebarData(account);
  console.log(navigationData);
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
        <NavigationSearch
          data={[
            { label: "Servers", type: "servers", items: [] },
            {
              label: "Users",
              type: "users",
              items: navigationData?.users?.map((account: Account) => ({
                name: account.name,
                id: account.id,
                imageURL: account.imageURL,
              })),
            },
          ]}
          className="my-5"
        />
        {/* Overvieww */}
        <NavigationSection label="Overview">
          <h1>Cao</h1>
        </NavigationSection>
      </div>
    </div>
  );
};

export default NavigationSidebar;
