const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to get the image source
export function getTourImageSource(tour) {
  // Default fallback image
  const defaultImage = "/img/tours/1/1.png";

  try {
    // Check if tour exists
    if (!tour) return defaultImage;

    // Check for direct URL in the images array
    if (tour.images && Array.isArray(tour.images) && tour.images.length > 0) {
      // If the image has a direct URL, use it
      if (tour.images[0].url) {
        return tour.images[0].url;
      }

      // If the image has a path, construct the URL
      if (tour.images[0].path) {
        return `https://pub-52b9ad9500f64d9bbe7b895b30666182.r2.dev/${tour.images[0].path}`;
      }
    }

    // Fallback to default image
    return defaultImage;
  } catch (error) {
    console.error("Error getting tour image source:", error);
    return defaultImage;
  }
}

export const fetchTourPackages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tour-packages`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tour packages:", error);
    throw error;
  }
};

export const fetchTourPackageBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tour-packages/${slug}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tour package by slug:", error);
    throw error;
  }
};

export const fetchFeaturedTours = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tour-packages/featured`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Validate the response structure
    if (!data.success || !Array.isArray(data.data)) {
      throw new Error("Invalid response structure");
    }

    // Transform the data to ensure consistent structure
    const transformedData = {
      success: data.success,
      data: data.data.map((tour) => ({
        id: tour.id,
        title: tour.title,
        slug: tour.slug,
        description: tour.description,
        country: tour.country,
        group_type: tour.group_type,
        main_focus: tour.main_focus,
        duration: tour.duration,
        categories: tour.categories,
        tags: tour.tags,
        images: tour.images || [],
        pricing: tour.pricing,
        status: tour.status,
        created_at: tour.created_at,
        updated_at: tour.updated_at,
      })),
      count: data.count,
    };

    return transformedData;
  } catch (error) {
    console.error("Error fetching featured tours:", error);
    throw error;
  }
};

export const fetchHikingTours = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tour-packages/hiking`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching hiking tours:", error);
    throw error;
  }
};

export const fetchDayTrips = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tour-packages/day-trips`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching day trips:", error);
    throw error;
  }
};

export const fetchSafaris = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tour-packages/safaris`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching safaris:", error);
    throw error;
  }
};

export const fetchOffers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tour-packages/offers`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tour offers:", error);
    throw error;
  }
};
export const fetchMountain = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tour-packages/mountain`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tour offers:", error);
    throw error;
  }
};
