import React from "react";
// Next
import dynamic from "next/dynamic";
// Icons
import { Menu } from "lucide-react";
// Components
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
const NavigationSidebar = dynamic(
  () => import("@/components/navigation/NavigationSidebar")
);

// Props
interface NavigationSidebarBurgerProps {}

const NavigationSidebarBurger = async ({}: NavigationSidebarBurgerProps) => {
  return (
    <Sheet>
      {/** Toggler */}
      <SheetTrigger asChild>
        <button
          title={`Open navigation sidebar`}
          className="border border-gray-700 rounded-md p-1"
        >
          {" "}
          <Menu className="text-white" size={23} />
        </button>
      </SheetTrigger>
      {/** Sidebar */}
      <SheetContent
        side="left"
        className="p-0 flex gap-0 w-full max-w-[90%] border-none bg-none"
      >
        <NavigationSidebar />
      </SheetContent>
    </Sheet>
  );
};

export default NavigationSidebarBurger;
