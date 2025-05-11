import { fetchTourPackageBySlug } from "@/utils/tourPackages";

export async function generateMetadata({ params }) {
  try {
    const response = await fetchTourPackageBySlug(params.id);
    const tour = response?.data;

    if (!tour) {
      return {
        title: "Tour Not Found | Kilimanjaro Explore",
        description: "The requested tour package could not be found.",
      };
    }

    // Check if we have SEO data from the API
    const hasSeoData =
      tour.seo && (tour.seo.title || tour.seo.description || tour.seo.keywords);

    // Extract key information for metadata
    const tourTitle = tour.title || tour.name;
    const tourLocation = tour.location || "Tanzania";
    const tourDuration =
      tour.duration?.value || tour.itinerary?.length || "multi-day";
    const tourHighlights = Array.isArray(tour.highlights)
      ? tour.highlights.join(", ")
      : typeof tour.highlights === "string"
      ? tour.highlights
      : "";

    // Clean up SEO data if it exists (remove excessive whitespace)
    if (hasSeoData && tour.seo.title) {
      tour.seo.title = tour.seo.title.replace(/\s{2,}/g, " ").trim();
    }

    if (hasSeoData && tour.seo.description) {
      tour.seo.description = tour.seo.description
        .replace(/\s{2,}/g, " ")
        .trim();
    }

    if (hasSeoData && tour.seo.keywords) {
      tour.seo.keywords = tour.seo.keywords.replace(/\s{2,}/g, " ").trim();
    }

    // Create a main image URL for SEO
    const mainImage =
      tour.images?.[0]?.url ||
      tour.thumbnail ||
      tour.featuredImage ||
      "/img/default-tour.jpg";

    // Base domain for canonical URLs
    const domain = "https://serengetinexus.com";
    const canonicalUrl = `${domain}/itineraries/${params.id}`;

    // Use SEO data from API if available, otherwise generate it
    const title = hasSeoData
      ? tour.seo.title
      : `${tourTitle} - ${tourDuration} Days Safari Tour in ${tourLocation} | Kilimanjaro Explore`;

    const description = hasSeoData
      ? tour.seo.description
      : `Experience the magic of ${tourTitle} with Kilimanjaro Explore. ${tourDuration} days of luxury safari in ${tourLocation} featuring ${
          tourHighlights || "amazing wildlife and landscapes"
        }. Book your unforgettable African adventure today!`;

    const keywords = hasSeoData
      ? tour.seo.keywords
      : [
          tourTitle,
          tourLocation,
          tour.touristType || "safari",
          "luxury safari",
          "Tanzania safari",
          "African safari",
          "Kilimanjaro Explore",
          "wildlife tour",
          `${tourDuration} day safari`,
          ...(Array.isArray(tour.activities)
            ? tour.activities
            : typeof tour.activities === "string"
            ? [tour.activities]
            : []),
          "Safari tour",
          "Tanzania travel",
          "Africa vacation",
        ]
          .filter(Boolean)
          .join(", ");

    // Structured data for search engines (JSON-LD)
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: hasSeoData ? tour.seo.title.split("|")[0].trim() : tourTitle,
      description: description,
      touristType:
        tour.touristType || "Couples, families, wildlife enthusiasts",
      offers: {
        "@type": "Offer",
        price:
          tour.price ||
          tour.pricing?.high?.costs?.[0]?.cost ||
          "Contact for pricing",
        priceCurrency: "USD",
      },
      itinerary: {
        "@type": "ItemList",
        numberOfItems: tourDuration,
        itemListElement: Array.isArray(tour.itinerary)
          ? tour.itinerary.map((day, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: day.title || `Day ${index + 1}`,
              description: day.description || "",
            }))
          : [],
      },
      image: mainImage,
      provider: {
        "@type": "Organization",
        name: "Kilimanjaro Explore",
        url: domain,
      },
    };

    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        images: [
          {
            url: mainImage,
            width: 1200,
            height: 630,
            alt: hasSeoData ? tour.seo.title.split("|")[0].trim() : tourTitle,
          },
        ],
        type: "website",
        locale: "en_US",
        url: canonicalUrl,
        siteName: "Kilimanjaro Explore",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [mainImage],
        site: "@SerengetiNexus",
      },
      alternates: {
        canonical: canonicalUrl,
      },
      robots: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
      other: {
        "fb:app_id": "1234567890", // Replace with your Facebook App ID if you have one
        "og:type": "website",
        "og:locale": "en_US",
      },
      // Add JSON-LD structured data to the page
      // This must be manually included in the page as Next.js metadata doesn't support it yet
      jsonLd,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Even in error case, try to use dynamic values from the URL parameters
    const tourIdFromParams = params.id;
    const formattedTourId = tourIdFromParams
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      title: `${formattedTourId} | Superior Kilimanjaro And Safaris
Safaris`,
      description: `Explore ${formattedTourId} with Kilimanjaro Explore. We offer the best safari experiences in Tanzania with professional guides and unforgettable adventures.`,
      keywords: `${formattedTourId}, Tanzania safari, Kilimanjaro Explore, wildlife tours, African safari`,
      openGraph: {
        title: `${formattedTourId} | Superior Kilimanjaro And Safaris
Safaris`,
        description: `Explore ${formattedTourId} with Kilimanjaro Explore. We offer the best safari experiences in Tanzania.`,
        images: [
          {
            url: "/img/default-tour.jpg",
            width: 1200,
            height: 630,
            alt: formattedTourId,
          },
        ],
      },
    };
  }
}
