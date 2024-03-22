import React from "react";
// Next
import dynamic from "next/dynamic";
// TS
import { Account, ApplicationRole, Server } from "@prisma/client";
// Lib
import { getCurrentAccount } from "@/lib/(account)/current-account";
import { getAllUsers } from "@/lib/all-app-users";
import { getAccountServers } from "@/lib/(account)/account-servers";

// Components
const AccountWidget = dynamic(() => import("@/components/AccountWidget"));
const NavigationSearchToggler = dynamic(
  () => import("@/components/togglers/NavigationSearchToggler")
);
const NavigationSection = dynamic(
  () => import("@/components/navigation/NavigationSection")
);
const NavigationLinks = dynamic(
  () => import("@/components/navigation/NavigationLinks")
);
const CreateServerToggler = dynamic(
  () => import("@/components/togglers/CreateServerToggler")
);
// Props
interface NavigationSidebarProps {}

async function getNavigationSidebarData(account: Account) {
  const [servers, users]: any = await Promise.allSettled([
    //
    getAccountServers(account?.id),
    //
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
      className="relative w-full h-full  rounded-r-3xl border-r-2 border-border-common-2"
      style={{
        background:
          "linear-gradient(108deg, rgba(30,31,36,1) 0%, rgba(32,33,38,1) 66%)",
      }}
    >
      <div className="relative z-10 h-full flex flex-col">
        {/** Account Widget */}
        <div className="border-b-2 border-border-common-2 min-h-[9vh] pt-5 pl-5">
          <AccountWidget
            account={{
              name: account.name,
              email: account.email,
              imageURL: account.imageURL,
              birthday: account.birthday,
            }}
          />
        </div>

        {/** Search */}
        <NavigationSearchToggler
          data={[
            {
              label: "Servers",
              type: "servers",
              items: navigationData?.servers?.map((server: Server) => ({
                name: server.name,
                id: server.id,
                imageURL: server?.imageURL,
              })),
            },
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
          className="my-6 px-5"
        />
        {/* Overview / Navigation Links */}
        <NavigationSection
          label="Overview"
          className="flex-1 overflow-auto px-5"
        >
          <NavigationLinks />
        </NavigationSection>

        {/** Onboarding */}
        <NavigationSection label="Onboarding" className="p-5">
          <CreateServerToggler />
        </NavigationSection>
      </div>
    </div>
  );
};

export default NavigationSidebar;
