"use client";

import PageHeader from "@/components/common/PageHeader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header3 from "@/components/layout/header/Header3";
import { fetchDestinations } from "@/utils/api";
import { getDestinationImageUrl } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDestinations() {
      try {
        const response = await fetchDestinations();
        setDestinations(response.data || []);
      } catch (error) {
        console.error("Error loading destinations:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDestinations();
  }, []);

  return (
    <>
      <Header3 />
      <PageHeader />

      {/* Destinations Grid */}
      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          {loading ? (
            <div className="row justify-center py-50">
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "4px solid #f3f3f3",
                  borderTop: "4px solid #3498db",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              >
                <style jsx>{`
                  @keyframes spin {
                    0% {
                      transform: rotate(0deg);
                    }
                    100% {
                      transform: rotate(360deg);
                    }
                  }
                `}</style>
              </div>
            </div>
          ) : (
            <div className="row y-gap-30">
              {destinations.map((destination) => (
                <div key={destination.id} className="col-lg-4 col-sm-6 col-12">
                  <Link
                    href={`/destinations/${destination.slug || destination.id}`}
                    className="destCard -type-1 d-block"
                  >
                    <div className="destCard__image position-relative">
                      <div className="ratio ratio-4:3">
                        <Image
                          className="img-ratio rounded-4"
                          src={getDestinationImageUrl(destination)}
                          alt={
                            destination.name ||
                            destination.title ||
                            "destination"
                          }
                          width={400}
                          height={300}
                          loading="lazy"
                          style={{ objectFit: "cover" }}
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+"
                          priority={false}
                          onError={(e) => {
                            e.target.src = "/img/destinationCards/1/1.png";
                          }}
                        />
                      </div>
                    </div>

                    <div className="destCard__content px-10 py-10">
                      <h4 className="text-dark-1 text-14 md:text-16 lh-16 fw-500 mb-5">
                        {destination.name || destination.title}
                      </h4>
                      <div className="d-flex items-center">
                        {destination.type && (
                          <span className="text-10 md:text-12 text-light mr-5">
                            {typeof destination.type === "object"
                              ? destination.type.name
                              : destination.type}
                          </span>
                        )}
                        {destination.zone && (
                          <span className="text-10 md:text-12 text-light">
                            {typeof destination.zone === "object"
                              ? destination.zone.name
                              : destination.zone}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <FooterOne />
    </>
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
