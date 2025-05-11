"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useState, useRef } from "react";
import Stars from "@/components/common/Stars";
import Image from "next/image";
import Link from "next/link";
import { fetchFeaturedTours } from "@/utils/tourPackages";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Update travel styles to match actual group_type values from API
const travelStyles = ["Private", "Group", "Family", "Solo"];

const formatPrice = (price) => {
  if (price === "N/A") return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export default function TourSlider3() {
  const [ddActive, setDdActive] = useState(false);
  const [travelStyle, setTravelStyle] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropDownContainer = useRef(null);

  useEffect(() => {
    const loadFeaturedTours = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchFeaturedTours();
        if (response && response.success) {
          setFiltered(response.data);
        } else {
          setError("Failed to load featured tours");
        }
      } catch (error) {
        console.error("Error loading featured tours:", error);
        setError("Error loading featured tours");
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedTours();
  }, []);

  useEffect(() => {
    if (travelStyle) {
      setFiltered((prev) => {
        const filteredTours = prev.filter(
          (elm) => elm.group_type === travelStyle
        );
        return filteredTours;
      });
    } else {
      fetchFeaturedTours().then((response) => {
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

  if (loading) {
    return <div className="text-center py-40">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-40 text-red-1">Error: {error}</div>;
  }

  if (!filtered || filtered.length === 0) {
    return <div className="text-center py-40">No featured tours found</div>;
  }

  return (
    <section className="layout-pt-xl layout-pb-xl">
      <div className="container">
        <div className="row y-gap-10 justify-between items-end y-gap-10">
          <div className="col-auto">
            <h2 data-aos="fade-up" data-aos-delay="" className="text-30">
              Featured Trips
            </h2>
          </div>

          <div ref={dropDownContainer} className="col-auto">
            <div
              className={`dropdown -type-1 js-dropdown js-form-dd ${
                ddActive ? "is-active" : ""
              } `}
              data-main-value=""
            >
              <div
                className="dropdown__button js-button"
                onClick={() => setDdActive((pre) => !pre)}
              >
                <span className="js-title">
                  {travelStyle ? travelStyle : "By Travel Style"}
                </span>
                <i className="icon-chevron-down ml-10"></i>
              </div>

              <div className="dropdown__menu js-menu-items">
                {travelStyles.map((elm, i) => (
                  <div
                    key={i}
                    className="dropdown__item"
                    onClick={() => {
                      setTravelStyle((pre) => (pre === elm ? "" : elm));
                      setDdActive(false);
                    }}
                  >
                    {elm}
                  </div>
                ))}
              </div>
            </div>
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
                spaceBetween={30}
                className="w-100"
                navigation={{
                  prevEl: ".js-slider1-prev",
                  nextEl: ".js-slider1-next",
                }}
                modules={[Navigation, Pagination]}
                breakpoints={{
                  500: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                }}
              >
                {filtered.map((elm, i) => (
                  <SwiperSlide key={elm.id || i}>
                    <Link
                      href={`/itineraries/${elm.slug}`}
                      className="tourCard -type-1 py-10 px-10 border-1 rounded-12 bg-white -hover-shadow"
                    >
                      <div className="tourCard__header">
                        <div className="tourCard__image ratio ratio-28:20">
                          <Image
                            width={421}
                            height={301}
                            src={elm.images[0]?.url || "/img/tours/1/1.png"}
                            alt={elm.title || "Tour image"}
                            className="img-ratio rounded-12"
                          />
                        </div>

                        <button className="tourCard__favorite">
                          <i className="icon-heart"></i>
                        </button>
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

                          <div>
                            From{" "}
                            <span className="text-16 fw-500">
                              {formatPrice(elm.pricing?.low?.costs?.[0]?.cost)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="navAbsolute">
            <button className="navAbsolute__button bg-white js-slider1-prev">
              <i className="icon-arrow-left text-14"></i>
            </button>

            <button className="navAbsolute__button bg-white js-slider1-next">
              <i className="icon-arrow-right text-14"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
