"use client";

import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../b37/sidebar";
import type { Organization } from "./org-switcher";
import { OrgSwitcher } from "./org-switcher";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  isActive?: boolean;
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

export interface AppSidebarProps {
  appName: string;
  appIcon?: LucideIcon | ComponentType;
  navGroups: NavGroup[];
  organizations?: Organization[];
  currentOrg?: Organization;
  onOrgChange?: (org: Organization) => void;
  showOrgSwitcher?: boolean;
  collapsible?: "offcanvas" | "icon" | "none";
  variant?: "sidebar" | "floating" | "inset";
}

export function AppSidebar({
  appName,
  appIcon: AppIcon,
  navGroups,
  organizations = [],
  currentOrg,
  onOrgChange,
  showOrgSwitcher = false,
  collapsible = "icon",
  variant = "sidebar",
}: AppSidebarProps) {
  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader className="z-10 flex h-14 items-center justify-center p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:!overflow-visible data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              // 2. !size-8 keeps it square (fixing the hover shade)
              // 3. !p-0 ensures the icon is centered in that square
              // 4. !overflow-visible keeps the shadow
              size="lg"
            >
              <a href="/">
                {AppIcon ? (
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white text-foreground shadow-sm">
                    <AppIcon className="size-4" />
                  </div>
                ) : null}
                <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
                  <span className="font-medium">{appName}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label || group.items[0]?.title}>
            {group.label ? (
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            ) : null}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.isActive}
                      tooltip={item.title}
                    >
                      <a href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      {showOrgSwitcher && organizations.length > 0 ? (
        <SidebarFooter>
          <OrgSwitcher
            currentOrg={currentOrg}
            onOrgChange={onOrgChange}
            organizations={organizations}
          />
        </SidebarFooter>
      ) : null}
      <SidebarRail className="z-50 will-change-[transform,opacity]" />
    </Sidebar>
  );
}
