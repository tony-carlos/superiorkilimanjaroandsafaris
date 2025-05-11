import {
  fetchTourPackages,
  fetchFeaturedTours,
  fetchHikingTours,
  fetchDayTrips,
  fetchSafaris,
  fetchOffers,
} from "@/utils/tourPackages";
import { fetchDestinations, fetchBlogs } from "@/utils/api";
import { NextResponse } from "next/server";

// Disable caching for this route
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const baseUrl = "https://www.serengetinexus.com";
  const apiUrl = "https://nexus.tjcarlos.tech";

  try {
    // Fetch tour packages in smaller chunks
    const fetchToursWithRetry = async (fetchFunction, retries = 3) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetchFunction(apiUrl);
          if (response?.data) {
            return response.data;
          }
        } catch (error) {
          console.warn(`Attempt ${i + 1} failed:`, error);
          if (i === retries - 1) throw error;
        }
      }
      return [];
    };

    // Fetch all data
    const [tours, featured, hiking, dayTrips, safaris, offers, destinations] =
      await Promise.all([
        fetchToursWithRetry(fetchTourPackages),
        fetchToursWithRetry(fetchFeaturedTours),
        fetchToursWithRetry(fetchHikingTours),
        fetchToursWithRetry(fetchDayTrips),
        fetchToursWithRetry(fetchSafaris),
        fetchToursWithRetry(fetchOffers),
        fetchToursWithRetry(fetchDestinations),
      ]);

    // Define all static pages with their priorities and change frequencies
    const staticPages = [
      {
        url: baseUrl,
        priority: "1.0",
        changefreq: "daily",
        lastmod: new Date().toISOString(),
      },
      {
        url: `${baseUrl}/tanzania-travel`,
        priority: "1.0",
        changefreq: "weekly",
        lastmod: new Date().toISOString(),
      },
      {
        url: `${baseUrl}/climbing-kilimanjaro`,
        priority: "1.0",
        changefreq: "weekly",
        lastmod: new Date().toISOString(),
      },
      {
        url: `${baseUrl}/destinations`,
        priority: "1.0",
        changefreq: "weekly",
        lastmod: new Date().toISOString(),
      },
      {
        url: `${baseUrl}/destinations/tanzania`,
        priority: "0.9",
        changefreq: "weekly",
        lastmod: new Date().toISOString(),
      },
      {
        url: `${baseUrl}/plan-your-trip`,
        priority: "0.9",
        changefreq: "weekly",
        lastmod: new Date().toISOString(),
      },
      {
        url: `${baseUrl}/about`,
        priority: "0.8",
        changefreq: "monthly",
        lastmod: new Date().toISOString(),
      },
      {
        url: `${baseUrl}/blogs`,
        priority: "0.8",
        changefreq: "weekly",
        lastmod: new Date().toISOString(),
      },
      {
        url: `${baseUrl}/contact`,
        priority: "0.8",
        changefreq: "monthly",
        lastmod: new Date().toISOString(),
      },
      {
        url: `${baseUrl}/privacy-policy`,
        priority: "0.3",
        changefreq: "yearly",
        lastmod: new Date().toISOString(),
      },
      {
        url: `${baseUrl}/terms-conditions`,
        priority: "0.3",
        changefreq: "yearly",
        lastmod: new Date().toISOString(),
      },
    ];

    // Function to create a URL entry with proper formatting and error handling
    const createUrlEntry = (
      item,
      basePath,
      priority = "0.8",
      changefreq = "daily"
    ) => {
      try {
        if (!item) {
          console.warn("Empty item provided to createUrlEntry");
          return "";
        }

        // Use slug if available, fallback to ID
        const urlPath = `${basePath}/${item.slug || item.id}`;

        // Use updated_at if available, fallback to created_at or current date
        const lastMod =
          item.updated_at || item.created_at || new Date().toISOString();

        // Validate URL components
        if (!urlPath || !lastMod) {
          console.warn("Invalid URL components for item:", item);
          return "";
        }

        return `
          <url>
            <loc>${baseUrl}${urlPath}</loc>
            <lastmod>${new Date(lastMod).toISOString()}</lastmod>
            <changefreq>${changefreq}</changefreq>
            <priority>${priority}</priority>
          </url>`;
      } catch (error) {
        console.error(`Error creating URL entry for item:`, item, error);
        return "";
      }
    };

    // Generate XML string with proper formatting
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <!-- Static Pages -->
    ${staticPages
      .map(
        (page) => `
    <url>
        <loc>${page.url}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`
      )
      .join("")}
    
    <!-- Tour Packages -->
    ${tours
      .map((tour) => createUrlEntry(tour, "/itineraries", "0.9", "daily"))
      .join("")}
    
    ${featured
      .map((tour) =>
        createUrlEntry(tour, "/itineraries/featured", "0.9", "daily")
      )
      .join("")}
    
    ${hiking
      .map((tour) =>
        createUrlEntry(tour, "/itineraries/hiking", "0.9", "daily")
      )
      .join("")}
    
    ${dayTrips
      .map((tour) =>
        createUrlEntry(tour, "/itineraries/day-trips", "0.8", "daily")
      )
      .join("")}
    
    ${safaris
      .map((tour) =>
        createUrlEntry(tour, "/itineraries/safaris", "0.9", "daily")
      )
      .join("")}
    
    ${offers
      .map((tour) =>
        createUrlEntry(tour, "/itineraries/offers", "0.8", "daily")
      )
      .join("")}

    <!-- Destinations -->
    ${destinations
      .map((destination) =>
        createUrlEntry(destination, "/destinations", "0.9", "weekly")
      )
      .join("")}
</urlset>`;

    // Return the XML with proper content type and caching headers
    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400, s-maxage=86400", // 24 hour cache
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
