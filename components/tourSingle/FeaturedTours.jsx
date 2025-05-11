"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState, useRef } from "react";
import Stars from "@/components/common/Stars";
import Image from "next/image";
import Link from "next/link";
import { fetchHikingTours } from "@/utils/tourPackages";

// Helper function to get the image source
function getTourImageSource(tour) {
  // Default fallback image
  const defaultImage = "/img/tours/1/1.png";

  try {
    // Check if tour and tour.images exists
    if (!tour || !tour.images) return defaultImage;

    // Ensure images is an array and has items
    const images = Array.isArray(tour.images) ? tour.images : [];
    if (images.length === 0) return defaultImage;

    const firstImage = images[0];

    // Check for URL first
    if (firstImage?.url) {
      return firstImage.url;
    }

    // Check for path
    if (firstImage?.path) {
      return `https://pub-52b9ad9500f64d9bbe7b895b30666182.r2.dev/${firstImage.path}`;
    }

    // If neither url nor path exists, return default
    return defaultImage;
  } catch (error) {
    console.error("Error getting tour image source:", error);
    return defaultImage;
  }
}

// Update travel styles to match actual group_type values from API
const travelStyles = ["Private", "Group", "Family", "Solo"];

export default function FeaturedTours() {
  const [ddActive, setDdActive] = useState(false);
  const [travelStyle, setTravelStyle] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropDownContainer = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const getCurrentSeason = () => {
    const now = new Date();
    const month = now.getMonth() + 1; // JavaScript months are 0-11
    const day = now.getDate();

    // High Season: July, August, Dec 20th - Jan 10th
    if (
      month === 7 ||
      month === 8 ||
      (month === 12 && day >= 20) ||
      (month === 1 && day <= 10)
    ) {
      return "high";
    }
    // Low Season: April 1st - May 19th
    else if ((month === 4 && day >= 1) || (month === 5 && day <= 19)) {
      return "low";
    }
    // Mid Season: Rest of the year
    else {
      return "mid";
    }
  };

  const formatPrice = (price) => {
    if (price === "N/A") return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getSeasonalPrice = (pricing) => {
    if (!pricing) return "N/A";
    const currentSeason = getCurrentSeason();
    let price = "N/A";

    switch (currentSeason) {
      case "high":
        price = pricing.high?.costs?.[0]?.cost;
        break;
      case "low":
        price = pricing.low?.costs?.[0]?.cost;
        break;
      case "mid":
        price = pricing.mid?.costs?.[0]?.cost;
        break;
    }
    return formatPrice(price);
  };

  useEffect(() => {
    const loadHikingTours = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchHikingTours();
        console.log("API Response:", response);
        if (response && response.success) {
          console.log("Tour Data:", response.data);
          setFiltered(response.data);
        } else {
          setError("Failed to load hiking tours");
        }
      } catch (error) {
        console.error("Error loading hiking tours:", error);
        setError("Error loading hiking tours");
      } finally {
        setLoading(false);
      }
    };

    loadHikingTours();
  }, []);

  useEffect(() => {
    if (travelStyle) {
      fetchHikingTours().then((response) => {
        if (response && response.success) {
          const filteredTours = response.data.filter(
            (elm) => elm.group_type === travelStyle
          );
          setFiltered(filteredTours);
        }
      });
    } else {
      fetchHikingTours().then((response) => {
        if (response && response.success) {
          setFiltered(response.data);
        }
      });
    }
  }, [travelStyle]);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target)
      ) {
        setDdActive(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  if (loading) {
    return <div className="text-center py-40">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-40 text-red-1">Error: {error}</div>;
  }

  if (!filtered || filtered.length === 0) {
    return <div className="text-center py-40">No hiking tours found</div>;
  }

  return (
    <section className="layout-pt-xl layout-pb-xl bg-white">
      <div className="container">
        <div className="row y-gap-10 justify-between items-end y-gap-10">
          <div className="col-auto">
            <h2 data-aos="fade-up" data-aos-delay="" className="text-30">
              Featured Trips
            </h2>
          </div>
        </div>

        <div className="relative pt-40 sm:pt-20">
          <div className="overflow-hidden js-section-slider">
            <div
              data-aos="fade-up"
              data-aos-delay=""
              className="swiper-wrapper"
            >
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                spaceBetween={30}
                className="w-100"
                modules={[Navigation, Pagination]}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                breakpoints={{
                  500: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  1200: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  1400: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                }}
                slidesPerView="auto"
                centeredSlides={false}
                loop={false}
                watchOverflow={true}
                allowTouchMove={true}
                preventClicks={false}
              >
                {filtered.map((elm, i) => {
                  return (
                    <SwiperSlide
                      key={elm.id || i}
                      className="swiper-slide-auto"
                      style={{ width: "auto" }}
                    >
                      <div
                        className="tourCard -type-1 py-10 px-10 border-1 rounded-12 bg-white -hover-shadow h-full"
                        style={{ margin: "0 5px" }}
                      >
                        <Link
                          href={`/itineraries/${elm.slug}`}
                          className="tourCard__header"
                        >
                          <div
                            className="tourCard__image ratio ratio-28:20"
                            style={{ minHeight: "200px" }}
                          >
                            <Image
                              width={421}
                              height={301}
                              src={getTourImageSource(elm)}
                              alt={elm.title || "Tour image"}
                              className="img-ratio rounded-12"
                              style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                              }}
                            />
                          </div>

                          <div className="tourCard__content px-10 pt-10">
                            <div className="tourCard__location d-flex items-center text-13 text-light-2">
                              <i className="icon-pin d-flex text-16 text-light-2 mr-5"></i>
                              {elm.country || "Location not specified"}
                            </div>

                            <h3 className="tourCard__title text-16 fw-500 mt-5">
                              <span>{elm.title}</span>
                            </h3>

                            <div className="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10">
                              <div className="d-flex items-center">
                                <i className="icon-clock text-16 mr-5"></i>
                                {elm.duration?.value} {elm.duration?.unit}
                              </div>

                              <div className="text-right">
                                <div className="text-10 text-light-2 capitalize opacity-80">
                                  {getCurrentSeason()} season
                                </div>
                                From{" "}
                                <span className="text-16 fw-500">
                                  {getSeasonalPrice(elm.pricing)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>

          <div className="navAbsolute">
            <button
              ref={prevRef}
              className="navAbsolute__button bg-white js-slider1-prev"
            >
              <i className="icon-arrow-left text-14"></i>
            </button>

            <button
              ref={nextRef}
              className="navAbsolute__button bg-white js-slider1-next"
            >
              <i className="icon-arrow-right text-14"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
