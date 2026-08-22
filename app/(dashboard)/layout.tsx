import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar";
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppSidebar, SiteHeader } from '@/features/dashboard';
import { isAuthenticated } from '@/lib/auth-server';
import { privateAreaMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = privateAreaMetadata;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasToken = await isAuthenticated();
  if (!hasToken) {
    redirect('/sign-in');
  }

  return (
    <TooltipProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
