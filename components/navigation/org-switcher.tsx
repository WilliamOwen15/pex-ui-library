"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../b37/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export interface Organization {
  id: string;
  name: string;
  type?: string;
}

export interface OrgSwitcherProps {
  organizations: Organization[];
  currentOrg?: Organization;
  onOrgChange?: (org: Organization) => void;
}

export function OrgSwitcher({
  organizations,
  currentOrg,
  onOrgChange,
}: OrgSwitcherProps) {
  const { isMobile } = useSidebar();

  if (!currentOrg && organizations.length > 0) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {currentOrg?.name || "Select organization"}
                </span>
                {currentOrg?.type ? (
                  <span className="truncate text-xs">{currentOrg.type}</span>
                ) : null}
              </div>
              <ChevronsUpDown className="ml-auto group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel>Organizations</DropdownMenuLabel>
            {organizations.map((org) => (
              <DropdownMenuItem key={org.id} onClick={() => onOrgChange?.(org)}>
                <div className="flex flex-1 flex-col">
                  <span className="font-medium text-sm">{org.name}</span>
                  {org.type ? (
                    <span className="text-muted-foreground text-xs">
                      {org.type}
                    </span>
                  ) : null}
                </div>
                {currentOrg?.id === org.id ? (
                  <Check className="h-4 w-4" />
                ) : null}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
