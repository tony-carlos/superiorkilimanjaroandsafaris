"use client";

import React from "react";

export default function TourTypes({
  destinations = [],
  loading = false,
  error = null,
  onFilterDestination,
}) {
  if (loading) return <div>Loading destinations...</div>;
  if (error) return <div className="text-red-1">{error}</div>;

  // Get unique destinations from the destinations array
  const uniqueDestinations = [
    ...new Set(destinations.map((dest) => dest.name || dest.title)),
  ].sort();

  return (
    <div className="pl-tag__grid mobile-css-slider-2">
      {uniqueDestinations.map((destName, i) => (
        <div key={i} className="">
          <a
            href="#"
            className="pl-tag"
            onClick={(e) => {
              e.preventDefault();
              if (onFilterDestination) {
                onFilterDestination(destName);
              }
            }}
          >
            <div className="pl-tag__icon">
              <i className="icon-pin text-24 text-accent-1"></i>
            </div>

            <div className="pl-tag__title text-dark-1">{destName}</div>
          </a>
        </div>
      ))}
    </div>
  );
}
