"use client";

import NextImage from "next/image";
import type * as React from "react";
import { useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

// Preset size mappings (convenience)
const PRESET_SIZES = {
  xs: 64,
  sm: 96,
  md: 192,
  lg: 384,
  xl: 512,
} as const;

// Rounded variants
const ROUNDED_CLASSES = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
} as const;

type AspectRatioValue =
  | "1:1"
  | "4:3"
  | "3:2"
  | "16:9"
  | "21:9"
  | "9:16"
  | "2:3"
  | number;

interface ImageProps {
  // Required
  src: string;
  alt: string;

  // Sizing modes (mutually exclusive)
  width?: number | string;
  height?: number | string;
  aspectRatio?: AspectRatioValue;
  preset?: keyof typeof PRESET_SIZES;

  // Visual styling
  fit?: "cover" | "contain";
  objectPosition?: string;
  rounded?: keyof typeof ROUNDED_CLASSES;

  // Behavioral
  loading?: "lazy" | "eager";
  priority?: boolean;
  onClick?: () => void;
  openOnClick?: boolean;

  // Error handling
  fallback?: React.ReactNode;
  onError?: () => void;

  // Styling
  className?: string;
  containerClassName?: string;
}

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

type SizingMode =
  | {
      mode: "explicit";
      width: number | string;
      height: number | string;
      useAspectRatio: false;
    }
  | {
      mode: "width-constrained";
      width: number | string;
      ratio: number;
      useAspectRatio: true;
    }
  | {
      mode: "height-constrained";
      height: number | string;
      ratio: number;
      useAspectRatio: true;
    }
  | {
      mode: "responsive";
      ratio: number;
      useAspectRatio: true;
    }
  | {
      mode: "intrinsic";
      useAspectRatio: false;
    };

function parseAspectRatio(ratio: AspectRatioValue): number {
  if (typeof ratio === "number") {
    return ratio;
  }

  const [w, h] = ratio.split(":").map(Number);
  return w / h;
}

function calculateDimensions(props: ImageProps): SizingMode {
  const { width, height, aspectRatio, preset } = props;

  // Apply preset if provided (preset acts as width)
  const effectiveWidth = preset ? PRESET_SIZES[preset] : width;

  // Mode A: Explicit dimensions
  if (effectiveWidth && height) {
    return {
      mode: "explicit",
      width: effectiveWidth,
      height,
      useAspectRatio: false,
    };
  }

  // Mode B: Width-constrained
  if (effectiveWidth && aspectRatio) {
    return {
      mode: "width-constrained",
      width: effectiveWidth,
      ratio: parseAspectRatio(aspectRatio),
      useAspectRatio: true,
    };
  }

  // Mode B: Height-constrained
  if (height && aspectRatio) {
    return {
      mode: "height-constrained",
      height,
      ratio: parseAspectRatio(aspectRatio),
      useAspectRatio: true,
    };
  }

  // Mode C: Responsive
  if (aspectRatio) {
    return {
      mode: "responsive",
      ratio: parseAspectRatio(aspectRatio),
      useAspectRatio: true,
    };
  }

  // Fallback: intrinsic sizing
  return {
    mode: "intrinsic",
    useAspectRatio: false,
  };
}

function Image({
  src,
  alt,
  width,
  height,
  aspectRatio,
  preset,
  fit = "cover",
  objectPosition,
  rounded = "md",
  loading = "lazy",
  priority = false,
  onClick,
  openOnClick = false,
  fallback,
  onError,
  className,
  containerClassName,
}: ImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (openOnClick) {
      setIsOpen(true);
    }
    if (onClick) {
      onClick();
    }
  };

  const handleImageError = () => {
    setImageError(true);
    if (onError) {
      onError();
    }
  };

  const dimensions = calculateDimensions({
    src,
    alt,
    width,
    height,
    aspectRatio,
    preset,
  });
  const roundedClass = ROUNDED_CLASSES[rounded];
  const isClickable = openOnClick || onClick;
  // When priority is true, don't pass loading prop (Next.js doesn't allow both)
  const imageLoading = priority ? undefined : loading;

  // Build container classes
  const baseContainerClasses = cn(
    "relative overflow-hidden",
    roundedClass,
    isClickable && "cursor-pointer",
    containerClassName
  );

  // Build image classes
  const imageClasses = cn(
    fit === "cover" ? "object-cover" : "object-contain",
    className
  );

  // Build image style
  const imageStyle: React.CSSProperties = objectPosition
    ? { objectPosition }
    : {};

  // Render error fallback
  const renderFallback = () => {
    if (fallback) {
      return (
        <div className="flex size-full items-center justify-center bg-muted">
          {fallback}
        </div>
      );
    }
    return (
      <div className="flex size-full items-center justify-center bg-muted">
        <span className="text-muted-foreground text-sm">
          {alt.slice(0, 2).toUpperCase()}
        </span>
      </div>
    );
  };

  // Mode A: Explicit dimensions (no AspectRatio)
  if (dimensions.mode === "explicit") {
    const widthValue =
      typeof dimensions.width === "number"
        ? dimensions.width
        : dimensions.width;
    const heightValue =
      typeof dimensions.height === "number"
        ? dimensions.height
        : dimensions.height;

    return (
      <>
        <div
          className={baseContainerClasses}
          onClick={isClickable ? handleClick : undefined}
          onKeyDown={
            isClickable
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick();
                  }
                }
              : undefined
          }
          role={isClickable ? "button" : undefined}
          style={{
            width:
              typeof widthValue === "number" ? `${widthValue}px` : widthValue,
            height:
              typeof heightValue === "number"
                ? `${heightValue}px`
                : heightValue,
          }}
          tabIndex={isClickable ? 0 : undefined}
        >
          {imageError ? (
            renderFallback()
          ) : (
            <NextImage
              alt={alt}
              className={imageClasses}
              fill
              loading={imageLoading}
              onError={handleImageError}
              priority={priority}
              src={src}
              style={imageStyle}
            />
          )}
        </div>
        {isOpen && (
          <ImageModal alt={alt} onClose={() => setIsOpen(false)} src={src} />
        )}
      </>
    );
  }

  // Mode B (width-constrained): Width + AspectRatio
  if (dimensions.mode === "width-constrained") {
    const widthValue =
      typeof dimensions.width === "number"
        ? `${dimensions.width}px`
        : dimensions.width;

    return (
      <>
        <div
          className={cn(
            "relative overflow-hidden",
            roundedClass,
            containerClassName
          )}
          style={{ width: widthValue }}
        >
          <AspectRatio ratio={dimensions.ratio}>
            <div
              className={cn("size-full", isClickable && "cursor-pointer")}
              onClick={isClickable ? handleClick : undefined}
              onKeyDown={
                isClickable
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleClick();
                      }
                    }
                  : undefined
              }
              role={isClickable ? "button" : undefined}
              tabIndex={isClickable ? 0 : undefined}
            >
              {imageError ? (
                renderFallback()
              ) : (
                <NextImage
                  alt={alt}
                  className={imageClasses}
                  fill
                  loading={imageLoading}
                  onError={handleImageError}
                  priority={priority}
                  src={src}
                  style={imageStyle}
                />
              )}
            </div>
          </AspectRatio>
        </div>
        {isOpen && (
          <ImageModal alt={alt} onClose={() => setIsOpen(false)} src={src} />
        )}
      </>
    );
  }

  // Mode B (height-constrained): Height + AspectRatio
  // Convert to explicit mode by calculating width from height × aspectRatio
  if (dimensions.mode === "height-constrained") {
    const heightValue =
      typeof dimensions.height === "number"
        ? dimensions.height
        : dimensions.height;

    // Calculate width = height × aspectRatio
    // For example: height=500, ratio=0.5625 (9:16) → width=281.25
    const calculatedWidthPx =
      typeof heightValue === "number" ? heightValue * dimensions.ratio : 0;

    const widthStyle =
      typeof dimensions.height === "number"
        ? `${calculatedWidthPx}px`
        : `calc(${dimensions.height} * ${dimensions.ratio})`;

    const heightStyle =
      typeof dimensions.height === "number"
        ? `${heightValue}px`
        : dimensions.height;

    return (
      <>
        <div
          className={baseContainerClasses}
          onClick={isClickable ? handleClick : undefined}
          onKeyDown={
            isClickable
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick();
                  }
                }
              : undefined
          }
          role={isClickable ? "button" : undefined}
          style={{
            width: widthStyle,
            height: heightStyle,
          }}
          tabIndex={isClickable ? 0 : undefined}
        >
          {imageError ? (
            renderFallback()
          ) : (
            <NextImage
              alt={alt}
              className={imageClasses}
              fill
              loading={imageLoading}
              onError={handleImageError}
              priority={priority}
              src={src}
              style={imageStyle}
            />
          )}
        </div>
        {isOpen && (
          <ImageModal alt={alt} onClose={() => setIsOpen(false)} src={src} />
        )}
      </>
    );
  }

  // Mode C (responsive): AspectRatio only
  if (dimensions.mode === "responsive") {
    return (
      <>
        <div
          className={cn(
            "relative overflow-hidden",
            roundedClass,
            containerClassName
          )}
        >
          <AspectRatio ratio={dimensions.ratio}>
            <div
              className={cn("size-full", isClickable && "cursor-pointer")}
              onClick={isClickable ? handleClick : undefined}
              onKeyDown={
                isClickable
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleClick();
                      }
                    }
                  : undefined
              }
              role={isClickable ? "button" : undefined}
              tabIndex={isClickable ? 0 : undefined}
            >
              {imageError ? (
                renderFallback()
              ) : (
                <NextImage
                  alt={alt}
                  className={imageClasses}
                  fill
                  loading={imageLoading}
                  onError={handleImageError}
                  priority={priority}
                  src={src}
                  style={imageStyle}
                />
              )}
            </div>
          </AspectRatio>
        </div>
        {isOpen && (
          <ImageModal alt={alt} onClose={() => setIsOpen(false)} src={src} />
        )}
      </>
    );
  }

  // Mode: Intrinsic (no constraints)
  return (
    <>
      <div
        className={baseContainerClasses}
        onClick={isClickable ? handleClick : undefined}
        onKeyDown={
          isClickable
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClick();
                }
              }
            : undefined
        }
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable ? 0 : undefined}
      >
        {imageError ? (
          renderFallback()
        ) : (
          <NextImage
            alt={alt}
            className={imageClasses}
            fill
            loading={imageLoading}
            onError={handleImageError}
            priority={priority}
            src={src}
            style={imageStyle}
          />
        )}
      </div>
      {isOpen && (
        <ImageModal alt={alt} onClose={() => setIsOpen(false)} src={src} />
      )}
    </>
  );
}

function ImageModal({ src, alt, onClose }: ImageModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClose();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="relative max-h-[90vh] max-w-[90vw]">
        <button
          aria-label="Close image"
          className="absolute top-2 right-2 z-10 rounded-full bg-background/80 p-2 transition-colors hover:bg-background"
          onClick={onClose}
          type="button"
        >
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Close</title>
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        <NextImage
          alt={alt}
          className="max-h-[90vh] max-w-[90vw] object-contain"
          height={1200}
          onClick={(e) => e.stopPropagation()}
          src={src}
          width={1200}
        />
      </div>
    </div>
  );
}

export { Image, ImageModal, type ImageProps, type ImageModalProps };
