// Next
import dynamic from "next/dynamic";
// Lib
import { getCurrentAccount } from "@/lib/current-account";
// Components
const NavigationSidebar = dynamic(
  () => import("@/components/navigation/NavigationSidebar")
);
const ModalProvider = dynamic(
  () => import("@/components/providers/ModalProvider")
);
const CurrentAccountProvider = dynamic(
  () => import("@/components/providers/CurrentAccountProvider")
);
const NotificationsProvider = dynamic(
  () => import("@/components/providers/NotificationsProvider")
);

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const account = await getCurrentAccount();

  return (
    <CurrentAccountProvider account={account}>
      <NotificationsProvider>
        <ModalProvider>
          <div className="flex h-full">
            {/** Navigation Sidebar - ON SCREENS LARGER > 768PX (MOBILE: MenuToggle in Header) */}
            <div className="hidden lg:block h-full min-w-[270px] xl:min-w-[300px]">
              <NavigationSidebar />
            </div>
            {/** Page/Children */}
            <main className="lg:p-5 w-full">{children}</main>
          </div>
        </ModalProvider>
      </NotificationsProvider>
    </CurrentAccountProvider>
  );
}
