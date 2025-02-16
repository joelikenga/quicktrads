"use client";
import Image from "next/image";
import { useState } from "react";

interface SafeImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export const SafeImage = ({ src, alt, width, height, className, priority }: SafeImageProps) => {
  const [error, setError] = useState(false);

  return (
    <Image
      src={error ? '/fallback-image.png' : src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => setError(true)}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
};
