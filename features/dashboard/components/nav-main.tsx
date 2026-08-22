"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

function isNavItemActive(pathname: string, url: string) {
  if (url === "/dashboard") {
    return pathname === "/dashboard";
  }
  return pathname === url || pathname.startsWith(`${url}/`);
}

const NavMain = ({
  items,
}: {
  items: Array<{
    icon?: Icon;
    title: string;
    url: string;
  }>;
}) => {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="mt-2 flex flex-col gap-2">
        <SidebarMenu className="h-full w-full text-sidebar-foreground">
          {items.map((item) => (
            <SidebarMenuItem key={item.url} className="h-12 w-full">
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                size="lg"
                isActive={isNavItemActive(pathname, item.url)}
                className="h-full w-full"
              >
                <Link href={item.url}>
                  {item.icon ? <item.icon /> : null}
                  <span className="text-base font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

NavMain.displayName = "NavMain";
export { NavMain };
