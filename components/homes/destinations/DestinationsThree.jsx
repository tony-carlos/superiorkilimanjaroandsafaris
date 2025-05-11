"use client";

import { fetchDestinations } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function DestinationsThree() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // List of specific destinations we want to show
  const specificDestinations = [
    "Serengeti National Park",
    "Kilimanjaro National Park",
    "Ngorongoro Conservation Area",
    "Tarangire National Park",
    "Zanzibar",
    "Arusha National Park",
  ];

  useEffect(() => {
    async function getDestinations() {
      setLoading(true);
      try {
        const response = await fetchDestinations();
        // Handle the new API response format
        const destinationsData =
          response.data && Array.isArray(response.data)
            ? response.data
            : Array.isArray(response)
            ? response
            : [];

        // Filter to only include the specific destinations
        const filteredDestinations = destinationsData.filter((destination) =>
          specificDestinations.includes(destination.title || destination.name)
        );

        setDestinations(filteredDestinations);
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    }

    getDestinations();
  }, []);

  return (
    <section className="layout-pt-xl">
      <div className="container">
        <div className="row justify-between items-end y-gap-10">
          <div className="col-auto">
            <h2 data-aos="fade-up" data-aos-delay="" className="text-30">
              Our Destinations
            </h2>
          </div>

          <div className="col-auto">
            <Link
              href={"/destinations"}
              data-aos="fade-right"
              data-aos-delay=""
              className="buttonArrow d-flex items-center "
            >
              <span>See all</span>
              <i className="icon-arrow-top-right text-16 ml-10"></i>
            </Link>
          </div>
        </div>

        <div className="row y-gap-30 pt-40 sm:pt-20">
          {loading ? (
            <div className="col-12 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : destinations.length === 0 ? (
            <div className="col-12 text-center">
              <p>No destinations found</p>
            </div>
          ) : (
            destinations.map((destination, i) => (
              <div key={i} className="col-lg-2 col-md-3 col-6">
                <Link
                  href={`/destinations/${destination.slug || destination.id}`}
                  className="featureCard -type-2"
                >
                  <div className="featureCard__image ratio ratio-19:22 rounded-12">
                    <Image
                      width={284}
                      height={327}
                      src={getImageSource(destination)}
                      alt={
                        destination.title || destination.name || "destination"
                      }
                      className="img-ratio rounded-12"
                      unoptimized={true}
                    />
                  </div>

                  <div className="featureCard__content text-center">
                    <h4 className="text-white text-18">
                      {destination.title || destination.name}
                    </h4>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

// Helper function to get the image source
function getImageSource(destination) {
  // Default fallback image
  const defaultImage = "/img/destinations/4/1.png";

  // Handle new API structure with images array containing size variants
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

  // Check for medium direct URL
  if (destination?.images?.medium) {
    return destination.images.medium;
  }

  // Check for thumbnail
  if (destination?.images?.thumbnail) {
    return destination.images.thumbnail;
  }

  // Legacy approach
  if (
    destination?.images &&
    Array.isArray(destination.images) &&
    destination.images.length > 0 &&
    destination.images[0]?.path
  ) {
    let path = destination.images[0].path;

    // Check if we need to add destinations/ prefix
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

  return defaultImage;
}
