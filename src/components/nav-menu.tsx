"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const links = [
  { href: "/", label: "หน้าหลัก" },
  { href: "/course", label: "หลักสูตร" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/product", label: "สินค้า" },
  { href: "/contact", label: "ติดต่อเรา" },
];

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => {
  const pathname = usePathname();

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="data-[orientation=vertical]:-ms-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
        {links.map((link) => {
          const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink
                asChild
                active={active}
                className={navigationMenuTriggerStyle()}
              >
                <Link href={link.href}>{link.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
