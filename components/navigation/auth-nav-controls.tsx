"use client";

import { useAppAccess, useAuth } from "@pex/auth/client";
import { AppContext, type AppContextType } from "@pex/types";
import { LogOut, User } from "lucide-react";
import { useMemo, useState } from "react";
import { getAppConfigs } from "../../lib/app-config";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AppSwitcher } from "./app-switcher";

export interface AuthNavControlsProps {
  /**
   * Whether this is a protected page that requires authentication
   * - If true: signing out redirects to accounts app login
   * - If false: signing out just updates the UI to show Sign In button
   */
  requiresAuth?: boolean;
  /**
   * URL of the accounts app login page
   * @default process.env.NEXT_PUBLIC_ACCOUNTS_URL + '/login'
   */
  accountsLoginUrl?: string;
  /**
   * Custom className for the container
   */
  className?: string;
}

export function AuthNavControls({
  requiresAuth = false,
  accountsLoginUrl = `${process.env.NEXT_PUBLIC_ACCOUNTS_URL || "http://localhost:3001"}/login`,
  className,
}: AuthNavControlsProps) {
  const { user, loading, signOut } = useAuth();
  const { userApps, loading: appsLoading } = useAppAccess();
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Get all apps and filter based on user access
  const accessibleApps = useMemo(() => {
    if (!user || appsLoading) {
      return [];
    }

    const allApps = getAppConfigs();

    // Map app names to AppContext values for comparison
    const appNameToContext: Record<string, AppContextType> = {
      Bridge: AppContext.BRIDGE,
      Pulse: AppContext.PULSE,
      Circle: AppContext.CIRCLE,
      Habitat: AppContext.HABITAT,
    };

    // Filter apps to only those the user has access to
    return allApps.filter((app) => {
      const appContext = appNameToContext[app.name];
      return appContext && userApps.includes(appContext);
    });
  }, [user, userApps, appsLoading]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();

    if (requiresAuth) {
      // Redirect to login for protected pages
      window.location.href = accountsLoginUrl;
    } else {
      // For public pages, reset the signing out state
      setIsSigningOut(false);
    }
  };

  const handleSignIn = () => {
    window.location.href = accountsLoginUrl;
  };

  const handleManageAccount = () => {
    const accountsUrl =
      process.env.NEXT_PUBLIC_ACCOUNTS_URL || "http://localhost:3001";
    window.location.href = `${accountsUrl}/manage`;
  };

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className || ""}`}>
        <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
      </div>
    );
  }

  if (isSigningOut) {
    return (
      <div className={`flex items-center gap-2 ${className || ""}`}>
        <Button disabled>Signing out...</Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`flex items-center gap-2 ${className || ""}`}>
        <Button onClick={handleSignIn}>Sign In</Button>
      </div>
    );
  }

  // Get user initials
  const userInitials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email.slice(0, 2).toUpperCase();

  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      {/* App Switcher - only show if user has access to any apps */}
      {accessibleApps.length > 0 && <AppSwitcher apps={accessibleApps} />}

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <Avatar>
              <AvatarFallback className="bg-primary font-semibold text-primary-foreground">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="flex items-center gap-3 p-3">
            <Avatar size="lg">
              <AvatarFallback className="bg-primary font-semibold text-primary-foreground">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-sm leading-none">{user.name}</p>
              <p className="text-muted-foreground text-xs leading-none">
                {user.email}
              </p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleManageAccount}
          >
            <User className="mr-2 h-4 w-4" />
            My account
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleSignOut}
            variant="destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
