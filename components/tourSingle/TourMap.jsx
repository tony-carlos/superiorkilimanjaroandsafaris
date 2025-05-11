"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import map component with no SSR
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => <div className="py-30 text-center">Loading map...</div>,
});

const TourMap = ({ tour }) => {
  return (
    <div className="map-container">
      <div className="tourSingleMap">
        <div className="row justify-between items-center mb-20">
          <div className="col-auto">
            <h3 className="text-22 fw-500">Tour Route</h3>
          </div>
          <div className="col-auto d-flex items-center">
            <div className="d-flex items-center">
              <div className="d-flex items-center mr-20">
                <div className="size-10 bg-blue-1 rounded-full mr-10"></div>
                <div className="text-14">Route Path</div>
              </div>
              <div className="d-flex items-center">
                <div className="size-10 border-1 border-dark-1 rounded-full mr-10"></div>
                <div className="text-14">Destinations</div>
              </div>
            </div>
          </div>
        </div>

        <LeafletMap tour={tour} />
      </div>
    </div>
  );
};

export default TourMap;
