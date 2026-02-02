"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";
import { type CardCollectionItem, CardItem } from "./card-item";

// GRID LAYOUT
export const collectionGridVariants = cva("grid w-full", {
	variants: {
		size: {
			xs: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
			s: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
			m: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
			l: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
			xl: "grid-cols-1 sm:grid-cols-2",
		},
		orientation: {
			vertical: "auto-rows-fr",
			horizontal: "!grid-cols-1",
		},
		variant: {
			card: "gap-4 sm:gap-6",
			minimal: "gap-5",
		},
	},
	compoundVariants: [
		{
			orientation: "horizontal",
			variant: "card",
			class: "gap-4",
		},
		{
			orientation: "horizontal",
			variant: "minimal",
			class: "gap-2",
		},
	],
	defaultVariants: { size: "m", orientation: "vertical", variant: "card" },
});

export interface CardCollectionProps
	extends VariantProps<typeof collectionGridVariants> {
	items: CardCollectionItem[];
	className?: string;
	variant?: "card" | "minimal";
	aspectRatio?: "square" | "video" | "portrait";
	imageShape?: "square" | "circle";
	titleStyle?: "simple" | "bold";
	limit?: number;
	onItemClick?: (item: CardCollectionItem, index: number) => void;
	// NEW: Collection-wide defaults for new features
	metaPosition?: "header" | "footer" | "above-title" | "below-title";
	renderMeta?: (meta: string, item: CardCollectionItem) => React.ReactNode;
	renderAction?: (item: CardCollectionItem, index: number) => React.ReactNode;
	renderFooter?: (item: CardCollectionItem, index: number) => React.ReactNode;
	showSeparators?: boolean;
	itemAs?: "article" | "div";
	renderItem?: (item: CardCollectionItem, index: number) => React.ReactNode;
	clampTitle?: boolean | number;
	clampDescription?: boolean | number;
}

export function CardCollection({
	items,
	size = "m",
	variant = "card",
	orientation = "vertical",
	aspectRatio = "square",
	imageShape = "square",
	titleStyle = "simple",
	limit,
	className,
	onItemClick,
	metaPosition = "above-title",
	renderMeta,
	renderAction,
	renderFooter,
	showSeparators = false,
	itemAs = "article",
	renderItem,
	clampTitle,
	clampDescription,
}: CardCollectionProps) {
	// Apply limit if specified
	const displayedItems = limit ? items.slice(0, limit) : items;

	return (
		<div
			className={cn(
				collectionGridVariants({ size, orientation, variant }),
				className,
			)}
		>
			{displayedItems.map((item, index) => {
				// Allow custom render function
				if (renderItem) {
					return (
						<div key={item.id ?? `${item.title}-${index}`}>
							{renderItem(item, index)}
						</div>
					);
				}

				// Build enhanced item with custom renderers
				const enhancedItem: CardCollectionItem = {
					...item,
					// Apply custom meta renderer if provided
					meta: renderMeta && item.meta ? undefined : item.meta,
					// Merge action from props
					action: item.action ?? renderAction?.(item, index),
					// Merge footer from props
					footer: item.footer ?? renderFooter?.(item, index),
				};

				// Inject custom meta renderer as action if metaPosition is header/footer
				if (renderMeta && item.meta) {
					const customMetaNode = renderMeta(item.meta, item);
					if (metaPosition === "header" && !enhancedItem.action) {
						enhancedItem.action = customMetaNode;
					} else if (metaPosition === "footer") {
						enhancedItem.footer = (
							<>
								{customMetaNode}
								{enhancedItem.footer}
							</>
						);
					}
				}

				return (
					<CardItem
						as={itemAs}
						aspectRatio={aspectRatio}
						clampDescription={clampDescription}
						clampTitle={clampTitle}
						imageShape={imageShape}
						item={enhancedItem}
						key={item.id ?? `${item.title}-${index}`}
						metaPosition={metaPosition}
						onClick={onItemClick ? () => onItemClick(item, index) : undefined}
						orientation={orientation ?? "vertical"}
						showSeparators={showSeparators}
						titleStyle={titleStyle}
						variant={variant}
					/>
				);
			})}
		</div>
	);
}

// Re-export CardCollectionItem type for convenience
export type { CardCollectionItem } from "./card-item";
