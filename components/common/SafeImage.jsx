"use client";

import { useState, useEffect } from "react";

/**
 * SafeImage component that handles image loading errors gracefully
 * @param {string} src - The image source URL
 * @param {string} alt - Alt text for the image
 * @param {string} className - CSS classes for the image
 * @param {number} width - Width of the image
 * @param {number} height - Height of the image
 * @param {Object} style - Additional inline styles
 * @param {Object} props - Any other props to pass to the img element
 */
export default function SafeImage({
  src,
  alt = "Image",
  className = "",
  width,
  height,
  style = {},
  fallbackContent = null,
  ...props
}) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Reset states when src changes
  useEffect(() => {
    setError(false);
    setLoaded(false);
  }, [src]);

  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    setError(true);
  };

  // Use the direct URL without modification
  const imageUrl = src;

  const defaultFallback = (
    <div
      className={`flex items-center justify-center bg-gray-200 ${className}`}
      style={{ width, height, ...style }}
    >
      <span className="text-sm text-gray-500">No image</span>
      {process.env.NODE_ENV === "development" && (
        <div
          style={{
            fontSize: "8px",
            position: "absolute",
            bottom: "5px",
            maxWidth: "90%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            wordBreak: "break-all",
          }}
        >
          Failed URL: {src}
        </div>
      )}
    </div>
  );

  if (error) {
    return fallbackContent || defaultFallback;
  }

  return (
    <>
      {!loaded && (
        <div
          className={`flex items-center justify-center bg-gray-100 ${className}`}
          style={{ width, height, ...style }}
        >
          <span className="text-xs text-gray-400">Loading...</span>
        </div>
      )}
      <img
        src={imageUrl}
        alt={alt}
        className={className}
        width={width}
        height={height}
        style={{
          ...style,
          display: loaded ? "block" : "none",
        }}
        onError={handleError}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </>
  );
}
