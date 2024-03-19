"use client";
import React, { useMemo } from "react";
// TS
import { NavigationLink as NavigationLinkType } from "@/ts/types";
// Next
import { useRouter, usePathname, useParams } from "next/navigation";
import Image from "next/image";
// Lib
import { cn } from "@/lib/utils";
import { serverRoute } from "@/lib/(routes)/server-route";
// Components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Props
interface NavigationLinkProps {
  className?: string;
  link: NavigationLinkType;
}

const NavigationLink = ({
  link: { Icon, title, type, href, sublinks },
}: NavigationLinkProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const isActiveLink = useMemo(
    () => href && pathname.includes(href),
    [href, pathname]
  );

  const isActiveSublink = (sublinkID: string) =>
    Object.values(params).some((paramID) => paramID === sublinkID);
  // TODO: Add active check for servers
  // const params = useParams()

  const onClick = (type: NavigationLinkType["type"], id?: string) => {
    // 1)
    const fn = {
      defaultLink: () => router.push(`${href}`),
      serverLink: () => router.push(serverRoute(`${id}`)),
      serverChannelLink: () => {},
    };
    // 2)
    fn[type]?.call(type);
  };

  const doesSublinksExists = !!sublinks?.length;

  return (
    <Accordion
      type={doesSublinksExists ? "multiple" : "single"}
      collapsible={doesSublinksExists}
      title={title}
      onClick={() => (doesSublinksExists ? {} : onClick(type))}
    >
      <AccordionItem value="item-1">
        {/** Icon & Title */}
        <AccordionTrigger
          collapsible={doesSublinksExists}
          className={cn(
            "flex items-center space-x-2 w-full p-2 rounded-3xl transition-all duration-300 ease-in-out cursor-pointer",
            isActiveLink && "bg-main hover:opacity-90 hover:text-zinc-200",
            !isActiveLink && "hover:bg-actionHover"
          )}
        >
          <div className="flex items-center space-x-2">
            {Icon} <p>{title}</p>
          </div>
        </AccordionTrigger>

        {/** Sublinks ? */}
        {doesSublinksExists && (
          <AccordionContent className="border-b pt-2 pl-4 pb-1 space-y-1">
            {" "}
            {sublinks?.map((sublink) => (
              <AccordionContent
                onClick={() => onClick(type, sublink.id)}
                key={sublink.id}
                title={sublink.title}
                className={cn(
                  "flex items-center space-x-2 transition-all cursor-pointer duration-300 ease-in-out p-2 hover:bg-white/10 rounded-3xl",
                  isActiveSublink(sublink.id) && "bg-white/10"
                )}
              >
                {sublink.imageURL && (
                  <Image
                    loading="lazy"
                    src={sublink.imageURL}
                    alt={process.env.NEXT_PUBLIC_ALT_IMAGE_TEXT!!}
                    width={28}
                    height={28}
                    className="w-7 h-7 rounded-full"
                  />
                )}
                <p className="text-sm">{sublink.title}</p>
              </AccordionContent>
            ))}
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default NavigationLink;
