import { cva } from "class-variance-authority";
import type { ReactNode } from "react";
import { Title } from "@/components/glide/title";
import { cn } from "@/lib/utils";

const containerVariants = cva("w-full", {
  variants: {
    variant: {
      default: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
      narrow: "mx-auto max-w-3xl px-4 sm:px-6",
      fullMobile: "w-full md:mx-auto md:max-w-7xl md:px-8",
      full: "w-full",
    },
    padding: {
      none: "py-0",
      sm: "py-4",
      md: "py-8",
      lg: "py-12",
      xl: "py-16",
    },
    background: {
      none: "bg-transparent",
      card: "bg-card",
      accent: "bg-accent",
      dark: "bg-slate-900 text-white",
      image: "bg-center bg-cover bg-no-repeat",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
    background: "none",
  },
});

const columnLayoutVariants = cva("grid w-full gap-6 md:gap-8", {
  variants: {
    columns: {
      "1:1": "md:grid-cols-2",
      "1:2": "md:grid-cols-3",
      "2:1": "md:grid-cols-3",
    },
  },
});

export interface ContainerProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onClick"> {
  children?: ReactNode;
  variant?: "default" | "narrow" | "fullMobile" | "full";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "none" | "card" | "accent" | "dark" | "image";
  backgroundImageUrl?: string;
  title?: string;
  description?: string;
  onClick?: () => void;
  as?: "div" | "section" | "article" | "main";
  className?: string;
  columns?: "1:1" | "1:2" | "2:1";
  leftColumn?: ReactNode;
  rightColumn?: ReactNode;
}

export function Container({
  children,
  variant = "default",
  padding = "md",
  background = "none",
  backgroundImageUrl,
  title,
  description,
  onClick,
  as: Element = "div",
  className,
  style,
  columns,
  leftColumn,
  rightColumn,
  ...props
}: ContainerProps) {
  const isClickable = Boolean(onClick);
  const Component = isClickable ? "button" : Element;

  const backgroundStyle =
    background === "image" && backgroundImageUrl
      ? { backgroundImage: `url(${backgroundImageUrl})`, ...style }
      : style;

  const clickableProps = isClickable
    ? {
        role: "button",
        tabIndex: 0,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        },
      }
    : {};

  // Determine if we're using column layout
  const hasColumns = Boolean(columns && (leftColumn || rightColumn));

  return (
    <Component
      className={cn(
        containerVariants({ variant, padding, background }),
        isClickable && "cursor-pointer transition-colors hover:opacity-90",
        className
      )}
      onClick={onClick}
      style={backgroundStyle}
      {...clickableProps}
      {...props}
    >
      {(title || description) && (
        <div className="mb-8">
          <Title subtitle={description} title={title || ""} variant="simple" />
        </div>
      )}

      {hasColumns ? (
        <div className={cn(columnLayoutVariants({ columns }))}>
          <div
            className={cn(
              columns === "1:2" && "md:col-span-1",
              columns === "2:1" && "md:col-span-2"
            )}
          >
            {leftColumn}
          </div>
          <div
            className={cn(
              columns === "1:2" && "md:col-span-2",
              columns === "2:1" && "md:col-span-1"
            )}
          >
            {rightColumn}
          </div>
        </div>
      ) : (
        children
      )}
    </Component>
  );
}
