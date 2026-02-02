"use client";

import type { LucideIcon } from "lucide-react";
import { AppWindowMac } from "lucide-react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export interface AppItem {
	name: string;
	icon?: LucideIcon;
	logo?: string;
	LogoComponent?: ComponentType<SVGProps<SVGSVGElement>>;
	href: string;
	color?: string;
	disabled?: boolean;
}

export interface AppSwitcherProps {
	apps: AppItem[];
	className?: string;
}

/**
 * Prefetch DNS and establish connection for cross-origin navigation
 * This helps reduce latency when switching between apps on different subdomains
 */
function prefetchAppUrl(url: string) {
	try {
		const urlObj = new URL(url);
		const origin = urlObj.origin;

		// Check if dns-prefetch link already exists
		if (!document.querySelector(`link[rel="dns-prefetch"][href="${origin}"]`)) {
			const dnsPrefetch = document.createElement("link");
			dnsPrefetch.rel = "dns-prefetch";
			dnsPrefetch.href = origin;
			document.head.appendChild(dnsPrefetch);
		}

		// Check if preconnect link already exists
		if (!document.querySelector(`link[rel="preconnect"][href="${origin}"]`)) {
			const preconnect = document.createElement("link");
			preconnect.rel = "preconnect";
			preconnect.href = origin;
			document.head.appendChild(preconnect);
		}
	} catch {
		// Ignore invalid URLs
	}
}

export function AppSwitcher({ apps, className }: AppSwitcherProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className={className}
					onMouseEnter={() => {
						// Prefetch all app URLs on hover for faster navigation
						for (const app of apps) {
							if (!app.disabled && app.href !== "#") {
								prefetchAppUrl(app.href);
							}
						}
					}}
					size="icon"
					variant="ghost"
				>
					<AppWindowMac className="h-5 w-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{apps.map((app) => (
					<DropdownMenuItem asChild disabled={app.disabled} key={app.name}>
						<Link
							className="cursor-pointer"
							href={app.disabled ? "#" : app.href}
						>
							<div className="flex h-8 w-8 shrink-0 items-center justify-center">
								{app.LogoComponent && (
									<app.LogoComponent className="h-full w-full" />
								)}
								{!app.LogoComponent && app.icon && (
									<app.icon className="h-5 w-5" style={{ color: app.color }} />
								)}
							</div>
							<span className="font-medium text-sm">{app.name}</span>
						</Link>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
