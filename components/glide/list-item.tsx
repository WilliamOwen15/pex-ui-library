"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Image as ImageIcon, MoreVertical } from "lucide-react";
import NextImage from "next/image";
import type * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// LIST ITEM STYLING
const listItemVariants = cva(
	"group flex w-full items-center transition-all duration-200",
	{
		variants: {
			size: {
				default: "gap-4 py-4",
				compact: "gap-2 py-2",
			},
			variant: {
				default: "hover:bg-muted/50",
				card: [
					"rounded-lg border bg-card shadow-sm",
					"hover:scale-[1.01] hover:shadow-md",
				],
			},
			clickable: {
				true: "cursor-pointer",
				false: "",
			},
		},
		compoundVariants: [
			{
				size: "default",
				variant: "card",
				class: "p-4 sm:p-5",
			},
			{
				size: "compact",
				variant: "card",
				class: "p-3",
			},
		],
		defaultVariants: {
			size: "default",
			variant: "default",
			clickable: false,
		},
	},
);

// IMAGE STYLING
const listImageVariants = cva(
	"relative shrink-0 overflow-hidden bg-muted object-cover",
	{
		variants: {
			imageShape: {
				square: "aspect-square rounded-md",
				circle: "rounded-full",
			},
			size: {
				default: "size-16 sm:size-20",
				compact: "size-12 sm:size-14",
			},
		},
		defaultVariants: {
			imageShape: "square",
			size: "default",
		},
	},
);

// TITLE STYLING
const listTitleVariants = cva("leading-tight tracking-tight", {
	variants: {
		titleStyle: {
			simple: "font-medium",
			bold: "font-semibold",
		},
		size: {
			default: "text-base",
			compact: "text-sm",
		},
	},
	defaultVariants: {
		titleStyle: "simple",
		size: "default",
	},
});

// TYPE DEFINITIONS
export interface ListCollectionAction {
	label: string;
	onClick: () => void;
	variant?: "default" | "destructive";
	icon?: React.ReactNode;
}

export interface ListCollectionItem {
	// Core content
	title: string;
	description?: string;
	meta?: string | React.ReactNode;
	image?: string;
	imageAlt?: string;

	// Identifiers
	id?: string | number;

	// Interaction
	href?: string;
	onClick?: () => void;

	// Per-item overrides
	imageShape?: "square" | "circle";
	titleStyle?: "simple" | "bold";
	metaPosition?: "above-title" | "below-title";

	// Actions
	actions?: ListCollectionAction[];

	// Accessibility
	ariaLabel?: string;
}

export interface ListItemProps
	extends Pick<VariantProps<typeof listItemVariants>, "size" | "variant"> {
	item: ListCollectionItem;
	imageShape?: "square" | "circle";
	titleStyle?: "simple" | "bold";
	metaPosition?: "above-title" | "below-title";
	onClick?: () => void;
	as?: "div" | "article";
	clampTitle?: boolean | number;
	clampDescription?: boolean | number;
	renderActions?: (item: ListCollectionItem) => React.ReactNode;
	classNames?: {
		root?: string;
		image?: string;
		content?: string;
		actions?: string;
	};
}

export function ListItem({
	item,
	size = "default",
	variant = "default",
	imageShape = "square",
	titleStyle = "simple",
	metaPosition = "above-title",
	onClick,
	as: Element = "article",
	clampTitle,
	clampDescription,
	renderActions,
	classNames,
}: ListItemProps) {
	const finalImageShape = item.imageShape ?? imageShape;
	const finalTitleStyle = item.titleStyle ?? titleStyle;
	const finalMetaPosition = item.metaPosition ?? metaPosition;
	const finalOnClick = item.onClick ?? onClick;

	// Helper to get line-clamp class
	const getLineClampClass = (clamp: boolean | number | undefined) => {
		if (clamp === true) {
			return "line-clamp-2"; // Default clamping
		}
		if (typeof clamp === "number") {
			const clampMap: Record<number, string> = {
				1: "line-clamp-1",
				2: "line-clamp-2",
				3: "line-clamp-3",
				4: "line-clamp-4",
				5: "line-clamp-5",
				6: "line-clamp-6",
			};
			return clampMap[clamp];
		}
		return undefined;
	};

	// Determine if this should be a link or clickable element
	const isLink = Boolean(item.href);
	const isClickable = Boolean(finalOnClick) || isLink;

	// Render image section
	const renderImage = () => {
		if (!item.image) {
			return (
				<div
					aria-hidden="true"
					className={cn(
						listImageVariants({ imageShape: finalImageShape, size }),
						"flex items-center justify-center",
						classNames?.image,
					)}
				>
					<ImageIcon className="size-5 text-muted-foreground" />
				</div>
			);
		}

		// Use Avatar for circular images
		if (finalImageShape === "circle") {
			return (
				<div
					className={cn(
						listImageVariants({ imageShape: "circle", size }),
						classNames?.image,
					)}
				>
					<Avatar className="size-full">
						<AvatarImage alt={item.imageAlt ?? item.title} src={item.image} />
						<AvatarFallback>
							<ImageIcon className="size-5 text-muted-foreground" />
						</AvatarFallback>
					</Avatar>
				</div>
			);
		}

		// Use Next.js Image for square images
		return (
			<div
				className={cn(
					listImageVariants({ imageShape: "square", size }),
					classNames?.image,
				)}
			>
				<NextImage
					alt={item.imageAlt ?? item.title}
					className="object-cover"
					fill
					sizes="(max-width: 640px) 48px, 80px"
					src={item.image}
				/>
			</div>
		);
	};

	// Render meta content
	const renderMeta = () => {
		if (!item.meta) {
			return null;
		}

		if (typeof item.meta === "string") {
			return (
				<p className="text-muted-foreground text-xs uppercase tracking-wide">
					{item.meta}
				</p>
			);
		}

		return item.meta;
	};

	// Render actions dropdown
	const renderActionsDropdown = () => {
		const finalActions = renderActions?.(item);

		// Priority: item.actions > renderActions
		if (item.actions && item.actions.length > 0) {
			return (
				<div className={cn("shrink-0 self-start", classNames?.actions)}>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								aria-label={`Actions for ${item.title}`}
								className="size-8 hover:bg-accent"
								size="icon"
								variant="ghost"
							>
								<MoreVertical className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-48">
							{item.actions.map((action, idx) => (
								<DropdownMenuItem
									key={`${action.label}-${idx}`}
									onClick={(e) => {
										e.stopPropagation(); // Prevent item click
										action.onClick();
									}}
									variant={action.variant}
								>
									{action.icon}
									{action.label}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		}

		// Custom renderActions
		if (finalActions) {
			return (
				<div className={cn("shrink-0 self-start", classNames?.actions)}>
					{finalActions}
				</div>
			);
		}

		return null;
	};

	// Build the list item content
	const listItemContent = (
		<>
			{/* Left: Image */}
			{renderImage()}

			{/* Center: Content stack */}
			<div
				className={cn(
					"flex min-w-0 flex-1 flex-col gap-1",
					classNames?.content,
				)}
			>
				{finalMetaPosition === "above-title" && renderMeta()}

				{/* Title */}
				<h3
					className={cn(
						listTitleVariants({ titleStyle: finalTitleStyle, size }),
						"truncate",
						getLineClampClass(clampTitle),
					)}
				>
					{item.title}
				</h3>

				{finalMetaPosition === "below-title" && renderMeta()}

				{/* Description */}
				{item.description && (
					<p
						className={cn(
							"text-muted-foreground leading-relaxed",
							size === "default" ? "text-sm" : "text-xs",
							clampDescription === false ? undefined : "line-clamp-2",
							getLineClampClass(clampDescription),
						)}
					>
						{item.description}
					</p>
				)}
			</div>

			{/* Right: Actions dropdown */}
			{renderActionsDropdown()}
		</>
	);

	// Wrapper class
	const listItemClassName = cn(
		listItemVariants({ size, variant, clickable: isClickable }),
		classNames?.root,
	);

	// Handle click events
	const handleClick = (e: React.MouseEvent) => {
		// Don't trigger item click if clicking on dropdown trigger
		if (
			(e.target as HTMLElement).closest('[role="button"]') ||
			(e.target as HTMLElement).closest("[data-radix-popper-content-wrapper]")
		) {
			return;
		}
		finalOnClick?.();
	};

	// Render as link
	if (isLink && item.href) {
		return (
			<a
				aria-label={item.ariaLabel ?? `View ${item.title}`}
				className={listItemClassName}
				href={item.href}
				onClick={handleClick}
			>
				{listItemContent}
			</a>
		);
	}

	// Render as clickable button
	if (isClickable && finalOnClick) {
		return (
			<button
				aria-label={item.ariaLabel ?? item.title}
				className={listItemClassName}
				onClick={handleClick}
				type="button"
			>
				{listItemContent}
			</button>
		);
	}

	// Render as static element
	return (
		<Element
			aria-label={item.ariaLabel ?? item.title}
			className={listItemClassName}
		>
			{listItemContent}
		</Element>
	);
}
