import React from "react";

export default function Itinerary({ itinerary }) {
  if (!itinerary || itinerary.length === 0) return null;

  const stripHtmlTags = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
  };

  return (
    <div className="row y-gap-20">
      {itinerary.map((day, index) => (
        <div key={index} className="col-12">
          <div className="border-1 rounded-4 px-30 py-30">
            <div className="row y-gap-20">
              <div className="col-lg-4">
                <div className="text-18 fw-500">Day {index + 1}</div>
                <div className="text-15 text-dark-1 mt-5">{day.title}</div>
              </div>

              <div className="col-lg-8">
                <div className="text-15 text-dark-1">
                  {stripHtmlTags(day.description)}
                </div>

                <div className="row y-gap-20 pt-20">
                  {day.destination_id && (
                    <div className="col-sm-4">
                      <div className="text-14 text-dark-1">
                        <i className="icon-map-pin text-16 mr-10"></i>
                        Destination
                      </div>
                      <div className="text-13 text-light-1 mt-5">
                        {day.destination_id}
                      </div>
                    </div>
                  )}

                  {day.accommodation_id && (
                    <div className="col-sm-4">
                      <div className="text-14 text-dark-1">
                        <i className="icon-bed text-16 mr-10"></i>
                        Accommodation
                      </div>
                      <div className="text-13 text-light-1 mt-5">
                        {day.accommodation_id}
                      </div>
                    </div>
                  )}

                  {day.meals && day.meals.length > 0 && (
                    <div className="col-sm-4">
                      <div className="text-14 text-dark-1">
                        <i className="icon-utensils text-16 mr-10"></i>
                        Meals
                      </div>
                      <div className="text-13 text-light-1 mt-5">
                        {day.meals.filter(Boolean).join(", ")}
                      </div>
                    </div>
                  )}

                  {day.time && (
                    <div className="col-sm-4">
                      <div className="text-14 text-dark-1">
                        <i className="icon-clock text-16 mr-10"></i>
                        Time
                      </div>
                      <div className="text-13 text-light-1 mt-5">
                        {day.time}
                      </div>
                    </div>
                  )}

                  {day.distance && (
                    <div className="col-sm-4">
                      <div className="text-14 text-dark-1">
                        <i className="icon-map text-16 mr-10"></i>
                        Distance
                      </div>
                      <div className="text-13 text-light-1 mt-5">
                        {day.distance}
                      </div>
                    </div>
                  )}

                  {day.max_altitude && (
                    <div className="col-sm-4">
                      <div className="text-14 text-dark-1">
                        <i className="icon-mountain text-16 mr-10"></i>
                        Max Altitude
                      </div>
                      <div className="text-13 text-light-1 mt-5">
                        {day.max_altitude}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
