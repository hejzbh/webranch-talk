// Next
import dynamic from "next/dynamic";
// Components
const NavigationSidebar = dynamic(
  () => import("@/components/navigation/NavigationSidebar")
);
const ModalProvider = dynamic(
  () => import("@/components/providers/ModalProvider")
);

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalProvider>
      <div className="flex h-full">
        {/** Navigation Sidebar - ON SCREENS LARGER > 768PX (MOBILE: MenuToggle in Header) */}
        <div className="hidden lg:block h-full min-w-[270px] xl:min-w-[300px]">
          <NavigationSidebar />
        </div>
        {/** Page/Children */}
        <main className="lg:p-5">{children}</main>
      </div>
    </ModalProvider>
  );
}
