import { cva, type VariantProps } from "class-variance-authority";
import { Image as ImageIcon } from "lucide-react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";

const titleContainerVariants = cva(
  "w-full min-w-0 max-w-full overflow-hidden",
  {
    variants: {
      variant: {
        simple: "flex flex-row items-center gap-4",
        image: "flex flex-col gap-4 md:flex-row md:items-center md:gap-6",
        cover: "relative flex min-h-[200px] items-end",
        profile: "flex flex-col items-center gap-4 text-center",
      },
      size: {
        default: "",
        compact: "",
      },
    },
    compoundVariants: [
      {
        variant: "simple",
        size: "default",
        className: "py-4",
      },
      {
        variant: "simple",
        size: "compact",
        className: "py-2",
      },
      {
        variant: "profile",
        size: "default",
        className: "py-6",
      },
      {
        variant: "profile",
        size: "compact",
        className: "py-4",
      },
    ],
    defaultVariants: {
      variant: "simple",
      size: "default",
    },
  }
);

const titleImageVariants = cva("max-w-full flex-shrink-0", {
  variants: {
    variant: {
      simple: "h-[120px] w-[120px] rounded-xl",
      image: "w-full rounded-2xl md:h-[280px] md:w-[392px]",
      cover: "absolute inset-0 h-full w-full",
      profile: "mx-auto rounded-full",
    },
    size: {
      default: "",
      compact: "",
    },
    imageFill: {
      fill: "bg-slate-100 object-cover",
      fit: "bg-slate-200 object-contain p-4",
    },
  },
  compoundVariants: [
    {
      variant: "simple",
      size: "compact",
      className: "h-[70px] w-[70px]",
    },
    {
      variant: "image",
      size: "compact",
      className: "md:h-[200px] md:w-[280px]",
    },
    {
      variant: "profile",
      size: "default",
      className: "h-24 w-24",
    },
    {
      variant: "profile",
      size: "compact",
      className: "h-16 w-16",
    },
  ],
  defaultVariants: {
    variant: "simple",
    size: "default",
    imageFill: "fill",
  },
});

const titleContentVariants = cva("flex min-w-0 flex-col", {
  variants: {
    variant: {
      simple: "gap-2",
      image: "w-0 flex-1 justify-center gap-2",
      cover:
        "relative z-10 gap-2 bg-gradient-to-t from-black/80 to-transparent",
      profile: "gap-2",
    },
    size: {
      default: "",
      compact: "",
    },
  },
  compoundVariants: [
    {
      variant: "cover",
      size: "default",
      className: "p-6",
    },
    {
      variant: "cover",
      size: "compact",
      className: "p-4",
    },
  ],
  defaultVariants: {
    variant: "simple",
    size: "default",
  },
});

const emphasisTextVariants = cva(
  "mb-1 font-bold text-slate-500 text-xs uppercase tracking-widest",
  {
    variants: {
      variant: {
        simple: "",
        image: "",
        cover: "text-slate-300",
        profile: "",
      },
      size: {
        default: "",
        compact: "",
      },
    },
    defaultVariants: {
      variant: "simple",
      size: "default",
    },
  }
);

const titleTextVariants = cva(
  "font-bold text-slate-900 leading-tight tracking-tight",
  {
    variants: {
      variant: {
        simple: "text-2xl",
        image: "text-3xl md:text-4xl",
        cover: "text-3xl text-white md:text-4xl",
        profile: "text-3xl md:text-4xl",
      },
      size: {
        default: "",
        compact: "",
      },
    },
    compoundVariants: [
      {
        variant: "simple",
        size: "compact",
        className: "text-lg",
      },
      {
        variant: "image",
        size: "compact",
        className: "text-2xl md:text-3xl",
      },
      {
        variant: "cover",
        size: "compact",
        className: "text-2xl md:text-3xl",
      },
      {
        variant: "profile",
        size: "compact",
        className: "text-2xl md:text-3xl",
      },
    ],
    defaultVariants: {
      variant: "simple",
      size: "default",
    },
  }
);

const subtitleTextVariants = cva("text-slate-500 leading-relaxed", {
  variants: {
    variant: {
      simple: "text-base",
      image: "text-lg",
      cover: "text-lg text-slate-200",
      profile: "text-lg",
    },
    size: {
      default: "",
      compact: "",
    },
  },
  compoundVariants: [
    {
      variant: "simple",
      size: "compact",
      className: "text-sm",
    },
    {
      variant: "image",
      size: "compact",
      className: "text-base",
    },
    {
      variant: "cover",
      size: "compact",
      className: "text-base",
    },
    {
      variant: "profile",
      size: "compact",
      className: "text-base",
    },
  ],
  defaultVariants: {
    variant: "simple",
    size: "default",
  },
});

const imagePlaceholderVariants = cva(
  "flex items-center justify-center bg-slate-100 text-slate-400",
  {
    variants: {
      variant: {
        simple: "h-[120px] w-[120px] rounded-xl",
        image: "w-full rounded-2xl md:h-[280px] md:w-[392px]",
        cover: "absolute inset-0 h-full w-full",
        profile: "mx-auto rounded-full",
      },
      size: {
        default: "",
        compact: "",
      },
    },
    compoundVariants: [
      {
        variant: "simple",
        size: "compact",
        className: "h-[70px] w-[70px]",
      },
      {
        variant: "image",
        size: "compact",
        className: "md:h-[200px] md:w-[280px]",
      },
      {
        variant: "profile",
        size: "default",
        className: "h-24 w-24",
      },
      {
        variant: "profile",
        size: "compact",
        className: "h-16 w-16",
      },
    ],
    defaultVariants: {
      variant: "simple",
      size: "default",
    },
  }
);

export interface TitleProps
  extends VariantProps<typeof titleContainerVariants> {
  title: string;
  emphasis?: string;
  subtitle?: string;
  imageUrl?: string;
  imageFill?: "fill" | "fit";
  imageAlt?: string;
  className?: string;
  truncate?: boolean;
}

export function Title({
  title,
  emphasis,
  subtitle,
  imageUrl,
  imageFill = "fill",
  imageAlt = "",
  variant = "simple",
  size = "default",
  className,
  truncate = false,
}: TitleProps) {
  const hasImage = Boolean(imageUrl);
  // Show image area based on variant
  // For 'simple', only show if image exists
  // For 'cover' variant, only show if image exists (graceful degradation)
  // For 'image' and 'profile', show placeholder if no image
  const showImage =
    (variant === "simple" && hasImage) ||
    (variant !== "simple" &&
      (hasImage || variant === "image" || variant === "profile"));

  const getImageDimensions = () => {
    if (variant === "simple") {
      return size === "compact"
        ? { width: 70, height: 70 }
        : { width: 120, height: 120 };
    }
    if (variant === "image") {
      return size === "compact"
        ? { width: 280, height: 200 }
        : { width: 392, height: 280 };
    }
    if (variant === "profile") {
      return size === "compact"
        ? { width: 64, height: 64 }
        : { width: 96, height: 96 };
    }
    return { width: 800, height: 400 };
  };

  const { width, height } = getImageDimensions();

  return (
    <div className={cn(titleContainerVariants({ variant, size }), className)}>
      {/* Image or Placeholder */}
      {showImage &&
        (hasImage && imageUrl ? (
          <NextImage
            alt={imageAlt || title}
            className={cn(titleImageVariants({ variant, size, imageFill }))}
            height={height}
            src={imageUrl}
            width={width}
          />
        ) : (
          <div
            aria-hidden="true"
            className={cn(imagePlaceholderVariants({ variant, size }))}
          >
            <ImageIcon
              className={cn(
                "text-slate-300",
                size === "compact" ? "h-8 w-8" : "h-12 w-12"
              )}
            />
          </div>
        ))}

      {/* Content */}
      <div className={cn(titleContentVariants({ variant, size }))}>
        {/* Emphasis (small label above title) */}
        {emphasis && (
          <p className={cn(emphasisTextVariants({ variant, size }))}>
            {emphasis}
          </p>
        )}

        {/* Title */}
        {title && (
          <h1
            className={cn(
              titleTextVariants({ variant, size }),
              truncate && "truncate"
            )}
          >
            {title}
          </h1>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p
            className={cn(
              subtitleTextVariants({ variant, size }),
              truncate && "truncate"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
