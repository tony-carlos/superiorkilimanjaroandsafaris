import { fetchDestinationBySlug, fetchDestinations } from "@/utils/api";
import {
  safeParseJSON,
  getYoutubeEmbedUrl,
  getDestinationImageUrl,
  formatCurrency,
  getMediumImagesFromDestination,
} from "@/utils/helpers";
import Link from "next/link";
import Image from "next/image";
import Header1 from "@/components/layout/header/Header1";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header3 from "@/components/layout/header/Header3";
import DestinationClient from "./DestinationClient";

// Generate static params for all destinations
export async function generateStaticParams() {
  try {
    const response = await fetchDestinations();
    const destinations = response.data || [];

    return destinations.map((destination) => ({
      slug: destination.slug || String(destination.id),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function DestinationPage({ params }) {
  const destination = await fetchDestinationBySlug(params.slug);

  if (!destination) {
    return (
      <div className="container py-5">
        <h1>Destination not found</h1>
      </div>
    );
  }

  // Fetch all destinations for related destinations
  const allDestinationsResponse = await fetchDestinations();
  const allDestinations = allDestinationsResponse.data || [];

  // Filter out current destination and limit to 8
  const relatedDestinations = allDestinations
    .filter((d) => String(d.id) !== String(destination.id))
    .slice(0, 8);

  return (
    <DestinationClient
      destination={destination}
      relatedDestinations={relatedDestinations}
    />
  );
}
