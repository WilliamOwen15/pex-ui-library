import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const hintVariants = cva(
  "inline-flex w-full items-center gap-3 rounded-lg border p-4 text-sm transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50",
        neutral:
          "border-zinc-300 bg-zinc-100 text-zinc-950 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50",
        success:
          "border-green-200 bg-green-50 text-green-900 dark:border-green-900/50 dark:bg-green-950 dark:text-green-50",
        warning:
          "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950 dark:text-amber-50",
        danger:
          "border-red-200 bg-red-50 text-red-900 dark:border-red-900/50 dark:bg-red-950 dark:text-red-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const hintIconVariants = cva("size-5 shrink-0", {
  variants: {
    variant: {
      default: "text-zinc-500 dark:text-zinc-400",
      neutral: "text-zinc-600 dark:text-zinc-300",
      success: "text-green-600 dark:text-green-400",
      warning: "text-amber-600 dark:text-amber-400",
      danger: "text-red-600 dark:text-red-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface HintProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hintVariants> {
  icon?: React.ReactNode;
}

function Hint({ className, variant, icon, children, ...props }: HintProps) {
  return (
    <div
      className={cn(hintVariants({ variant, className }))}
      data-slot="hint"
      data-variant={variant}
      role="note"
      {...props}
    >
      {icon ? (
        <div aria-hidden="true" className={cn(hintIconVariants({ variant }))}>
          {icon}
        </div>
      ) : null}
      <div className="flex-1 leading-relaxed">{children}</div>
    </div>
  );
}

export { Hint, hintVariants };
