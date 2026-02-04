"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

// VALUE STYLING (large number)
const bigNumberValueVariants = cva(
  "min-w-0 overflow-hidden break-all font-bold tabular-nums leading-none tracking-tight",
  {
    variants: {
      size: {
        sm: "text-2xl sm:text-3xl",
        md: "text-3xl sm:text-4xl",
        lg: "text-4xl sm:text-5xl",
        xl: "text-5xl sm:text-6xl lg:text-7xl",
      },
      valueVariant: {
        default: "",
        gradient:
          "bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent",
        muted: "text-muted-foreground",
        primary: "text-primary",
      },
    },
    defaultVariants: {
      size: "md",
      valueVariant: "default",
    },
  }
);

// LABEL STYLING (title)
const bigNumberLabelVariants = cva("font-medium tracking-tight", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
    },
    labelStyle: {
      simple: "",
      bold: "font-semibold",
      uppercase: "uppercase tracking-wide",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    size: "md",
    labelStyle: "muted",
  },
});

// CONTAINER STYLING
const bigNumberContainerVariants = cva(
  "group relative flex min-w-0 flex-col transition-all duration-200",
  {
    variants: {
      variant: {
        card: [
          "rounded-lg border bg-card p-6 text-card-foreground shadow-sm",
          "hover:-translate-y-0.5 hover:shadow-md",
        ],
        outline: ["rounded-lg border-2 p-6", "hover:border-primary/50"],
        ghost: ["rounded-lg p-6 hover:bg-muted/50"],
        minimal: "p-4",
      },
      alignment: {
        left: "items-start text-left",
        center: "items-center text-center",
        right: "items-end text-right",
      },
      clickable: {
        true: "cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "card",
      alignment: "left",
      clickable: false,
    },
  }
);

// DESCRIPTION STYLING
const bigNumberDescriptionVariants = cva("leading-relaxed", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface BigNumberItem {
  // Core data
  value: string | number;
  label?: string;
  description?: string;

  // Identifiers
  id?: string | number;

  // Visual elements
  icon?: React.ReactNode;
  prefix?: string;
  suffix?: string;

  // Interaction
  href?: string;
  onClick?: () => void;

  // Custom content slots
  header?: React.ReactNode;
  footer?: React.ReactNode;

  // Accessibility
  ariaLabel?: string;

  // Per-item overrides
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "card" | "outline" | "ghost" | "minimal";
  valueVariant?: "default" | "gradient" | "muted" | "primary";
  alignment?: "left" | "center" | "right";

  // Styling
  classNames?: {
    root?: string;
    header?: string;
    icon?: string;
    value?: string;
    label?: string;
    description?: string;
    footer?: string;
  };
}

export interface BigNumberItemProps
  extends Pick<
    VariantProps<typeof bigNumberValueVariants>,
    "size" | "valueVariant"
  > {
  item: BigNumberItem;

  // Styling variants
  variant?: "card" | "outline" | "ghost" | "minimal";
  alignment?: "left" | "center" | "right";
  labelStyle?: "simple" | "bold" | "uppercase" | "muted";
  labelPosition?: "above" | "below";
  descriptionPosition?: "above" | "below";
  showIcon?: boolean;

  // Customization
  renderValue?: (item: BigNumberItem) => React.ReactNode;
  renderLabel?: (label: string, item: BigNumberItem) => React.ReactNode;
  renderIcon?: (icon: React.ReactNode, item: BigNumberItem) => React.ReactNode;

  // Interaction
  onClick?: () => void;
  as?: "div" | "article";

  // Styling
  classNames?: {
    root?: string;
    header?: string;
    icon?: string;
    value?: string;
    label?: string;
    description?: string;
    footer?: string;
  };
}

export function BigNumberItem({
  item,
  size = "md",
  variant = "card",
  valueVariant = "default",
  alignment = "left",
  labelStyle = "muted",
  labelPosition = "above",
  descriptionPosition = "below",
  showIcon = true,
  onClick,
  as: Element = "div",
  renderValue,
  renderLabel,
  renderIcon,
  classNames,
}: BigNumberItemProps) {
  // Per-item overrides
  const finalSize = item.size ?? size;
  const finalVariant = item.variant ?? variant;
  const finalValueVariant = item.valueVariant ?? valueVariant;
  const finalAlignment = item.alignment ?? alignment;

  // Determine interaction type
  const isLink = Boolean(item.href);
  const isClickable = Boolean(onClick) || Boolean(item.onClick) || isLink;

  // Handle click
  const handleClick = () => {
    if (item.onClick) {
      item.onClick();
    }
    if (onClick) {
      onClick();
    }
  };

  // Render value with prefix/suffix
  const renderValueContent = () => {
    if (renderValue) {
      return renderValue(item);
    }

    const valueText = `${item.prefix ?? ""}${item.value}${item.suffix ?? ""}`;

    return (
      <div
        className={cn(
          bigNumberValueVariants({
            size: finalSize,
            valueVariant: finalValueVariant,
          }),
          classNames?.value
        )}
      >
        {valueText}
      </div>
    );
  };

  // Render label
  const renderLabelContent = () => {
    if (!item.label) {
      return null;
    }

    if (renderLabel) {
      return renderLabel(item.label, item);
    }

    return (
      <div
        className={cn(
          bigNumberLabelVariants({ size: finalSize, labelStyle }),
          classNames?.label
        )}
      >
        {item.label}
      </div>
    );
  };

  // Render icon
  const renderIconContent = () => {
    if (!(showIcon && item.icon)) {
      return null;
    }

    if (renderIcon) {
      return renderIcon(item.icon, item);
    }

    return (
      <div
        className={cn(
          "mb-2 flex items-center justify-center rounded-md bg-muted/50 p-2",
          finalSize === "sm" && "h-8 w-8",
          finalSize === "md" && "h-10 w-10",
          finalSize === "lg" && "h-12 w-12",
          finalSize === "xl" && "h-14 w-14",
          classNames?.icon
        )}
      >
        {item.icon}
      </div>
    );
  };

  // Render description
  const renderDescription = () => {
    if (!item.description) {
      return null;
    }

    return (
      <div
        className={cn(
          bigNumberDescriptionVariants({ size: finalSize }),
          "text-muted-foreground",
          classNames?.description
        )}
      >
        {item.description}
      </div>
    );
  };

  // Build content
  const content = (
    <>
      {/* Header slot */}
      {item.header && (
        <div className={cn("mb-4", classNames?.header)}>{item.header}</div>
      )}

      {/* Icon */}
      {renderIconContent()}

      {/* Label above value */}
      {labelPosition === "above" && renderLabelContent()}

      {/* Description above value */}
      {descriptionPosition === "above" && renderDescription()}

      {/* Value */}
      {renderValueContent()}

      {/* Label below value */}
      {labelPosition === "below" && renderLabelContent()}

      {/* Description below value */}
      {descriptionPosition === "below" && renderDescription()}

      {/* Footer slot */}
      {item.footer && (
        <div className={cn("mt-4", classNames?.footer)}>{item.footer}</div>
      )}
    </>
  );

  // Container class
  const containerClassName = cn(
    bigNumberContainerVariants({
      variant: finalVariant,
      alignment: finalAlignment,
      clickable: isClickable,
    }),
    classNames?.root
  );

  // Accessibility
  const ariaLabel =
    item.ariaLabel ?? (item.label ? `${item.label}: ${item.value}` : undefined);

  // Render as link
  if (isLink && item.href) {
    return (
      <a
        aria-label={ariaLabel}
        className={containerClassName}
        href={item.href}
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  // Render as button
  if (isClickable) {
    return (
      <button
        aria-label={ariaLabel}
        className={containerClassName}
        onClick={handleClick}
        type="button"
      >
        {content}
      </button>
    );
  }

  // Render as static element
  return (
    <Element aria-label={ariaLabel} className={containerClassName}>
      {content}
    </Element>
  );
}
