import Image from "next/image";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  loading?: "lazy" | "eager";
  fill?: boolean;
  style?: React.CSSProperties;
}

export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      className,
      priority = false,
      placeholder = "empty",
      blurDataURL,
      sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
      quality = 85,
      loading = "lazy",
      fill = false,
      style,
      ...props
    },
    ref
  ) => {
    // Using a simple color placeholder instead of runtime canvas generation
    // to avoid 'document is not defined' error during SSR
    const defaultBlurDataURL =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=";

    // Only include loading if priority is false
    // to avoid conflicting properties error
    const imageProps = {
      src,
      alt,
      className: cn(
        "transition-all duration-300 ease-in-out",
        "hover:scale-105 hover:shadow-lg",
        className
      ),
      priority,
      placeholder: placeholder || "blur",
      blurDataURL: blurDataURL || defaultBlurDataURL,
      sizes,
      quality,
      loading: priority ? undefined : loading,
      style,
      ...props,
    };

    if (fill) {
      return (
        <Image
          {...imageProps}
          fill
          alt={alt}
          style={{
            objectFit: "cover",
            ...style,
          }}
        />
      );
    }

    return (
      <Image
        {...imageProps}
        width={width}
        height={height}
        alt={alt}
        ref={ref}
      />
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";

// Avatar component with optimized image loading
export const Avatar = forwardRef<
  HTMLImageElement,
  {
    src: string;
    alt: string;
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
  }
>(({ src, alt, size = "md", className }, ref) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const pixelSizes = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
    xl: { width: 96, height: 96 },
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full",
        sizeClasses[size],
        className
      )}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        width={pixelSizes[size].width}
        height={pixelSizes[size].height}
        className="object-cover"
        priority={size === "xl"}
        placeholder="blur"
        ref={ref}
      />
    </div>
  );
});

Avatar.displayName = "Avatar";
