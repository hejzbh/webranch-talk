// Next
import dynamic from "next/dynamic";
// Components
const BackgroundImage = dynamic(
  () => import("@/components/ui/BackgroundImage")
);

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-white">Sidebar</div>
      <div>{children}</div>
    </div>
  );
}
