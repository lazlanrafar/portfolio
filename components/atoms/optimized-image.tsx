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
    // Generate blur data URL for better loading experience
    const generateBlurDataURL = (w: number, h: number) => {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#f3f4f6";
        ctx.fillRect(0, 0, w, h);
      }
      return canvas.toDataURL();
    };

    const imageProps = {
      src,
      alt,
      className: cn(
        "transition-all duration-300 ease-in-out",
        "hover:scale-105 hover:shadow-lg",
        className
      ),
      priority,
      placeholder,
      blurDataURL:
        blurDataURL ||
        (width && height ? generateBlurDataURL(width, height) : undefined),
      sizes,
      quality,
      loading,
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
