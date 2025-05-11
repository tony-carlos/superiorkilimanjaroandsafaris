/**
 * Helper functions for common operations
 */

/**
 * Safely parse JSON string or return default value
 * @param {string} jsonString - JSON string to parse
 * @param {*} defaultValue - Default value to return if parsing fails
 * @returns {*} - Parsed JSON or default value
 */
export function safeParseJSON(jsonString, defaultValue = null) {
  if (!jsonString) return defaultValue;

  try {
    // Handle case where it's already an object/array
    if (typeof jsonString === "object") return jsonString;

    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return defaultValue;
  }
}

/**
 * Format currency values
 * @param {number} value - Value to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} - Formatted currency string
 */
export function formatCurrency(value, currency = "USD") {
  if (!value && value !== 0) return "";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value);
}

/**
 * Get YouTube embed URL from various YouTube URL formats
 * @param {string} url - YouTube URL
 * @returns {string} - YouTube embed URL or original URL if not recognized
 */
export function getYoutubeEmbedUrl(url) {
  if (!url) return "";

  try {
    // Convert youtube.com/watch?v=VIDEO_ID to youtube.com/embed/VIDEO_ID
    if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Convert youtu.be/VIDEO_ID to youtube.com/embed/VIDEO_ID
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url; // Return as is if already in embed format or unknown format
  } catch (error) {
    console.error("Error processing YouTube URL:", error);
    return url;
  }
}

/**
 * Get image source from destination object with fallback
 * @param {object} destination - Destination object
 * @returns {string} - Image URL
 */
export function getDestinationImageUrl(destination) {
  if (!destination) return "/img/destinationCards/1/1.png";

  // New API structure with images array containing size variants
  if (
    destination.images &&
    Array.isArray(destination.images) &&
    destination.images.length > 0
  ) {
    // Prefer medium size for general display
    if (destination.images[0].medium) {
      return destination.images[0].medium;
    }

    // Fallback to other sizes
    if (destination.images[0].large) {
      return destination.images[0].large;
    }

    if (destination.images[0].original) {
      return destination.images[0].original;
    }

    if (destination.images[0].thumbnail) {
      return destination.images[0].thumbnail;
    }
  }

  // Legacy approaches below

  // Check for medium direct URL
  if (destination?.images?.medium) {
    return destination.images.medium;
  }

  // Check for thumbnail
  if (destination?.images?.thumbnail) {
    return destination.images.thumbnail;
  }

  // Legacy approach - handle array of images
  if (
    destination?.images &&
    Array.isArray(destination.images) &&
    destination.images.length > 0 &&
    destination.images[0]?.path
  ) {
    let path = destination.images[0].path;

    // Make sure path includes destinations/ prefix
    if (!path.startsWith("destinations/") && path.includes("_original.jpg")) {
      path = `destinations/${path}`;
    }

    return `https://pub-52b9ad9500f64d9bbe7b895b30666182.r2.dev/${path}`;
  }

  // Fallback options
  if (destination?.thumbnail_url) {
    return destination.thumbnail_url;
  }

  if (destination?.imageSrc) {
    return destination.imageSrc;
  }

  if (destination?.image) {
    return destination.image;
  }

  return "/img/destinationCards/1/1.png";
}

/**
 * Extract an array of medium-sized images from a destination object
 * @param {object} destination - Destination object
 * @returns {string[]} - Array of image URLs
 */
export function getMediumImagesFromDestination(destination) {
  if (!destination) return [];

  // New API structure with images array containing size variants
  if (
    destination.images &&
    Array.isArray(destination.images) &&
    destination.images.length > 0
  ) {
    // Map all medium images from the array
    return destination.images
      .map((img) => {
        // Prefer medium size for slideshow
        if (img.medium) {
          return img.medium;
        } else if (img.large) {
          return img.large;
        } else if (img.original) {
          return img.original;
        } else if (img.thumbnail) {
          return img.thumbnail;
        }
        return null;
      })
      .filter(Boolean); // Remove any null entries
  }

  // First check if there's a parsed medium_images array
  if (destination.medium_images && Array.isArray(destination.medium_images)) {
    return destination.medium_images;
  }

  // Try to parse medium_images if it's a string
  if (
    destination.medium_images &&
    typeof destination.medium_images === "string"
  ) {
    try {
      const parsedImages = JSON.parse(destination.medium_images);
      if (Array.isArray(parsedImages)) {
        return parsedImages;
      }
    } catch (e) {
      console.error("Failed to parse medium_images:", e);
    }
  }

  // Check for images array structure
  if (destination.images && Array.isArray(destination.images)) {
    return destination.images
      .map((img) => {
        if (img.medium) return img.medium;
        if (img.path) {
          let path = img.path;
          // Convert original to medium if needed
          if (path.includes("_original.jpg")) {
            path = path.replace("_original.jpg", "_medium.jpg");
          }

          // Ensure path has destinations/ prefix
          if (!path.startsWith("destinations/")) {
            path = `destinations/${path}`;
          }

          return `https://pub-52b9ad9500f64d9bbe7b895b30666182.r2.dev/${path}`;
        }
        return null;
      })
      .filter(Boolean);
  }

  // Fallback to a single image (the main one)
  const mainImage = getDestinationImageUrl(destination);
  return mainImage ? [mainImage] : [];
}
