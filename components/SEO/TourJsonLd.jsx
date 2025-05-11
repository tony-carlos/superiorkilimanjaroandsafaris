"use client";

import { useEffect } from "react";

// Component to add JSON-LD structured data to tour pages
export default function TourJsonLd({ tour }) {
  useEffect(() => {
    if (!tour) return;

    // Check if we have SEO data from the API
    const hasSeoData =
      tour.seo && (tour.seo.title || tour.seo.description || tour.seo.keywords);

    // Basic tour information
    const tourTitle = tour.title || tour.name;
    const seoTitle = hasSeoData
      ? tour.seo.title.split("|")[0].trim()
      : tourTitle;
    const tourLocation = tour.location || "Tanzania";
    const tourDuration = tour.duration || tour.itinerary?.length || "multi-day";
    const baseUrl = "https://kilimanjaroexplore.com";

    // Create a main image URL for structured data
    const mainImage =
      tour.images?.[0]?.url ||
      tour.thumbnail ||
      tour.featuredImage ||
      "/img/default-tour.jpg";

    // Create the structured data object
    const tourData = {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: seoTitle,
      description: hasSeoData
        ? tour.seo.description
        : tour.description ||
          `${tourDuration} day safari tour in ${tourLocation}`,
      touristType:
        tour.touristType || "Couples, families, wildlife enthusiasts",
      offers: {
        "@type": "Offer",
        price:
          tour.price ||
          tour.pricing?.high?.costs?.[0]?.cost ||
          "Contact for pricing",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${baseUrl}/itineraries/${tour.slug || tour.id}`,
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
        url: baseUrl,
        logo: `${baseUrl}/img/logo.png`,
      },
      keywords: hasSeoData ? tour.seo.keywords : undefined,
    };

    // Add FAQs if they exist
    if (Array.isArray(tour.faqs) && tour.faqs.length > 0) {
      tourData.mainEntity = {
        "@type": "FAQPage",
        mainEntity: tour.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      };
    }

    // Add the script tag to the document
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(tourData);
    document.head.appendChild(script);

    // Clean up function
    return () => {
      document.head.removeChild(script);
    };
  }, [tour]);

  // This component doesn't render anything visible
  return null;
}
