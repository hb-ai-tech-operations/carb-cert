"use client";

import { type UserIdentity } from "convex/server";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

function initialsForIdentity(user: UserIdentity): string {
  const name = user.name?.trim();
  if (name) {
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      const [first, ...rest] = parts;
      const last = rest.at(-1);
      if (first !== undefined && last !== undefined) {
        return `${first.slice(0, 1)}${last.slice(0, 1)}`.toUpperCase();
      }
    }
    return name.slice(0, 2).toUpperCase();
  }
  const email = user.email?.trim();
  if (email) {
    return email.slice(0, 2).toUpperCase();
  }
  return "CC";
}

export const NavUser = ({ user }: { user: UserIdentity; }) => (
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full"
        asChild
      >
        <button
          type="button"
          className="flex w-full items-center justify-between gap-2"
        >
          <Avatar className="size-8 rounded-lg">
            <AvatarImage
              src={user.pictureUrl ?? "/web-app-manifest-192x192.png"}
              alt={user.name ?? user.email ?? "User avatar"}
            />
            <AvatarFallback className="rounded-lg">
              {initialsForIdentity(user)}
            </AvatarFallback>
          </Avatar>
          <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name ?? ""}</span>
            <span className="truncate text-xs text-muted-foreground">
              {user.email ?? ""}
            </span>
          </div>
        </button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
);
