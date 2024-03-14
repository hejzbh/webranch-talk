"use client";
import React, { useMemo } from "react";
// TS
import { NavigationLink as NavigationLinkType } from "@/ts/types";
// Net
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
// Props
interface NavigationLinkProps {
  className?: string;
  link: NavigationLinkType;
}

const NavigationLink = ({
  link: { Icon, title, type, id, href },
}: NavigationLinkProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActiveLink = useMemo(
    () => href && href === pathname,
    [href, pathname]
  );

  // TODO: Add active check for servers
  // const params = useParams()

  const onClick = (type: NavigationLinkType["type"]) => {
    // 1)
    const fn = {
      defaultLink: () => {
        alert("Default");
      },
      serverLink: () => {
        alert("Server");
      },
    };
    // 2)
    fn[type].call(type);
  };

  return (
    <button
      title={title}
      onClick={() => onClick(type)}
      className={cn(
        "flex items-center space-x-2 w-full px-2 py-2 rounded-3xl transition-all duration-300 ease-in-out",
        isActiveLink && "bg-main hover:opacity-90 hover:text-zinc-200",
        !isActiveLink && "hover:bg-main/40"
      )}
    >
      {/** Icon */}
      {Icon}
      {/** Title */}
      <p>{title}</p>
    </button>
  );
};

export default NavigationLink;
