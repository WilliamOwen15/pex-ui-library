"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";
import {
  type BigNumberItem,
  BigNumberItem as BigNumberItemComponent,
} from "./big-number-item";

// GRID LAYOUT
export const collectionGridVariants = cva("grid w-full overflow-hidden", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      auto: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    },
    variant: {
      card: "gap-4 sm:gap-6",
      outline: "gap-4 sm:gap-6",
      ghost: "gap-3 sm:gap-4",
      minimal: "gap-3",
    },
  },
  defaultVariants: {
    columns: "auto",
    variant: "card",
  },
});

export interface BigNumberCollectionProps
  extends VariantProps<typeof collectionGridVariants> {
  items: BigNumberItem[];
  className?: string;

  // Styling variants
  variant?: "card" | "outline" | "ghost" | "minimal";
  size?: "sm" | "md" | "lg" | "xl";
  valueVariant?: "default" | "gradient" | "muted" | "primary";
  alignment?: "left" | "center" | "right";
  labelStyle?: "simple" | "bold" | "uppercase" | "muted";
  labelPosition?: "above" | "below";
  descriptionPosition?: "above" | "below";
  showIcon?: boolean;

  // Customization
  limit?: number;
  onItemClick?: (item: BigNumberItem, index: number) => void;
  renderValue?: (item: BigNumberItem, index: number) => React.ReactNode;
  renderLabel?: (
    label: string,
    item: BigNumberItem,
    index: number
  ) => React.ReactNode;
  renderIcon?: (
    icon: React.ReactNode,
    item: BigNumberItem,
    index: number
  ) => React.ReactNode;
  renderItem?: (item: BigNumberItem, index: number) => React.ReactNode;

  // Semantics
  itemAs?: "div" | "article";
}

export function BigNumberCollection({
  items,
  columns = "auto",
  variant = "card",
  size = "md",
  valueVariant = "default",
  alignment = "left",
  labelStyle = "muted",
  labelPosition = "above",
  descriptionPosition = "below",
  showIcon = true,
  limit,
  className,
  onItemClick,
  renderValue,
  renderLabel,
  renderIcon,
  renderItem,
  itemAs = "div",
}: BigNumberCollectionProps) {
  // Apply limit if specified
  const displayedItems = limit ? items.slice(0, limit) : items;

  return (
    <div
      className={cn(collectionGridVariants({ columns, variant }), className)}
    >
      {displayedItems.map((item, index) => {
        // Allow custom render function
        if (renderItem) {
          return (
            <div key={item.id ?? `big-number-${index}`}>
              {renderItem(item, index)}
            </div>
          );
        }

        return (
          <BigNumberItemComponent
            alignment={alignment}
            as={itemAs}
            classNames={item.classNames}
            descriptionPosition={descriptionPosition}
            item={item}
            key={item.id ?? `big-number-${index}`}
            labelPosition={labelPosition}
            labelStyle={labelStyle}
            onClick={onItemClick ? () => onItemClick(item, index) : undefined}
            renderIcon={
              renderIcon ? (icon) => renderIcon(icon, item, index) : undefined
            }
            renderLabel={
              renderLabel
                ? (label) => renderLabel(label, item, index)
                : undefined
            }
            renderValue={
              renderValue ? () => renderValue(item, index) : undefined
            }
            showIcon={showIcon}
            size={size}
            valueVariant={valueVariant}
            variant={variant}
          />
        );
      })}
    </div>
  );
}

// Re-export BigNumberItem type for convenience
export type { BigNumberItem } from "./big-number-item";
