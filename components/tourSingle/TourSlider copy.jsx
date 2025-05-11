"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Stars from "../common/Stars";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchOffers, getTourImageSource } from "@/utils/tourPackages";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const getCurrentSeason = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  if (
    month === 7 ||
    month === 8 ||
    (month === 12 && day >= 20) ||
    (month === 1 && day <= 10)
  ) {
    return "high";
  } else if ((month === 4 && day >= 1) || (month === 5 && day <= 19)) {
    return "low";
  } else {
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

export default function TourSlider() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTours = async () => {
      try {
        const result = await fetchOffers();
        if (result.success) {
          const mappedTours = result.data.map((tour) => ({
            slug: tour.slug,
            imageSrc: tour.images?.[0]?.url || "/images/tours/1.jpg",
            location: tour.country,
            title: tour.title,
            rating: 4.5,
            ratingCount: 12,
            duration: `${tour.duration.value} ${tour.duration.unit}`,
            price: getSeasonalPrice(tour.pricing),
            groupType: tour.group_type,
          }));
          setTours(mappedTours);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, []);

  if (loading) {
    return (
      <section className="layout-pt-xl layout-pb-xl">
        <div className="container">
          <div className="text-center">Loading tours...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="layout-pt-xl layout-pb-xl">
        <div className="container">
          <div className="text-center text-red-1">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="layout-pt-xl layout-pb-xl">
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <h2 className="text-30">You might also like...</h2>
          </div>
        </div>

        <div className="relative pt-40 sm:pt-20">
          <div
            className="overflow-hidden pb-5 js-section-slider"
            data-gap="30"
            data-slider-cols="xl-4 lg-3 md-2 sm-1 base-1"
            data-nav-prev="js-slider1-prev"
            data-nav-next="js-slider1-next"
          >
            <div className="swiper-wrapper">
              <Swiper
                spaceBetween={30}
                className="w-100"
                loop={true}
                pagination={{
                  el: ".pbutton1",
                  clickable: true,
                }}
                navigation={{
                  prevEl: ".js-slider10-prev",
                  nextEl: ".js-slider10-next",
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
                {tours.map((elm, i) => (
                  <SwiperSlide key={i}>
                    <Link
                      href={`/itineraries/${elm.slug}`}
                      className="tourCard -type-1 py-10 px-10 border-1 rounded-12 bg-white -hover-shadow"
                    >
                      <div className="tourCard__header">
                        <div className="tourCard__image ratio ratio-28:20">
                          <Image
                            width={421}
                            height={301}
                            src={elm.imageSrc}
                            alt={elm.title}
                            className="img-ratio rounded-12"
                            priority
                            unoptimized
                          />
                        </div>

                        <button className="tourCard__favorite">
                          <i className="icon-heart"></i>
                        </button>
                      </div>

                      <div className="tourCard__content px-10 pt-10">
                        <div className="tourCard__location d-flex items-center text-13 text-light-2">
                          <i className="icon-pin d-flex text-16 text-light-2 mr-5"></i>
                          {elm.location}
                        </div>

                        <h3 className="tourCard__title text-16 fw-500 mt-5">
                          <span>{elm.title}</span>
                        </h3>

                        <div className="tourCard__rating d-flex items-center text-13 mt-5">
                          <div className="d-flex x-gap-5">
                            <Stars star={elm.rating} />
                          </div>

                          <span className="text-dark-1 ml-10">
                            {elm.rating} ({elm.ratingCount})
                          </span>
                        </div>

                        <div className="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10">
                          <div className="d-flex items-center">
                            <i className="icon-clock text-16 mr-5"></i>
                            {elm.duration}
                          </div>

                          <div>
                            From{" "}
                            <span className="text-16 fw-500">{elm.price}</span>
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
            <button className="navAbsolute__button bg-white js-slider10-prev">
              <i className="icon-arrow-left text-14"></i>
            </button>

            <button className="navAbsolute__button bg-white js-slider10-next">
              <i className="icon-arrow-right text-14"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
