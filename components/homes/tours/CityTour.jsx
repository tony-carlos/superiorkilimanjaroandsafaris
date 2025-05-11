"use client";

import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Stars from "@/components/common/Stars";
import { tourData } from "@/data/tours";
import Image from "next/image";
import Link from "next/link";
import {
  fetchHikingTours,
  fetchFeaturedTours,
  getTourImageSource,
} from "@/utils/tourPackages";

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

export default function CityTour() {
  const [showSwiper, setShowSwiper] = useState(false);
  const [ddActive, setDdActive] = useState(false);
  const [travelStyle, setTravelStyle] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    setShowSwiper(true);
  }, []);

  useEffect(() => {
    const loadHikingTours = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchHikingTours();

        if (response && response.success) {
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
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [showSwiper]);

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
    <section className="layout-pt-xl">
      <div className="container">
        <div className="row y-gap-10 justify-between items-center y-gap-10">
          <div className="col-auto">
            <h2
              data-aos="fade-up"
              data-aos-delay=""
              className="text-30 md:text-24"
            >
              Hiking Tours
            </h2>
          </div>

          <div className="col-auto">
            <Link
              href={"/tanzania-travel"}
              data-aos="fade-right"
              data-aos-delay=""
              className="buttonArrow d-flex items-center "
            >
              <span>See all</span>
              <i className="icon-arrow-top-right text-16 ml-10"></i>
            </Link>
          </div>
        </div>

        <div className="relative pt-40 sm:pt-20">
          <div
            data-aos="fade-up"
            data-aos-delay=""
            className="overflow-hidden js-section-slider"
          >
            <div className="swiper-wrapper">
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                spaceBetween={30}
                className="w-100"
                modules={[Navigation]}
                navigation={false}
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
                      className="tourCard -type-1 d-block bg-white"
                    >
                      <div className="tourCard__header">
                        <div className="tourCard__image ratio ratio-28:20">
                          <Image
                            width={421}
                            height={301}
                            src={getTourImageSource(elm)}
                            alt={elm.title || "Tour image"}
                            className="img-ratio rounded-12"
                            unoptimized
                          />
                        </div>

                        <button className="tourCard__favorite">
                          <i className="icon-heart"></i>
                        </button>
                      </div>

                      <div className="tourCard__content pt-10">
                        <div className="tourCard__location d-flex items-center text-13 text-light-2">
                          <i className="icon-pin d-flex text-16 text-light-2 mr-5"></i>
                          {elm.country}
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
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="navAbsolute">
            <button
              ref={prevRef}
              className="navAbsolute__button bg-white js-slider1-prev pbp2"
            >
              <i className="icon-arrow-left text-14"></i>
            </button>

            <button
              ref={nextRef}
              className="navAbsolute__button bg-white js-slider1-next pbn2"
            >
              <i className="icon-arrow-right text-14"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
