"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Image as ImageIcon } from "lucide-react";
import NextImage from "next/image";
import type * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// IMAGE STYLING (matches original implementation)
const cardImageVariants = cva(
	"relative w-full shrink-0 overflow-hidden bg-muted object-cover",
	{
		variants: {
			aspectRatio: {
				square: "aspect-square",
				video: "aspect-video",
				portrait: "aspect-[3/4]",
			},
			imageShape: {
				square: "rounded-none",
				circle: "aspect-square rounded-full",
			},
			orientation: {
				vertical: "w-full",
				horizontal: "h-24 w-24 sm:h-28 sm:w-28",
			},
			variant: {
				card: "",
				minimal: "",
			},
		},
		compoundVariants: [
			{
				orientation: "vertical",
				imageShape: "square",
				variant: "card",
				class: "rounded-t-xl",
			},
			{
				orientation: "vertical",
				imageShape: "square",
				variant: "minimal",
				class: "rounded-lg",
			},
			{
				orientation: "vertical",
				imageShape: "circle",
				class: "mx-auto",
			},
			{ orientation: "horizontal", imageShape: "square", class: "rounded-md" },
		],
		defaultVariants: {
			aspectRatio: "square",
			imageShape: "square",
			variant: "card",
		},
	},
);

// TITLE STYLING (matches original implementation)
const cardTitleVariants = cva("leading-snug tracking-tight", {
	variants: {
		titleStyle: {
			simple: "font-semibold",
			bold: "font-bold",
		},
		orientation: {
			vertical: "text-lg",
			horizontal: "text-base",
		},
	},
	defaultVariants: {
		titleStyle: "simple",
		orientation: "vertical",
	},
});

export interface CardCollectionItem {
	title: string;
	description?: string;
	image?: string;
	meta?: string;
	// NEW: Optional fields for enhanced functionality
	id?: string | number;
	href?: string;
	action?: React.ReactNode;
	footer?: React.ReactNode;
	metaPosition?: "header" | "footer" | "above-title" | "below-title";
	ariaLabel?: string;
}

export interface CardItemProps
	extends Pick<
		VariantProps<typeof cardImageVariants>,
		"aspectRatio" | "imageShape"
	> {
	item: CardCollectionItem;
	variant?: "card" | "minimal";
	orientation?: "vertical" | "horizontal";
	titleStyle?: "simple" | "bold";
	metaPosition?: "header" | "footer" | "above-title" | "below-title";
	action?: React.ReactNode;
	footer?: React.ReactNode;
	showSeparators?: boolean;
	onClick?: () => void;
	as?: "article" | "div";
	clampTitle?: boolean | number;
	clampDescription?: boolean | number;
	classNames?: {
		root?: string;
		image?: string;
		header?: string;
		content?: string;
		footer?: string;
	};
}

export function CardItem({
	item,
	variant = "card",
	orientation = "vertical",
	aspectRatio = "square",
	imageShape = "square",
	titleStyle = "simple",
	metaPosition = "above-title",
	action,
	footer,
	showSeparators = false,
	onClick,
	as: Element = "article",
	clampTitle,
	clampDescription,
	classNames,
}: CardItemProps) {
	const hasImage = Boolean(item.image);
	const finalMetaPosition = item.metaPosition ?? metaPosition;
	const finalAction = item.action ?? action;
	const finalFooter = item.footer ?? footer;

	// Helper to get line-clamp class
	const getLineClampClass = (clamp: boolean | number | undefined) => {
		if (clamp === true) {
			return undefined; // Will use default in the specific element
		}
		if (typeof clamp === "number") {
			// Map common values to Tailwind classes
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
	const isClickable = Boolean(onClick) || isLink;

	// Build the card content
	const renderImage = () => {
		if (!(hasImage || item.image)) {
			return (
				<div
					aria-hidden="true"
					className={cn(
						cardImageVariants({
							aspectRatio,
							imageShape,
							orientation,
							variant,
						}),
						"flex items-center justify-center",
						classNames?.image,
					)}
				>
					<ImageIcon className="h-8 w-8 text-muted-foreground" />
				</div>
			);
		}

		// Use Avatar for circular images
		if (imageShape === "circle" && item.image) {
			return (
				<div className="p-6">
					<div
						className={cn(
							cardImageVariants({
								aspectRatio,
								imageShape,
								orientation,
								variant,
							}),
							classNames?.image,
						)}
					>
						<Avatar className="h-full w-full">
							<AvatarImage alt={item.title} src={item.image} />
							<AvatarFallback>
								<ImageIcon className="h-8 w-8 text-muted-foreground" />
							</AvatarFallback>
						</Avatar>
					</div>
				</div>
			);
		}

		// Use Next.js Image for square images
		if (!item.image) {
			return (
				<div
					aria-hidden="true"
					className={cn(
						cardImageVariants({
							aspectRatio,
							imageShape,
							orientation,
							variant,
						}),
						"flex items-center justify-center",
						classNames?.image,
					)}
				>
					<ImageIcon className="h-8 w-8 text-muted-foreground" />
				</div>
			);
		}

		return (
			<div
				className={cn(
					cardImageVariants({
						aspectRatio,
						imageShape,
						orientation,
						variant,
					}),
					classNames?.image,
				)}
			>
				<NextImage
					alt={item.title}
					className="h-full w-full object-cover"
					fill
					sizes={
						orientation === "horizontal"
							? "112px"
							: "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
					}
					src={item.image}
				/>
			</div>
		);
	};

	const renderMeta = () => {
		if (!item.meta) {
			return null;
		}
		return (
			<p className="text-muted-foreground text-xs uppercase tracking-wide">
				{item.meta}
			</p>
		);
	};

	const cardContent = (
		<>
			{/* Image Section */}
			{renderImage()}

			{showSeparators && orientation === "vertical" && (
				<Separator className={cn(variant === "card" ? "my-4" : "my-3")} />
			)}

			{/* Header Section with optional action */}
			{(finalMetaPosition === "header" || finalAction) && (
				<>
					<CardHeader className={classNames?.header}>
						<div className="flex flex-col gap-4">
							{finalMetaPosition === "header" && renderMeta()}
							<CardTitle
								className={cn(
									cardTitleVariants({ titleStyle, orientation }),
									orientation === "horizontal" && "truncate",
									clampTitle === true && "line-clamp-2",
									getLineClampClass(clampTitle),
								)}
							>
								{item.title}
							</CardTitle>
							{item.description && (
								<CardDescription
									className={cn(
										"leading-relaxed",
										orientation === "vertical" ? "text-sm" : "text-xs",
										orientation === "horizontal" && "truncate",
										clampDescription === true && "line-clamp-3",
										getLineClampClass(clampDescription),
									)}
								>
									{item.description}
								</CardDescription>
							)}
						</div>
						{finalAction && <CardAction>{finalAction}</CardAction>}
					</CardHeader>
					{showSeparators && (
						<Separator className={cn(variant === "card" ? "my-4" : "my-3")} />
					)}
				</>
			)}

			{/* Content Section (default layout) */}
			{finalMetaPosition !== "header" && (
				<CardContent
					className={cn(
						"flex flex-col gap-4",
						orientation === "vertical" && "flex-1",
						orientation === "horizontal" && "min-w-0 flex-1 p-0",
						imageShape === "circle" && "items-center text-center",
						classNames?.content,
					)}
				>
					{finalMetaPosition === "above-title" && renderMeta()}
					<CardTitle
						className={cn(
							cardTitleVariants({ titleStyle, orientation }),
							orientation === "horizontal" && "truncate",
							clampTitle === true && "line-clamp-2",
							getLineClampClass(clampTitle),
						)}
					>
						{item.title}
					</CardTitle>
					{finalMetaPosition === "below-title" && renderMeta()}
					{item.description && (
						<CardDescription
							className={cn(
								"leading-relaxed",
								orientation === "vertical" ? "text-sm" : "text-xs",
								orientation === "horizontal" && "truncate",
								clampDescription === true && "line-clamp-3",
								getLineClampClass(clampDescription),
							)}
						>
							{item.description}
						</CardDescription>
					)}
				</CardContent>
			)}

			{/* Footer Section */}
			{(finalMetaPosition === "footer" || finalFooter) && (
				<>
					{showSeparators && (
						<Separator className={cn(variant === "card" ? "my-4" : "my-3")} />
					)}
					<CardFooter
						className={cn("flex-col items-start", classNames?.footer)}
					>
						{finalMetaPosition === "footer" && renderMeta()}
						{finalFooter}
					</CardFooter>
				</>
			)}
		</>
	);

	// Wrapper component based on interaction type
	const cardClassName = cn(
		"group relative flex transition-all duration-200",
		!finalAction && "overflow-hidden",
		variant === "card" &&
			"rounded-xl border bg-card text-card-foreground shadow-md hover:-translate-y-1 hover:shadow-lg",
		variant === "minimal" &&
			"rounded-none border-none bg-transparent shadow-none",
		orientation === "vertical" && "h-full flex-col",
		orientation === "horizontal" && "flex-row items-center",
		orientation === "horizontal" &&
			variant === "card" &&
			"gap-4 p-4 sm:gap-5 sm:p-5",
		orientation === "horizontal" &&
			variant === "minimal" &&
			"gap-4 border-b py-2 last:border-0",
		isClickable && "cursor-pointer hover:bg-muted/50",
		classNames?.root,
	);

	if (isLink && item.href) {
		return (
			<a
				aria-label={item.ariaLabel ?? `View ${item.title}`}
				className={cardClassName}
				href={item.href}
				onClick={onClick}
			>
				{cardContent}
			</a>
		);
	}

	if (isClickable && onClick) {
		return (
			<button
				aria-label={item.ariaLabel ?? item.title}
				className={cardClassName}
				onClick={onClick}
				type="button"
			>
				{cardContent}
			</button>
		);
	}

	return (
		<Element
			aria-label={item.ariaLabel ?? item.title}
			className={cardClassName}
		>
			{cardContent}
		</Element>
	);
}
