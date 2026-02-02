"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { type ListCollectionItem, ListItem } from "./list-item";

// LIST WRAPPER LAYOUT
const listWrapperVariants = cva("flex w-full flex-col", {
	variants: {
		variant: {
			default: "gap-0", // Separators provide spacing
			card: "gap-3", // Gap between cards
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface ListCollectionProps
	extends VariantProps<typeof listWrapperVariants> {
	// Required
	items: ListCollectionItem[];

	// Variants (collection-level defaults)
	size?: "default" | "compact";
	variant?: "default" | "card";
	imageShape?: "square" | "circle";
	titleStyle?: "simple" | "bold";
	metaPosition?: "above-title" | "below-title";

	// Display
	limit?: number;

	// Interaction
	onItemClick?: (item: ListCollectionItem, index: number) => void;

	// Custom rendering
	renderMeta?: (meta: string, item: ListCollectionItem) => React.ReactNode;
	renderActions?: (item: ListCollectionItem, index: number) => React.ReactNode;

	// Text clamping
	clampTitle?: boolean | number;
	clampDescription?: boolean | number;

	// Semantics
	itemAs?: "div" | "article";

	// Styling
	className?: string;
}

export function ListCollection({
	items,
	size = "default",
	variant = "default",
	imageShape = "square",
	titleStyle = "simple",
	metaPosition = "above-title",
	limit,
	className,
	onItemClick,
	renderMeta,
	renderActions,
	clampTitle,
	clampDescription,
	itemAs = "article",
}: ListCollectionProps) {
	// Apply limit if specified
	const displayedItems = limit ? items.slice(0, limit) : items;

	// Empty state
	if (displayedItems.length === 0) {
		return (
			<div className="flex min-h-[200px] items-center justify-center text-muted-foreground">
				<p>No items to display</p>
			</div>
		);
	}

	return (
		<div className={cn(listWrapperVariants({ variant }), className)}>
			{displayedItems.map((item, index) => {
				const isLastItem = index === displayedItems.length - 1;

				// Build enhanced item with custom renderers
				const enhancedItem: ListCollectionItem = {
					...item,
					// Apply custom meta renderer if provided and meta is a string
					meta:
						renderMeta && typeof item.meta === "string"
							? renderMeta(item.meta, item)
							: item.meta,
				};

				return (
					<div key={item.id ?? `${item.title}-${index}`}>
						<ListItem
							as={itemAs}
							clampDescription={clampDescription}
							clampTitle={clampTitle}
							imageShape={imageShape}
							item={enhancedItem}
							metaPosition={metaPosition}
							onClick={onItemClick ? () => onItemClick(item, index) : undefined}
							renderActions={
								renderActions ? () => renderActions(item, index) : undefined
							}
							size={size}
							titleStyle={titleStyle}
							variant={variant}
						/>

						{/* Add separator between items for default variant */}
						{!isLastItem && variant === "default" && <Separator />}
					</div>
				);
			})}
		</div>
	);
}

// Re-export types for convenience
export type {
	ListCollectionAction,
	ListCollectionItem,
} from "./list-item";
