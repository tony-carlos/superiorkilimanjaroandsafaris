"use client";

import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import Stars from "../common/Stars";
import Pagination from "../common/Pagination";
import Image from "next/image";
import Link from "next/link";

const sortOptions = [
  { label: "Cheap", value: "cheap" },
  { label: "Expensive", value: "expensive" },
  { label: "Ascending", value: "ascending" },
  { label: "Descending", value: "descending" },
];

export default function TourList2({
  tours = [],
  loading = false,
  error = null,
  selectedDestination = "",
  onResetAll,
}) {
  const [sortOption, setSortOption] = useState("");
  const [ddActives, setDdActives] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);
  const dropDownContainer = useRef();

  // Pagination state
  const [perPage, setPerPage] = useState(18);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [filters, setFilters] = useState({
    groupTypes: [],
    durations: [],
    tags: [],
    mainFocus: [],
    specials: [],
  });

  const handleFilterChange = (category, value) => {
    setCurrentPage(1);
    setFilters((prev) => {
      const currentValues = prev[category] || [];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [category]: currentValues.filter((v) => v !== value),
        };
      } else {
        return {
          ...prev,
          [category]: [...currentValues, value],
        };
      }
    });
  };

  const handleResetFilters = () => {
    // Reset all filters and sorting
    setFilters({
      groupTypes: [],
      durations: [],
      tags: [],
      mainFocus: [],
      specials: [],
    });
    setSortOption("");
    setCurrentPage(1);

    // Call onResetAll to reset destination in parent if needed
    if (onResetAll) {
      onResetAll();
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target)
      ) {
        setDdActives(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    function updatePerPage() {
      if (window.innerWidth >= 992) {
        setPerPage(18);
      } else {
        setPerPage(15);
      }
    }

    updatePerPage();
    window.addEventListener("resize", updatePerPage);
    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  function getCurrentSeason() {
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
  }

  function formatPrice(price) {
    if (!price) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }

  const getDisplayValues = (tour) => {
    const title = tour.title || "Untitled Tour";
    const location = tour.country || "Unknown Location";
    const rating = tour.rating || 0;
    const ratingCount = tour.review_count || 0;

    // Handle duration from the new format
    const durationValue = tour.duration?.value || 0;
    const durationUnit = tour.duration?.unit || "";
    const duration = `${durationValue} ${durationUnit}`.trim();

    // Check for images in the structure
    const mainImage = tour.images?.[0]?.url || "/placeholder.jpg";

    // Get price based on current season
    const currentSeason = getCurrentSeason();
    const basePrice = tour?.pricing?.[currentSeason]?.costs?.[0]?.cost || 0;
    const price = formatPrice(basePrice);

    return { title, location, rating, ratingCount, duration, price, mainImage };
  };

  const getPriceNumber = (tour) => {
    const currentSeason = getCurrentSeason();
    const price = tour?.pricing?.[currentSeason]?.costs?.[0]?.cost;
    return typeof price === "number" ? price : Infinity;
  };

  let filteredTours = tours.filter((tour) => {
    const { groupTypes, durations, tags, mainFocus, specials } = filters;

    if (selectedDestination) {
      // Check if any itinerary item matches the selected destination
      const hasMatchingDestination = tour.itinerary?.some((item) => {
        // Handle both string and object destination formats
        const itemDestination =
          typeof item.destination === "object"
            ? item.destination?.name || item.destination?.title
            : item.destination;

        return (
          itemDestination?.toLowerCase() === selectedDestination.toLowerCase()
        );
      });

      if (!hasMatchingDestination) {
        return false;
      }
    }

    if (
      groupTypes.length === 0 &&
      durations.length === 0 &&
      tags.length === 0 &&
      mainFocus.length === 0 &&
      specials.length === 0
    ) {
      return true;
    }

    // Group Types
    if (groupTypes.length > 0) {
      if (!tour.group_type || !groupTypes.includes(tour.group_type)) {
        return false;
      }
    }

    // Durations
    if (durations.length > 0) {
      const tourDuration = tour.duration?.value || 0;
      const durationCheck = durations.some((d) => {
        if (d === "1-3 days") return tourDuration >= 1 && tourDuration <= 3;
        if (d === "4-7 days") return tourDuration >= 4 && tourDuration <= 7;
        if (d === "8-14 days") return tourDuration >= 8 && tourDuration <= 14;
        if (d === "15-21 days") return tourDuration >= 15 && tourDuration <= 21;
        if (d === "22+ days") return tourDuration >= 22;
        return false;
      });
      if (!durationCheck) return false;
    }

    // Tags
    const tourTags = Array.isArray(tour.tags) ? tour.tags : [];
    if (tags.length > 0) {
      const hasMatchingTag = tags.some((selectedTag) =>
        tourTags.some((tourTag) => tourTag === selectedTag)
      );
      if (!hasMatchingTag) return false;
    }

    // Main Focus
    if (mainFocus.length > 0) {
      if (!tour.main_focus || !mainFocus.includes(tour.main_focus)) {
        return false;
      }
    }

    // Specials (categories)
    if (specials.length > 0) {
      const specialChecks = specials.every((special) => {
        // Map special to the corresponding category in tour.categories
        const categoryMap = {
          featured: "featured",
          offer: "offer",
          hiking: "hiking",
          mountain: "mountain",
          dayTrip: "day_trip",
          safaris: "safaris",
        };

        const categoryKey = categoryMap[special];
        return tour.categories && tour.categories[categoryKey] === true;
      });

      if (!specialChecks) return false;
    }

    return true;
  });

  if (sortOption) {
    filteredTours = [...filteredTours].sort((a, b) => {
      if (sortOption === "cheap") {
        return getPriceNumber(a) - getPriceNumber(b);
      } else if (sortOption === "expensive") {
        return getPriceNumber(b) - getPriceNumber(a);
      } else {
        const { title: titleA } = getDisplayValues(a);
        const { title: titleB } = getDisplayValues(b);

        if (sortOption === "ascending") {
          return titleA.localeCompare(titleB);
        } else if (sortOption === "descending") {
          return titleB.localeCompare(titleA);
        }
      }
      return 0;
    });
  }

  const totalTours = filteredTours.length;
  const totalPages = Math.ceil(totalTours / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const displayedTours = filteredTours.slice(startIndex, endIndex);

  return (
    <section className="layout-pb-xl">
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-xl-3 col-lg-4">
            <div className="lg:d-none">
              <Sidebar onFilterChange={handleFilterChange} />
            </div>
            <div className="accordion d-none mb-30 lg:d-flex js-accordion">
              <div
                className={`accordion__item col-12 ${
                  sidebarActive ? "is-active" : ""
                }`}
              >
                <button
                  className="accordion__button button -dark-1 bg-light-1 px-25 py-10 border-1 rounded-12"
                  onClick={() => setSidebarActive((pre) => !pre)}
                >
                  <i className="icon-sort-down mr-10 text-16"></i>
                  Filter
                </button>

                <div
                  className="accordion__content"
                  style={sidebarActive ? { maxHeight: "2000px" } : {}}
                >
                  <div className="pt-20">
                    <Sidebar onFilterChange={handleFilterChange} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-xl-9 col-lg-8">
            <div className="row y-gap-5 justify-between items-center">
              <div className="col-auto d-flex items-center">
                {loading && <div>Loading tours...</div>}
                {error && <div className="text-red-1">{error}</div>}
                {!loading && !error && <div>{totalTours} results</div>}

                {/* Reset Filters Button */}
                <button
                  className="button -sm px-20 py-5 border-1 ml-20"
                  onClick={handleResetFilters}
                >
                  Reset Filters
                </button>
              </div>

              <div
                ref={dropDownContainer}
                className="col-auto d-flex items-center"
              >
                <span className="mr-10 text-14 fw-500">Sort by:</span>
                <div
                  className={`dropdown -type-2 js-dropdown js-form-dd ${
                    ddActives ? "is-active" : ""
                  }`}
                  data-main-value=""
                >
                  <div
                    className="dropdown__button js-button"
                    onClick={() => setDdActives((pre) => !pre)}
                  >
                    <span className="js-title">
                      {sortOption
                        ? sortOptions.find((o) => o.value === sortOption)
                            ?.label || "Featured"
                        : "Featured"}
                    </span>
                    <i className="icon-chevron-down"></i>
                  </div>

                  <div className="dropdown__menu js-menu-items">
                    {sortOptions.map((opt, i) => (
                      <div
                        onClick={() => {
                          setSortOption(opt.value);
                          setDdActives(false);
                        }}
                        key={i}
                        className="dropdown__item"
                        data-value={opt.value}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tours Listing */}
            <div className="row y-gap-30 pt-30">
              {!loading &&
                !error &&
                displayedTours.map((tour, i) => {
                  const {
                    title,
                    location,
                    rating,
                    ratingCount,
                    duration,
                    price,
                    mainImage,
                  } = getDisplayValues(tour);

                  // Use the slug from the tour or fallback to ID
                  const slug = tour.slug || tour.id;

                  return (
                    <div key={i} className="col-lg-4 col-sm-6">
                      <Link
                        href={`/itineraries/${slug}`}
                        className="tourCard -type-1 py-10 px-10 border-1 rounded-12 -hover-shadow"
                      >
                        <div className="tourCard__header">
                          <div className="tourCard__image ratio ratio-28:20">
                            <Image
                              width={421}
                              height={301}
                              src={mainImage}
                              alt={title}
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
                            {location}
                          </div>

                          <h3 className="tourCard__title text-16 fw-500 mt-5">
                            <span>{title}</span>
                          </h3>

                          <div className="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10">
                            <div className="d-flex items-center">
                              <i className="icon-clock text-16 mr-5"></i>
                              {duration}
                            </div>
                            <div>
                              From{" "}
                              <span className="text-16 fw-500">{price}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>

            {!loading && !error && totalTours > 0 && (
              <div className="d-flex justify-center flex-column mt-60">
              
                <div className="text-14 text-center mt-20">
                  Showing results {startIndex + 1}-
                  {Math.min(endIndex, totalTours)} of {totalTours}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
