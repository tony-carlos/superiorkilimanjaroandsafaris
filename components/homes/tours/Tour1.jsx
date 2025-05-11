"use client";
import Stars from "@/components/common/Stars";
// import { tourData } from "@/data/tours";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { fetchTourPackages, getTourImageSource } from "@/utils/tourPackages";

export default function Tour1() {
  const [tours, setTours] = useState([]);

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
    const loadTours = async () => {
      try {
        const tourPackages = await fetchTourPackages();
        // Log the response to see what we're getting
        console.log("Tour packages response:", tourPackages);

        // Check if tourPackages is an array, if not, try to extract the array
        // Assuming the data might be nested in a data property
        const toursArray = Array.isArray(tourPackages)
          ? tourPackages
          : tourPackages?.data || [];

        setTours(toursArray);
      } catch (error) {
        console.error("Error fetching tour packages:", error);
        setTours([]); // Set empty array on error
      }
    };

    loadTours();
  }, []);

  // Add a loading state check
  if (!tours || tours.length === 0) {
    return <div>Loading tours...</div>;
  }

  return (
    <section className="layout-pt-xl layout-pb-xl bg-white">
      <div className="container">
        <div className="row justify-between items-end y-gap-10">
          <div className="col-auto">
            <h2
              data-aos="fade-right"
              data-aos-delay=""
              className="text-30 md:text-24"
            >
              Find Popular Tours
            </h2>
          </div>

          <div className="col-auto">
            <Link
              href={"/tanzania-travel"}
              data-aos="fade-left"
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
          className="row y-gap-30 justify-between pt-40 sm:pt-20 mobile-css-slider -w-300"
        >
          {tours.slice(0, 8).map((elm, i) => (
            <div key={i} className="col-lg-3 col-md-6">
              <Link
                href={`/itineraries/${elm.slug}`}
                className="tourCard -type-1 py-10 px-10 border-1 rounded-12  -hover-shadow"
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

                <div className="tourCard__content px-10 pt-10">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
