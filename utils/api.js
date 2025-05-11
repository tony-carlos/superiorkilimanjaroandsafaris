/**
 * API service for making requests to the backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetch destinations from the API
 * @returns {Promise<Object>} - API response with data array and count
 */
export async function fetchDestinations() {
  try {
    const response = await fetch(`${API_URL}/destinations`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();

    // Handle the new API response format which has { success, data, count }
    if (result && result.data && Array.isArray(result.data)) {
      // For debugging, log the first destination's image data
      if (result.data.length > 0) {
        console.log(
          "First destination:",
          result.data[0].title || result.data[0].name
        );
      }

      // Return the entire response object with data array and count
      return result;
    }

    // For backward compatibility, if the response is directly an array
    if (Array.isArray(result)) {
      // For debugging, log the first destination's data
      if (result.length > 0) {
        console.log(
          "First destination (legacy format):",
          result[0].title || result[0].name
        );
      }

      // Convert to new format
      return {
        success: true,
        data: result,
        count: result.length,
      };
    }

    // If unexpected format, return empty data array
    console.warn("Unexpected API response format:", result);
    return {
      success: false,
      data: [],
      count: 0,
    };
  } catch (error) {
    console.error("Error fetching destinations:", error);
    // Return empty data structure to prevent component errors
    return {
      success: false,
      data: [],
      count: 0,
      error: error.message,
    };
  }
}

/**
 * Fetch a single destination by ID
 * @param {number|string} id - Destination ID
 * @returns {Promise<Object>} - Destination object
 */
export async function fetchDestinationById(id) {
  try {
    const response = await fetch(`${API_URL}/destinations/${id}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching destination ${id}:`, error);
    return null;
  }
}

/**
 * Fetch a single destination by slug
 * @param {string} slug - Destination slug
 * @returns {Promise<Object>} - Destination object
 */
export async function fetchDestinationBySlug(slug) {
  try {
    // First try the slug-specific endpoint
    let response = await fetch(`${API_URL}/destinations/${slug}`);

    // If that fails, try to get all destinations and find by slug
    if (!response.ok) {
      console.log(
        `Direct slug endpoint failed (${response.status}), trying alternative approach...`
      );

      // Get all destinations
      const allDestinationsResponse = await fetch(`${API_URL}/destinations`);

      if (!allDestinationsResponse.ok) {
        throw new Error(`API error: ${allDestinationsResponse.status}`);
      }

      const allDestinationsResult = await allDestinationsResponse.json();

      // Handle new API response format with data property
      const allDestinations =
        allDestinationsResult.data && Array.isArray(allDestinationsResult.data)
          ? allDestinationsResult.data
          : Array.isArray(allDestinationsResult)
          ? allDestinationsResult
          : [];

      // Find the destination with matching slug
      const destination = allDestinations.find(
        (dest) => dest.slug === slug || String(dest.id) === slug
      );

      if (!destination) {
        throw new Error(`Destination with slug '${slug}' not found`);
      }

      console.log(
        "Found destination by filtering:",
        destination.title || destination.name
      );
      return destination;
    }

    const result = await response.json();

    // Handle new API response format with data property
    const data = result.data ? result.data : result;

    console.log(
      "Fetched destination by slug endpoint:",
      data.title || data.name
    );
    return data;
  } catch (error) {
    console.error(`Error fetching destination with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Helper function to get the correct image URL
 * @param {Object} destination - Destination object
 * @returns {string} - Image URL
 */
export function getImageUrl(destination) {
  // Default fallback image
  const defaultImage = "/img/destinationCards/1/1.png";

  try {
    // Check if we have the structure with direct medium URLs
    if (destination?.images?.medium) {
      // Use proxy for medium image
      return `/api/imageProxy?url=${encodeURIComponent(
        destination.images.medium
      )}`;
    }

    // Check for thumbnail as fallback
    if (destination?.images?.thumbnail) {
      // Use proxy for thumbnail image
      return `/api/imageProxy?url=${encodeURIComponent(
        destination.images.thumbnail
      )}`;
    }

    // Legacy approach for older data structure
    if (
      destination?.images &&
      Array.isArray(destination.images) &&
      destination.images.length > 0 &&
      destination.images[0]?.path
    ) {
      let path = destination.images[0].path;

      // Build the URL with the path properly formatted
      if (!path.startsWith("destinations/") && path.includes("_original.jpg")) {
        path = `destinations/${path}`;
      }

      // Create the full R2 URL
      const r2Url = `https://pub-52b9ad9500f64d9bbe7b895b30666182.r2.dev/${path}`;

      // Use proxy for R2 URL
      return `/api/imageProxy?url=${encodeURIComponent(r2Url)}`;
    }

    // Fallback options
    if (destination?.thumbnail_url) {
      return destination.thumbnail_url;
    }

    if (destination?.imageSrc) {
      return destination.imageSrc;
    }

    return defaultImage;
  } catch (error) {
    console.error("Error in getImageUrl:", error);
    return defaultImage;
  }
}

/**
 * Fetches blog posts from the API
 * @param {number} page - Page number for pagination
 * @returns {Promise} - Promise resolving to blog data
 */
export async function fetchBlogs() {
  try {
    // Make sure this URL is correct for your environment
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in fetchBlogs:", error);
    throw error; // Re-throw to handle in the component
  }
}

/**
 * Fetches Kilimanjaro routes from the API
 * @returns {Promise<Object>} - API response with data array
 */
export async function fetchKilimanjaroRoutes() {
  try {
    const response = await fetch(`${API_URL}/kilimanjaro-routes`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();

    // Return the entire response object with data array
    return result;
  } catch (error) {
    console.error("Error fetching Kilimanjaro routes:", error);

    // Return empty data structure to prevent component errors
    return {
      success: false,
      data: [],
      error: error.message,
    };
  }
}
