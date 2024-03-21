// Next
import dynamic from "next/dynamic";
// Lib
import { getCurrentAccount } from "@/lib/(account)/current-account";
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
const SocketProvider = dynamic(
  () => import("@/components/providers/SocketProvider")
);

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const account = await getCurrentAccount();

  return (
    <SocketProvider>
      <CurrentAccountProvider account={account}>
        <NotificationsProvider>
          <ModalProvider>
            <div className="flex h-screen">
              {/** Navigation Sidebar - ON SCREENS LARGER > 768PX (MOBILE: MenuToggle in Header) */}
              <div className="hidden lg:block h-full min-w-[270px] xl:min-w-[300px] inset-y-0 ">
                <NavigationSidebar />
              </div>
              {/** Page/Children */}
              <main className=" w-full  h-screen">{children}</main>
            </div>
          </ModalProvider>
        </NotificationsProvider>
      </CurrentAccountProvider>
    </SocketProvider>
  );
}
