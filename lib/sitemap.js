import {
  fetchTourPackages,
  fetchFeaturedTours,
  fetchHikingTours,
  fetchDayTrips,
  fetchSafaris,
  fetchOffers,
} from "@/utils/tourPackages";
import { fetchAllDestinations, fetchBlogs } from "@/utils/api";

export default function sitemap() {
  const baseUrl = "https://www.kilimanjaroexplore.com";

  // Generate your routes here - this is a basic example
  const routes = [
    "",
    "/about",
    "/services",
    "/destinations",
    "/contact",
    "/climbing-kilimanjaro",
    "/tanzanian-travel",

    // Add all your important pages here
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1 : 0.8,
  }));

  return routes;
}
