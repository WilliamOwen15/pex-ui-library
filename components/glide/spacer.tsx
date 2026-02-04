import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spacerVariants = cva("", {
  variants: {
    size: {
      xs: "h-2 w-2",
      sm: "h-4 w-4",
      md: "h-8 w-8",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
      "2xl": "h-24 w-24",
      "3xl": "h-32 w-32",
    },
    axis: {
      horizontal: "w-full",
      vertical: "h-full",
      both: "",
    },
  },
  defaultVariants: {
    size: "md",
    axis: "both",
  },
});

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  axis?: "horizontal" | "vertical" | "both";
  className?: string;
  responsive?: {
    sm?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
    md?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
    lg?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
    xl?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  };
}

const sizeMap = {
  xs: "2",
  sm: "4",
  md: "8",
  lg: "12",
  xl: "16",
  "2xl": "24",
  "3xl": "32",
} as const;

type Breakpoint = "sm" | "md" | "lg" | "xl";

function buildBreakpointClasses(
  breakpoint: Breakpoint,
  size: string,
  axis: "horizontal" | "vertical" | "both"
): string[] {
  const classes: string[] = [];

  if (axis === "horizontal" || axis === "both") {
    classes.push(`${breakpoint}:h-${size}`);
  }
  if (axis === "vertical" || axis === "both") {
    classes.push(`${breakpoint}:w-${size}`);
  }

  return classes;
}

export function Spacer({
  size = "md",
  axis = "both",
  className,
  responsive,
  ...props
}: SpacerProps) {
  const getResponsiveClasses = (): string => {
    if (!responsive) {
      return "";
    }

    const classes: string[] = [];
    const breakpoints: Breakpoint[] = ["sm", "md", "lg", "xl"];

    for (const breakpoint of breakpoints) {
      const breakpointSize = responsive[breakpoint];
      if (breakpointSize) {
        const size = sizeMap[breakpointSize];
        classes.push(...buildBreakpointClasses(breakpoint, size, axis));
      }
    }

    return classes.join(" ");
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        spacerVariants({ size, axis }),
        getResponsiveClasses(),
        className
      )}
      {...props}
    />
  );
}
