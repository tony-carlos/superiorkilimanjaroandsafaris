"use client";

import { fetchDestinations } from "@/utils/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DestinationsOne() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDestinations() {
      setLoading(true);
      try {
        const data = await fetchDestinations();
        console.log("Destinations loaded:", data.length);
        setDestinations(data);
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      } finally {
        setLoading(false);
      }
    }

    getDestinations();
  }, []);

  return (
    <section className="layout-pt-xl">
      <div className="container">
        <div className="row y-gap-10 justify-between items-end">
          <div className="col-auto">
            <h2 data-aos="fade-up" className="text-30 md:text-24">
              Trending destinations
            </h2>
          </div>

          <div data-aos="fade-up" className="col-auto">
            <Link
              href={"/tour-list-1"}
              className="buttonArrow d-flex items-center "
            >
              <span>See all</span>
              <i className="icon-arrow-top-right text-16 ml-10"></i>
            </Link>
          </div>
        </div>

        <div
          data-aos="fade-up"
          className="overflow-hidden pt-40 sm:pt-20 js-section-slider"
        >
          {loading ? (
            <div className="text-center py-50">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="swiper-wrapper">
              <Swiper
                spaceBetween={30}
                className="w-100"
                pagination={{
                  el: ".pbutton1",
                  clickable: true,
                }}
                modules={[Navigation, Pagination]}
                breakpoints={{
                  500: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 5,
                  },
                  1200: {
                    slidesPerView: 6,
                  },
                }}
              >
                {destinations.map((elm, i) => (
                  <SwiperSlide key={i}>
                    <Link
                      href={`/destinations/${elm.slug || elm.id}`}
                      className="featureImage -type-1 text-center -hover-image-scale"
                    >
                      <div
                        className="featureImage__image mx-auto rounded-full -hover-image-scale__image"
                        style={{
                          width: 130,
                          height: 130,
                          position: "relative",
                        }}
                      >
                        <Image
                          width={130}
                          height={130}
                          src={getImageSource(elm)}
                          alt={elm.title || elm.name || "destination"}
                          className="object-cover rounded-full"
                          style={{ width: 130, height: 130 }}
                          unoptimized={true}
                        />
                      </div>

                      <h3 className="featureImage__title text-16 fw-500 mt-20">
                        {elm.title || elm.name}
                      </h3>
                      <p className="featureImage__text text-14">
                        {elm.tourCount || 0}+ Tours
                      </p>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          <div className="pagination -type-1 justify-center pt-60 md:pt-40 js-dest-pagination swiperPagination1">
            <div className="pagination__button pbutton1"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper function to get the image source
function getImageSource(destination) {
  // Default fallback image
  const defaultImage = "/img/destinationCards/1/1.png";

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

  return defaultImage;
}
