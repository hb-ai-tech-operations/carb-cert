"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  IconCertificate,
  IconClipboardCheck,
  IconDashboard,
  IconMail,
  IconShoppingCart,
  IconUsers,
} from "@tabler/icons-react";
import { useQuery } from "convex/react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";

const navMainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconDashboard,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: IconShoppingCart,
  },
  {
    title: "Send Reminder",
    url: "/dashboard/send-reminder",
    icon: IconMail,
  },
  {
    title: "Non-compliant email",
    url: "/dashboard/send-non-compliant-followup",
    icon: IconMail,
  },
  {
    title: "CTC pending follow-up",
    url: "/dashboard/send-ctc-pending-followup",
    icon: IconMail,
  },
  {
    title: "Testing reminder",
    url: "/dashboard/send-vehicle-testing-reminder",
    icon: IconMail,
  },
  {
    title: "Outreach data email",
    url: "/dashboard/outreach-data",
    icon: IconMail,
  },
  {
    title: "Account email",
    url: "/dashboard/send-account-created-email",
    icon: IconCertificate,
  },
  {
    title: "Tester applications",
    url: "/dashboard/tester-applications",
    icon: IconClipboardCheck,
  },
  {
    title: "Tester outreach",
    url: "/dashboard/tester-outreach",
    icon: IconUsers,
  },
  {
    title: "Send certificate",
    url: "/dashboard/send-certificate",
    icon: IconMail,
  },
] as const;

const AppSidebarLoadingFallback = (props: React.ComponentProps<typeof Sidebar>) => (
  <Sidebar collapsible="offcanvas" {...props}>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-1.5!">
            <Skeleton className="mx-auto h-11 w-28" aria-hidden />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent className="mt-2 flex flex-col gap-2">
          <SidebarMenu>
            <SidebarMenuSkeleton showIcon textWidth="72%" />
            <SidebarMenuSkeleton showIcon textWidth="58%" />
            <SidebarMenuSkeleton showIcon textWidth="64%" />
            <SidebarMenuSkeleton showIcon textWidth="70%" />
            <SidebarMenuSkeleton showIcon textWidth="62%" />
            <SidebarMenuSkeleton showIcon textWidth="66%" />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="w-full" disabled>
            <Skeleton className="size-8 shrink-0 rounded-lg" aria-hidden />
            <div className="grid min-w-0 flex-1 gap-1 text-left">
              <Skeleton className="h-4 w-24" aria-hidden />
              <Skeleton className="h-3 w-32 max-w-full" aria-hidden />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
);

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const router = useRouter();
  const user = useQuery(api.auth.getCurrentUser);

  React.useEffect(() => {
    if (user === null) {
      router.replace("/sign-in");
    }
  }, [user, router]);

  if (user === undefined || user === null) {
    return <AppSidebarLoadingFallback {...props} />;
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link
                href="/dashboard"
                className="mr-auto h-full w-full hover:bg-transparent"
              >
                <Image
                  src="/logos/carb-cert-dark.png"
                  alt="Carb Cert"
                  width={112}
                  height={45}
                  className="mx-auto w-28"
                  priority
                  style={{ width: "112px", height: "45px" }}
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={[...navMainItems]} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

AppSidebar.displayName = "AppSidebar";
export { AppSidebar };
