"use client";

import React, { useState } from "react";
import TourSingleSidebar from "../TourSingleSidebar";
import CommentBox from "../CommentBox";
import Reviews from "../Reviews";
import Rating from "../Rating";
import Faq from "../Faq";
import OthersInformation from "../OthersInformation";
import Overview from "../Overview";
import Included from "../Included";
import MainInformation2 from "./MainInformation2";
import Gallery3 from "../Galleries/Gallery3";
import DateCalender from "../DateCalender";
import TourMap from "../TourMap";

export default function SingleThree({ tour }) {
  const [openDays, setOpenDays] = useState([]);

  const toggleDay = (index) => {
    setOpenDays((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const getDestinationName = (day) => {
    // Check if destination is a full object
    if (day.destination && day.destination.name) {
      return day.destination.name;
    }
    // Check if we need to find it in a destinations array
    if (day.destination_id && tour?.destinations) {
      const destination = tour.destinations.find(
        (d) => d.id == day.destination_id
      );
      return destination?.name || day.destination_id;
    }
    return day.destination_id || "";
  };

  const getAccommodationName = (day) => {
    // Check if accommodation is a full object
    if (day.accommodation && day.accommodation.name) {
      return day.accommodation.name;
    }
    // Check if we need to find it in an accommodations array
    if (day.accommodation_id && tour?.accommodations) {
      const accommodation = tour.accommodations.find(
        (a) => a.id == day.accommodation_id
      );
      return accommodation?.name || "No accommodation";
    }
    return "No accommodation";
  };

  // Function to strip HTML tags
  const stripHtmlTags = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
  };

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
    if (!price) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const currentSeason = getCurrentSeason();

  // Base prices for each season
  const seasonPrices = {
    high: tour?.pricing?.high?.costs?.[0]?.cost
      ? parseInt(tour.pricing.high.costs[0].cost)
      : 0,
    mid: tour?.pricing?.mid?.costs?.[0]?.cost
      ? parseInt(tour.pricing.mid.costs[0].cost)
      : 0,
    low: tour?.pricing?.low?.costs?.[0]?.cost
      ? parseInt(tour.pricing.low.costs[0].cost)
      : 0,
  };

  const basePrice = seasonPrices[currentSeason];

  // Calculate prices with discounts for multiple pax
  const priceForPax = {
    1: basePrice,
    2: Math.round(basePrice * 0.93), // 7% discount
    4: Math.round(basePrice * 0.89), // 11% discount
    6: Math.round(basePrice * 0.85), // 15% discount
  };

  const seasonLabels = {
    high: "High ",
    mid: "Mid ",
    low: "Low ",
  };

  return (
    <div className="tourSingle">
      <div className="container">
        <div className="row">
          <div className="col-12"></div>
          <div className="col-12">
            <div className="tourSingle__content">
              <div className="row">
                <div className="col-lg-8">
                  <MainInformation2 tour={tour} />

                  <Gallery3 tour={tour} />

                  <div className="row y-gap-20 justify-between items-center layout-pb-md pt-60 md:pt-30">
                    <OthersInformation tour={tour} />
                  </div>

                  <Overview tour={tour} />

                  <div className="line mt-60 mb-60"></div>

                  <h2 className="text-30">What's included</h2>

                  <Included tour={tour} />

                  <div className="line mt-60 mb-60"></div>

                  <h2 className="text-30">Itinerary</h2>
                  <div className="mt-30">
                    <div className="roadmap">
                      {Array.isArray(tour?.itinerary) &&
                        tour.itinerary.map((day, index) => (
                          <div key={index} className="roadmap__item">
                            <div
                              className={
                                index === 0
                                  ? "roadmap__iconBig"
                                  : "roadmap__icon"
                              }
                            >
                              {index === 0 && <i className="icon-pin"></i>}
                              {index === tour.itinerary.length - 1 && (
                                <i className="icon-flag"></i>
                              )}
                            </div>
                            <div className="roadmap__wrap">
                              <div
                                className="roadmap__title cursor-pointer d-flex items-center"
                                onClick={() => toggleDay(index)}
                              >
                                <span className="mr-10">
                                  Day {index + 1}: {day.title}
                                </span>
                                <i
                                  className={`icon-chevron-${
                                    openDays.includes(index) ? "up" : "down"
                                  } text-14`}
                                ></i>
                              </div>
                              {openDays.includes(index) && (
                                <>
                                  {day.destination_image?.url && (
                                    <div className="mt-10">
                                      <img
                                        src={day.destination_image.url}
                                        alt={getDestinationName(day)}
                                        className="rounded-4"
                                        style={{
                                          width: "100%",
                                          maxWidth: "400px",
                                          height: "250px",
                                          objectFit: "cover",
                                          objectPosition: "center",
                                        }}
                                      />
                                    </div>
                                  )}
                                  {day.description && (
                                    <p className="mt-10">
                                      {stripHtmlTags(day.description)}
                                    </p>
                                  )}
                                  <div className="roadmap__details mt-20">
                                    {(day.destination ||
                                      day.destination_id) && (
                                      <div className="roadmap__detail">
                                        <i className="icon-map-pin text-16 mr-10"></i>
                                        <span className="fw-500">
                                          Destination:
                                        </span>{" "}
                                        {getDestinationName(day)}
                                      </div>
                                    )}
                                    {(day.accommodation ||
                                      day.accommodation_id) && (
                                      <div className="roadmap__detail">
                                        <i className="icon-bed text-16 mr-10"></i>
                                        <span className="fw-500">
                                          Accommodation:
                                        </span>{" "}
                                        {getAccommodationName(day)}
                                        {day.accommodation_image?.url && (
                                          <div className="mt-10">
                                            <img
                                              src={day.accommodation_image.url}
                                              alt={getAccommodationName(day)}
                                              className="rounded-4"
                                              style={{
                                                width: "100%",
                                                maxWidth: "400px",
                                                height: "250px",
                                                objectFit: "cover",
                                                objectPosition: "center",
                                              }}
                                            />
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    {(day.meals?.some(Boolean) ||
                                      day.time ||
                                      day.distance ||
                                      day.max_altitude) && (
                                      <div className="roadmap__detail d-flex flex-wrap">
                                        {day.meals?.some(Boolean) && (
                                          <div className="d-flex items-center mr-15">
                                            <i className="icon-utensils text-16 mr-5"></i>
                                            <span className="fw-500 mr-5">
                                              Meals:
                                            </span>
                                            <span className="text-14">
                                              {day.meals
                                                .filter(Boolean)
                                                .join(", ")}
                                            </span>
                                          </div>
                                        )}

                                        {day.meals?.some(Boolean) &&
                                          day.time && (
                                            <div className="mr-10 text-light-1">
                                              |
                                            </div>
                                          )}

                                        {day.time && (
                                          <div className="d-flex items-center mr-15">
                                            <i className="icon-clock text-16 mr-5"></i>
                                            <span className="fw-500 mr-5">
                                              Time:
                                            </span>
                                            <span className="text-14">
                                              {day.time} hours
                                            </span>
                                          </div>
                                        )}

                                        {day.time && day.distance && (
                                          <div className="mr-10 text-light-1">
                                            |
                                          </div>
                                        )}

                                        {day.distance && (
                                          <div className="d-flex items-center mr-15">
                                            <i className="icon-map text-16 mr-5"></i>
                                            <span className="fw-500 mr-5">
                                              Distance:
                                            </span>
                                            <span className="text-14">
                                              {day.distance} km
                                              <span className="text-dark-1 ml-5">
                                                (
                                                {Math.round(
                                                  parseFloat(day.distance) *
                                                    0.621371
                                                )}{" "}
                                                miles)
                                              </span>
                                            </span>
                                          </div>
                                        )}

                                        {day.distance && day.max_altitude && (
                                          <div className="mr-10 text-light-1">
                                            |
                                          </div>
                                        )}

                                        {day.max_altitude && (
                                          <div className="d-flex items-center">
                                            <i className="icon-mountain text-16 mr-5"></i>
                                            <span className="fw-500 mr-5">
                                              Max Altitude:
                                            </span>
                                            <span className="text-14">
                                              {day.max_altitude} m
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="mt-60 mb-60">
                    <TourMap tour={tour} />
                  </div>

                  <div className="line mt-60 mb-60"></div>

                  {/* PDF Download Section */}
                  {/* <div className="rounded-4 overflow-hidden mb-60">
                    <div
                      className="px-30 py-30 bg-dark-2"
                      style={{ backgroundColor: "#2A4158" }}
                    >
                      <div className="row y-gap-30 items-center">
                        <div className="col-lg-3">
                          <img
                            src="https://pub-953ce36eba164234882cce8570734e7d.r2.dev/gabby.jpg"
                            alt="Itinerary PDF"
                            className="rounded-4 w-100 h-100 object-cover"
                          />
                        </div>
                        <div className="col-lg-6">
                          <h3 className="text-26 text-white">
                            Get Simple PDF Itinerar y
                          </h3>
                        </div>
                        <div className="col-lg-3">
                          <a
                            href={`/api/generate-pdf?tourId=${tour?.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button -md w-100 d-flex justify-center items-center"
                            style={{
                              backgroundColor: "#414b38",
                              color: "white",
                            }}
                          >
                            <i className="icon-download text-20 mr-10"></i>
                            GET PDF
                          </a>
                        </div>
                      </div>
                    </div>
                  </div> */}

                 
                </div>
                {/* Download Package*/}
                <div className="col-lg-4">
                  <TourSingleSidebar tour={tour} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
