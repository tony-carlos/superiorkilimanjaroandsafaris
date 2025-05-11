"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { fetchDestinations } from "@/utils/api";

export default function Destinations6() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

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

        console.log(
          "Destinations loaded for DestinationsThree:",
          destinationsData.length
        );
        setDestinations(destinationsData);
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
    <section className="layout-pt-xl layout-pb-xl">
      <div className="container">
        <div className="row y-gap-10 justify-between items-end">
          <div className="col-auto">
            <h2 data-aos="fade-up" data-aos-delay="" className="text-30">
              Trending Destinations
            </h2>
          </div>

          <div className="col-auto">
            <Link
              href={"/tour-list-1"}
              data-aos="fade-right"
              data-aos-delay=""
              className="buttonArrow d-flex items-center "
            >
              <span>See all</span>
              <i className="icon-arrow-top-right text-16 ml-10"></i>
            </Link>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay=""
          className="row y-gap-30 md:y-gap-20 pt-40 sm:pt-20"
        >
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
              destinations.slice(0, 12).map((destination, i) => (
                <div key={i} className="w-1/5 lg:w-1/4 md:w-1/2">
                  <Link
                    href="/tour-list-1"
                    className="featureCard -type-7 -hover-image-scale"
                  >
                    <div className="featureCard__image ratio ratio-23:30 -hover-image-scale__image rounded-12">
                      <Image
                        width={351}
                        height={451}
                        src={getImageSource(destination)}
                        alt={
                          destination.title || destination.name || "destination"
                        }
                        className="img-ratio rounded-12"
                      />
                    </div>

                    <div className="mt-20">
                      <h4 className="text-18 fw-500">
                        {" "}
                        {destination.title || destination.name}
                      </h4>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
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
