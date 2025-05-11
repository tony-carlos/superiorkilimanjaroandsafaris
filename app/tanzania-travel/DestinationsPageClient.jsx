// app/frontend/destinations/DestinationsPageClient.jsx

"use client";

import React, { useState, useEffect } from "react";
import TourList2 from "@/components/tours/TourList2";
import TourTypes from "@/components/tours/TourTypes";
import { fetchDestinations } from "@/utils/api";
import { fetchTourPackages } from "@/utils/tourPackages";

export default function DestinationsPageClient() {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch both destinations and tours on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch destinations
        const destinationsResponse = await fetchDestinations();
        // Handle different response formats
        const destinationsData =
          destinationsResponse.data ||
          (Array.isArray(destinationsResponse) ? destinationsResponse : []);

        console.log("Loaded destinations:", destinationsData.length);
        setDestinations(destinationsData);

        // Fetch tours
        const toursResponse = await fetchTourPackages();
        // Handle different response formats
        const toursData =
          toursResponse.data ||
          (Array.isArray(toursResponse) ? toursResponse : []);

        console.log("Loaded tours:", toursData.length);
        setTours(toursData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterDestination = (destinationName) => {
    setSelectedDestination(destinationName);
    console.log("Filtering by destination:", destinationName);
  };

  const handleResetAll = () => {
    setSelectedDestination("");
    console.log("Resetting all filters");
  };

  return (
    <>
      <div className="container mb-40">
        <TourTypes
          destinations={destinations}
          loading={loading}
          error={error}
          onFilterDestination={handleFilterDestination}
        />
      </div>
      <TourList2
        tours={tours}
        loading={loading}
        error={error}
        selectedDestination={selectedDestination}
        onResetAll={handleResetAll}
      />
    </>
  );
}
