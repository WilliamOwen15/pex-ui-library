import { cva } from "class-variance-authority";
import type React from "react";
import { cn } from "@/lib/utils";

const textVariants = cva("", {
	variants: {
		variant: {
			h1: "scroll-m-20 font-extrabold text-4xl tracking-tight",
			h2: "scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight",
			h3: "scroll-m-20 font-semibold text-2xl tracking-tight",
			h4: "scroll-m-20 font-semibold text-xl tracking-tight",
			p: "leading-7",
			lead: "text-muted-foreground text-xl",
			large: "font-semibold text-lg",
			small: "font-medium text-sm leading-none",
			muted: "text-muted-foreground text-sm",
			code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm",
		},
		size: {
			xs: "text-xs",
			sm: "text-sm",
			base: "text-base",
			lg: "text-lg",
			xl: "text-xl",
			"2xl": "text-2xl",
			"3xl": "text-3xl",
			"4xl": "text-4xl",
		},
		weight: {
			light: "font-light",
			normal: "font-normal",
			medium: "font-medium",
			semibold: "font-semibold",
			bold: "font-bold",
			extrabold: "font-extrabold",
		},
		align: {
			left: "text-left",
			center: "text-center",
			right: "text-right",
			justify: "text-justify",
		},
		color: {
			default: "text-foreground",
			muted: "text-muted-foreground",
			primary: "text-primary",
			destructive: "text-destructive",
			success: "text-green-600 dark:text-green-400",
			warning: "text-amber-600 dark:text-amber-400",
		},
		transform: {
			none: "normal-case",
			uppercase: "uppercase",
			lowercase: "lowercase",
			capitalize: "capitalize",
		},
	},
	defaultVariants: {
		variant: "p",
		color: "default",
		align: "left",
		transform: "none",
	},
});

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
	children: React.ReactNode;
	as?:
		| "h1"
		| "h2"
		| "h3"
		| "h4"
		| "h5"
		| "h6"
		| "p"
		| "span"
		| "div"
		| "label"
		| "code";
	variant?:
		| "h1"
		| "h2"
		| "h3"
		| "h4"
		| "p"
		| "lead"
		| "large"
		| "small"
		| "muted"
		| "code";
	size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
	weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
	align?: "left" | "center" | "right" | "justify";
	color?:
		| "default"
		| "muted"
		| "primary"
		| "destructive"
		| "success"
		| "warning";
	transform?: "none" | "uppercase" | "lowercase" | "capitalize";
	truncate?: boolean;
	clamp?: 1 | 2 | 3 | 4 | 5 | 6;
	className?: string;
}

function getDefaultElement(variant?: TextProps["variant"]): TextProps["as"] {
	if (!variant) {
		return "p";
	}

	const headingMap = {
		h1: "h1" as const,
		h2: "h2" as const,
		h3: "h3" as const,
		h4: "h4" as const,
	};

	if (variant in headingMap) {
		return headingMap[variant as keyof typeof headingMap];
	}

	if (variant === "code") {
		return "code";
	}

	if (variant === "small" || variant === "muted") {
		return "span";
	}

	return "p";
}

export function Text({
	children,
	as,
	variant = "p",
	size,
	weight,
	align,
	color,
	transform,
	truncate,
	clamp,
	className,
	...props
}: TextProps) {
	const Component = (as ?? getDefaultElement(variant)) as React.ElementType;

	return (
		<Component
			className={cn(
				textVariants({ variant, size, weight, align, color, transform }),
				truncate &&
					"block w-full min-w-0 overflow-hidden text-ellipsis whitespace-nowrap",
				clamp && `line-clamp-${clamp} overflow-hidden`,
				className,
			)}
			{...props}
		>
			{children}
		</Component>
	);
}
