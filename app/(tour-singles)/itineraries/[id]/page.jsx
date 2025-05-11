"use client";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import PageHeader from "@/components/tourSingle/PageHeader";
import TourSlider from "@/components/tourSingle/TourSlider";
import SingleThree from "@/components/tourSingle/pages/SingleThree";
import TourJsonLd from "@/components/SEO/TourJsonLd";
import { fetchTourPackageBySlug } from "@/utils/tourPackages";
import { useEffect, useState } from "react";
import Head from "next/head";
import Header3 from "@/components/layout/header/Header3";

export default function Page({ params }) {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Store original metadata values to restore them later
    const originalTitle = document.title;
    const originalDescription = document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content");
    const originalKeywords = document
      .querySelector('meta[name="keywords"]')
      ?.getAttribute("content");
    const originalCanonical = document
      .querySelector('link[rel="canonical"]')
      ?.getAttribute("href");

    const loadTour = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchTourPackageBySlug(params.id);
        console.log("Tour API Response:", response);

        if (response && response.success) {
          setTour(response.data);

          // Set meta tags directly in the DOM for SEO
          const tourData = response.data;
          const hasSeoData =
            tourData.seo &&
            (tourData.seo.title ||
              tourData.seo.description ||
              tourData.seo.keywords);

          // Clean up SEO data
          let cleanTitle = "";
          let cleanDescription = "";
          let cleanKeywords = "";

          if (hasSeoData) {
            if (tourData.seo.title) {
              cleanTitle = tourData.seo.title.replace(/\s{2,}/g, " ").trim();
            }

            if (tourData.seo.description) {
              cleanDescription = tourData.seo.description
                .replace(/\s{2,}/g, " ")
                .trim();
            }

            if (tourData.seo.keywords) {
              cleanKeywords = tourData.seo.keywords
                .replace(/\s{2,}/g, " ")
                .trim();
            }
          }

          // Fallback values if SEO data isn't available
          const titleFallback = `${
            tourData.title || "Tour Package"
          } | Kilimanjaro Explore`;
          const descriptionFallback =
            tourData.description ||
            `Experience ${tourData.title || "our tour"} - a ${
              tourData.duration?.value ||
              tourData.itinerary?.length ||
              "multi-day"
            } day safari tour in ${
              tourData.location || "Tanzania"
            } with Kilimanjaro Explore.`;
          const keywordsFallback = `safari, Tanzania, ${
            tourData.title || ""
          }, Kilimanjaro Explore, wildlife, African safari`;

          // Set document title
          document.title =
            hasSeoData && cleanTitle ? cleanTitle : titleFallback;

          // Set meta description
          let metaDescription = document.querySelector(
            'meta[name="description"]'
          );
          if (!metaDescription) {
            metaDescription = document.createElement("meta");
            metaDescription.setAttribute("name", "description");
            document.head.appendChild(metaDescription);
          }
          metaDescription.setAttribute(
            "content",
            hasSeoData && cleanDescription
              ? cleanDescription
              : descriptionFallback
          );

          // Set meta keywords
          let metaKeywords = document.querySelector('meta[name="keywords"]');
          if (!metaKeywords) {
            metaKeywords = document.createElement("meta");
            metaKeywords.setAttribute("name", "keywords");
            document.head.appendChild(metaKeywords);
          }
          metaKeywords.setAttribute(
            "content",
            hasSeoData && cleanKeywords ? cleanKeywords : keywordsFallback
          );

          // Set canonical URL
          let canonicalLink = document.querySelector('link[rel="canonical"]');
          if (!canonicalLink) {
            canonicalLink = document.createElement("link");
            canonicalLink.setAttribute("rel", "canonical");
            document.head.appendChild(canonicalLink);
          }
          canonicalLink.setAttribute(
            "href",
            `https://serengetinexus.com/itineraries/${params.id}`
          );

          // Set Open Graph meta tags
          let ogTitle = document.querySelector('meta[property="og:title"]');
          if (!ogTitle) {
            ogTitle = document.createElement("meta");
            ogTitle.setAttribute("property", "og:title");
            document.head.appendChild(ogTitle);
          }
          ogTitle.setAttribute(
            "content",
            hasSeoData && cleanTitle ? cleanTitle : titleFallback
          );

          let ogDescription = document.querySelector(
            'meta[property="og:description"]'
          );
          if (!ogDescription) {
            ogDescription = document.createElement("meta");
            ogDescription.setAttribute("property", "og:description");
            document.head.appendChild(ogDescription);
          }
          ogDescription.setAttribute(
            "content",
            hasSeoData && cleanDescription
              ? cleanDescription
              : descriptionFallback
          );

          let ogUrl = document.querySelector('meta[property="og:url"]');
          if (!ogUrl) {
            ogUrl = document.createElement("meta");
            ogUrl.setAttribute("property", "og:url");
            document.head.appendChild(ogUrl);
          }
          ogUrl.setAttribute(
            "content",
            `https://serengetinexus.com/itineraries/${params.id}`
          );

          // Set Twitter Card meta tags
          let twitterCard = document.querySelector('meta[name="twitter:card"]');
          if (!twitterCard) {
            twitterCard = document.createElement("meta");
            twitterCard.setAttribute("name", "twitter:card");
            document.head.appendChild(twitterCard);
          }
          twitterCard.setAttribute("content", "summary_large_image");

          let twitterTitle = document.querySelector(
            'meta[name="twitter:title"]'
          );
          if (!twitterTitle) {
            twitterTitle = document.createElement("meta");
            twitterTitle.setAttribute("name", "twitter:title");
            document.head.appendChild(twitterTitle);
          }
          twitterTitle.setAttribute(
            "content",
            hasSeoData && cleanTitle ? cleanTitle : titleFallback
          );

          let twitterDescription = document.querySelector(
            'meta[name="twitter:description"]'
          );
          if (!twitterDescription) {
            twitterDescription = document.createElement("meta");
            twitterDescription.setAttribute("name", "twitter:description");
            document.head.appendChild(twitterDescription);
          }
          twitterDescription.setAttribute(
            "content",
            hasSeoData && cleanDescription
              ? cleanDescription
              : descriptionFallback
          );
        } else {
          setError("Failed to load tour details");
          console.error("Invalid response:", response);
        }
      } catch (error) {
        console.error("Error loading tour:", error);
        setError("Error loading tour details");
      } finally {
        setLoading(false);
      }
    };

    loadTour();

    // Cleanup function to restore original metadata when component unmounts
    return () => {
      // Restore original metadata
      if (originalTitle) document.title = originalTitle;

      const descriptionTag = document.querySelector('meta[name="description"]');
      if (descriptionTag && originalDescription) {
        descriptionTag.setAttribute("content", originalDescription);
      }

      const keywordsTag = document.querySelector('meta[name="keywords"]');
      if (keywordsTag && originalKeywords) {
        keywordsTag.setAttribute("content", originalKeywords);
      }

      const canonicalTag = document.querySelector('link[rel="canonical"]');
      if (canonicalTag && originalCanonical) {
        canonicalTag.setAttribute("href", originalCanonical);
      }

      // Restore Open Graph tags
      const ogTitleTag = document.querySelector('meta[property="og:title"]');
      if (ogTitleTag) ogTitleTag.setAttribute("content", originalTitle || "");

      const ogDescTag = document.querySelector(
        'meta[property="og:description"]'
      );
      if (ogDescTag)
        ogDescTag.setAttribute("content", originalDescription || "");
    };
  }, [params.id]);

  if (loading) {
    return (
      <div className="text-center py-40">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-40 text-red-1">Error: {error}</div>;
  }

  if (!tour) {
    return <div className="text-center py-40">Tour not found</div>;
  }

  // Check if we have SEO data from the API
  const hasSeoData =
    tour.seo && (tour.seo.title || tour.seo.description || tour.seo.keywords);

  // Clean up SEO data if it exists
  let cleanSeoTitle = "";
  let cleanSeoDescription = "";
  let cleanSeoKeywords = "";

  if (hasSeoData) {
    if (tour.seo.title) {
      cleanSeoTitle = tour.seo.title.replace(/\s{2,}/g, " ").trim();
    }

    if (tour.seo.description) {
      cleanSeoDescription = tour.seo.description.replace(/\s{2,}/g, " ").trim();
    }

    if (tour.seo.keywords) {
      cleanSeoKeywords = tour.seo.keywords.replace(/\s{2,}/g, " ").trim();
    }
  }

  // Create meta description from tour data for additional in-page SEO
  const metaDescription = hasSeoData
    ? cleanSeoDescription
    : tour.description ||
      `Experience ${tour.title || tour.name} - a ${
        tour.duration?.value || tour.itinerary?.length || "multi-day"
      } day safari tour in ${
        tour.location || "Tanzania"
      } with Kilimanjaro Explore.`;

  // Use SEO keywords if available
  const metaKeywords = hasSeoData
    ? cleanSeoKeywords
    : `safari, Tanzania, ${
        tour.title || ""
      }, Kilimanjaro Explore, wildlife, African safari`;

  return (
    <>
      {/* Add JSON-LD structured data */}
      <TourJsonLd tour={tour} />

      <main>
        <Header3 />
        <PageHeader tour={tour} />
        <SingleThree tour={tour} />
        <TourSlider />
        <FooterOne />
      </main>
    </>
  );
}
