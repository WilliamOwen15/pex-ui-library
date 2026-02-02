"use client";

import { LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export interface UserMenuProps {
	user: {
		name: string;
		email: string;
		avatarUrl?: string;
	};
	onSettingsClick?: () => void;
	onSignOut?: () => void;
	className?: string;
}

export function UserMenu({
	user,
	onSettingsClick,
	onSignOut,
	className,
}: UserMenuProps) {
	const initials = user.name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className={className} variant="ghost">
					<Avatar>
						<AvatarImage alt={user.name} src={user.avatarUrl} />
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<div className="flex flex-col items-center gap-4 p-4">
					<Avatar className="size-16">
						<AvatarImage alt={user.name} src={user.avatarUrl} />
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
					<div className="text-center">
						<p className="font-medium text-xl">
							Hi, {user.name.split(" ")[0]}!
						</p>
						<p className="text-muted-foreground text-sm">{user.email}</p>
						<p className="text-muted-foreground text-xs">
							Managed by projectexodus.net
						</p>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="cursor-pointer" onClick={onSettingsClick}>
					<Settings className="mr-2 h-4 w-4" />
					<span>Settings</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="cursor-pointer"
					onClick={onSignOut}
					variant="destructive"
				>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Sign out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
