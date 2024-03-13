// Next
import dynamic from "next/dynamic";
// Components
const NavigationSidebar = dynamic(
  () => import("@/components/navigation/NavigationSidebar")
);

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/** Navigation Sidebar - ON SCREENS LARGER > 768PX (MOBILE: MenuToggle in Header) */}
      <div className="hidden md:block">
        <NavigationSidebar />
      </div>
      {/** Page/Children */}
      <main>{children}</main>
    </div>
  );
}
