"use client";

import { Button } from "../ui/button";
import type { AppItem } from "./app-switcher";
import { AppSwitcher } from "./app-switcher";
import { UserMenu } from "./user-menu";

export interface NavbarProps {
  appName: string;
  apps?: AppItem[];
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  onSettingsClick?: () => void;
  onSignOut?: () => void;
  onSignIn?: () => void;
  className?: string;
  logo?: React.ReactNode;
}

export function Navbar({
  appName,
  apps,
  user,
  onSettingsClick,
  onSignOut,
  onSignIn,
  className,
  logo,
}: NavbarProps) {
  const isAuthenticated = Boolean(user && apps);

  return (
    <header
      className={`flex h-14 items-center justify-between border-b bg-background px-4 ${className || ""}`}
    >
      <div className="flex items-center gap-4">
        {logo}
        <h1 className="font-semibold text-lg">{appName}</h1>
      </div>
      <div className="flex items-center gap-2">
        {isAuthenticated && user ? (
          <>
            <AppSwitcher apps={apps || []} />
            <UserMenu
              onSettingsClick={onSettingsClick}
              onSignOut={onSignOut}
              user={user}
            />
          </>
        ) : (
          <Button onClick={onSignIn} variant="default">
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
}
