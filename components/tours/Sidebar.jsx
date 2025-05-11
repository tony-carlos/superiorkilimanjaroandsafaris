"use client";

import React, { useState } from "react";
import Calender from "../common/dropdownSearch/Calender";
import RangeSlider from "../common/RangeSlider";
import Image from "next/image";

// Updated arrays


const features = [
  { value: "featured", label: "Featured" },
  { value: "offer", label: "Offer" },
  { value: "hiking", label: "Hiking" },
  { value: "mountain", label: "Mountain" },
  { value: "day_trip", label: "Day Trip" },
  { value: "safaris", label: "Safaris" },
];

const tags = [
  { value: "Wildlife", label: "Wildlife" },
  { value: "Adventure", label: "Adventure" },
  { value: "Cultural", label: "Cultural" },
  { value: "Beach", label: "Beach" },
  { value: "Mountain", label: "Mountain" },
  { value: "Safari", label: "Safari" },
  { value: "Photography", label: "Photography" },
  { value: "Hiking", label: "Hiking" },
  { value: "Family", label: "Family" },
  { value: "Luxury", label: "Luxury" },
];

const mainFocusOptions = [
  { value: "Game drive safari", label: "Game drive safari" },
  { value: "Beach holiday", label: "Beach holiday" },
  { value: "Mountain climbing", label: "Mountain climbing" },
  { value: "Cultural experience", label: "Cultural experience" },
  { value: "Bird watching", label: "Bird watching" },
  { value: "Photography", label: "Photography" },
  { value: "Hiking", label: "Hiking" },
  { value: "Wildlife", label: "Wildlife" },
  { value: "Adventure", label: "Adventure" },
  { value: "Family", label: "Family" },
];

const durations = [
  "1-3 days",
  "4-7 days",
  "8-14 days",
  "15-21 days",
  "22+ days",
];

export default function Sidebar({ onFilterChange }) {
  const [ddActives, setDdActives] = useState(["grouptype"]);

  const handleCheckboxChange = (category, value) => {
    onFilterChange(category, value);
  };

  const handleRangeChange = (min, max) => {
    onFilterChange("priceRange", { min, max });
  };

  return (
    <div className="sidebar -type-1 rounded-12">
      <div className="sidebar__header bg-accent-1">
        <div className="text-15 text-white fw-500">When are you traveling?</div>
        <div className="mt-10">
          <div className="searchForm -type-1 -col-1 -narrow">
            <div className="searchForm__form">
              <div className="searchFormItem js-select-control js-form-dd js-calendar">
                <div className="searchFormItem__button" data-x-click="calendar">
                  <div className="pl-calendar d-flex items-center">
                    <i className="icon-calendar text-20 mr-15"></i>
                    <div>
                      <span className="js-first-date">
                        <Calender />
                      </span>
                      <span className="js-last-date"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar__content">
        {/* Group Type */}
    
        {/* Duration */}
        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item ${
                ddActives.includes("duration") ? "is-active" : ""
              }`}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((pre) =>
                    pre.includes("duration")
                      ? pre.filter((elm) => elm !== "duration")
                      : [...pre, "duration"]
                  )
                }
              >
                <h5 className="text-18 fw-500">Duration</h5>
                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>

              <div
                className="accordion__content"
                style={
                  ddActives.includes("duration") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {durations.map((elm, i) => (
                      <div key={i}>
                        <div className="d-flex items-center">
                          <div className="form-checkbox">
                            <input
                              type="checkbox"
                              name="duration"
                              value={elm}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  "durations",
                                  e.target.value
                                )
                              }
                            />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon">
                                <Image
                                  width="10"
                                  height="8"
                                  src="/img/icons/check.svg"
                                  alt="icon"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="lh-11 ml-10">{elm}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item ${
                ddActives.includes("tags") ? "is-active" : ""
              }`}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((pre) =>
                    pre.includes("tags")
                      ? pre.filter((elm) => elm !== "tags")
                      : [...pre, "tags"]
                  )
                }
              >
                <h5 className="text-18 fw-500">Tags</h5>
                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>

              <div
                className="accordion__content"
                style={ddActives.includes("tags") ? { maxHeight: "300px" } : {}}
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {tags.map((tag, i) => (
                      <div key={i}>
                        <div className="d-flex items-center">
                          <div className="form-checkbox">
                            <input
                              type="checkbox"
                              name="tags"
                              value={tag.value}
                              onChange={(e) =>
                                handleCheckboxChange("tags", e.target.value)
                              }
                            />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon">
                                <Image
                                  width="10"
                                  height="8"
                                  src="/img/icons/check.svg"
                                  alt="icon"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="lh-11 ml-10">{tag.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Focus */}
        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item ${
                ddActives.includes("mainFocus") ? "is-active" : ""
              }`}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((pre) =>
                    pre.includes("mainFocus")
                      ? pre.filter((elm) => elm !== "mainFocus")
                      : [...pre, "mainFocus"]
                  )
                }
              >
                <h5 className="text-18 fw-500">Main Focus</h5>
                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>

              <div
                className="accordion__content"
                style={
                  ddActives.includes("mainFocus") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {mainFocusOptions.map((mf, i) => (
                      <div key={i}>
                        <div className="d-flex items-center">
                          <div className="form-checkbox">
                            <input
                              type="checkbox"
                              name="mainFocus"
                              value={mf.value}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  "mainFocus",
                                  e.target.value
                                )
                              }
                            />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon">
                                <Image
                                  width="10"
                                  height="8"
                                  src="/img/icons/check.svg"
                                  alt="icon"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="lh-11 ml-10">{mf.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specials */}
        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item ${
                ddActives.includes("features") ? "is-active" : ""
              }`}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((pre) =>
                    pre.includes("features")
                      ? pre.filter((elm) => elm !== "features")
                      : [...pre, "features"]
                  )
                }
              >
                <h5 className="text-18 fw-500">Specials</h5>
                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>

              <div
                className="accordion__content"
                style={
                  ddActives.includes("features") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {features.map((feature, i) => (
                      <div key={i}>
                        <div className="d-flex items-center">
                          <div className="form-checkbox">
                            <input
                              type="checkbox"
                              name="specials"
                              value={feature.value}
                              onChange={(e) =>
                                handleCheckboxChange("specials", e.target.value)
                              }
                            />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon">
                                <Image
                                  width="10"
                                  height="8"
                                  src="/img/icons/check.svg"
                                  alt="icon"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="lh-11 ml-10">{feature.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
