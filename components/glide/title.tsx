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
        cover:
          "relative flex min-h-[240px] flex-col justify-end rounded-xl bg-slate-100",
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
        variant: "cover",
        size: "compact",
        className: "min-h-[200px]",
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
      cover: "absolute inset-0 h-full w-full rounded-xl object-cover",
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
        "relative z-10 w-full flex-row items-end gap-4 rounded-b-xl bg-white px-6 pt-16 pb-6",
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
      size: "compact",
      className: "gap-3 px-4 pt-12 pb-4",
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
        cover: "",
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
        cover: "text-2xl",
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
        className: "text-xl",
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
      cover: "text-base",
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
      className: "text-sm",
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
        cover: "absolute inset-0 h-full w-full rounded-xl",
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

const coverProfileImageVariants = cva(
  "flex-shrink-0 rounded-2xl border-4 border-white bg-slate-100 object-cover shadow-sm",
  {
    variants: {
      size: {
        default: "-mt-16 h-[120px] w-[120px]",
        compact: "-mt-12 h-[90px] w-[90px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const coverProfilePlaceholderVariants = cva(
  "flex flex-shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-slate-100 text-slate-400 shadow-sm",
  {
    variants: {
      size: {
        default: "-mt-16 h-[120px] w-[120px]",
        compact: "-mt-12 h-[90px] w-[90px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const coverTextWrapperVariants = cva(
  "flex min-w-0 flex-1 flex-col justify-end",
  {
    variants: {
      size: {
        default: "gap-1 pb-1",
        compact: "gap-0.5 pb-0.5",
      },
    },
    defaultVariants: {
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
  coverImageUrl?: string;
  imageFill?: "fill" | "fit";
  imageAlt?: string;
  coverImageAlt?: string;
  className?: string;
  truncate?: boolean;
}

function getImageDimensions(
  variant: TitleProps["variant"],
  size: TitleProps["size"]
) {
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
}

function TitleTextContent({
  title,
  subtitle,
  emphasis,
  variant,
  size,
  truncate,
}: {
  title: string;
  subtitle?: string;
  emphasis?: string;
  variant: TitleProps["variant"];
  size: TitleProps["size"];
  truncate?: boolean;
}) {
  return (
    <>
      {emphasis && (
        <p className={cn(emphasisTextVariants({ variant, size }))}>
          {emphasis}
        </p>
      )}
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
    </>
  );
}

function CoverVariant({
  title,
  subtitle,
  emphasis,
  imageUrl,
  coverImageUrl,
  imageAlt,
  coverImageAlt,
  size,
  className,
  truncate,
  imageFill,
}: TitleProps & { variant: "cover" }) {
  const hasImage = Boolean(imageUrl);
  const hasCoverImage = Boolean(coverImageUrl);

  return (
    <div
      className={cn(
        titleContainerVariants({ variant: "cover", size }),
        className
      )}
    >
      {hasCoverImage && coverImageUrl ? (
        <NextImage
          alt={coverImageAlt || "Cover image"}
          className={cn(
            titleImageVariants({ variant: "cover", size, imageFill })
          )}
          fill
          src={coverImageUrl}
        />
      ) : (
        <div
          aria-hidden="true"
          className={cn(imagePlaceholderVariants({ variant: "cover", size }))}
        >
          <ImageIcon className="h-16 w-16 text-slate-300" />
        </div>
      )}

      <div className={cn(titleContentVariants({ variant: "cover", size }))}>
        {hasImage && imageUrl ? (
          <NextImage
            alt={imageAlt || title}
            className={cn(coverProfileImageVariants({ size }))}
            height={size === "compact" ? 90 : 120}
            src={imageUrl}
            width={size === "compact" ? 90 : 120}
          />
        ) : (
          <div
            aria-hidden="true"
            className={cn(coverProfilePlaceholderVariants({ size }))}
          >
            <ImageIcon
              className={cn(
                "text-slate-300",
                size === "compact" ? "h-8 w-8" : "h-12 w-12"
              )}
            />
          </div>
        )}

        <div className={cn(coverTextWrapperVariants({ size }))}>
          <TitleTextContent
            emphasis={emphasis}
            size={size}
            subtitle={subtitle}
            title={title}
            truncate={truncate}
            variant="cover"
          />
        </div>
      </div>
    </div>
  );
}

export function Title({
  title,
  emphasis,
  subtitle,
  imageUrl,
  coverImageUrl,
  imageFill = "fill",
  imageAlt = "",
  coverImageAlt = "",
  variant = "simple",
  size = "default",
  className,
  truncate = false,
}: TitleProps) {
  if (variant === "cover") {
    return (
      <CoverVariant
        className={className}
        coverImageAlt={coverImageAlt}
        coverImageUrl={coverImageUrl}
        emphasis={emphasis}
        imageAlt={imageAlt}
        imageFill={imageFill}
        imageUrl={imageUrl}
        size={size}
        subtitle={subtitle}
        title={title}
        truncate={truncate}
        variant="cover"
      />
    );
  }

  const hasImage = Boolean(imageUrl);
  const showImage =
    (variant === "simple" && hasImage) ||
    (variant !== "simple" &&
      (hasImage || variant === "image" || variant === "profile"));

  const { width, height } = getImageDimensions(variant, size);

  return (
    <div className={cn(titleContainerVariants({ variant, size }), className)}>
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

      <div className={cn(titleContentVariants({ variant, size }))}>
        <TitleTextContent
          emphasis={emphasis}
          size={size}
          subtitle={subtitle}
          title={title}
          truncate={truncate}
          variant={variant}
        />
      </div>
    </div>
  );
}
