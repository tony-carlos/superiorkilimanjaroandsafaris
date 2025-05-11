"use client";

import React, { useState, useEffect } from "react";
import JoinKilimanjaroGroup from "./JoinKilimanjaroGroup";
import Link from "next/link";
import styles from "./page.module.css";
import { fetchKilimanjaroRoutes } from "@/utils/api";

export default function ClimbingKilimanjaroClient() {
  // Define the primary color
  const primaryColor = "#31a046";

  // State variables
  const [activeRoute, setActiveRoute] = useState("northern-circuit");
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [activeFactSlide, setActiveFactSlide] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePackage, setActivePackage] = useState(null);
  const [activeOption, setActiveOption] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch routes data from API
  useEffect(() => {
    const getRoutes = async () => {
      try {
        setLoading(true);
        const response = await fetchKilimanjaroRoutes();
        if (response.success && response.data) {
          setRoutes(response.data);
        } else {
          console.error("Failed to fetch Kilimanjaro routes:", response);
        }
      } catch (error) {
        console.error("Error fetching Kilimanjaro routes:", error);
      } finally {
        setLoading(false);
      }
    };

    getRoutes();
  }, []);

  // Toggle display of package details
  const togglePackageDetails = (packageId, option) => {
    if (activePackage === packageId && activeOption === option) {
      // If clicking the same package and option, close it
      setActivePackage(null);
      setActiveOption(null);
    } else {
      // Otherwise, open the clicked package and option
      setActivePackage(packageId);
      setActiveOption(option);
    }
  };

  // Handle join click with route details
  const handleJoinClick = (route, packageType) => {
    // Find the selected route
    const selectedRouteData = routes.find((r) => r.id === route);

    if (selectedRouteData) {
      // Calculate date range
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(
        startDate.getDate() + parseInt(selectedRouteData.number_of_days)
      );

      // Format dates
      const formatDate = (date) => {
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "long" });
        return `${day} ${month}`;
      };

      const dateRange = `${formatDate(startDate)} - ${formatDate(endDate)}`;

      // Set selected route details
      setSelectedRoute({
        name: selectedRouteData.name,
        packageType: packageType,
        dateRange: dateRange,
        daysCount: selectedRouteData.number_of_days,
      });
    }

    // Open join form
    setShowJoinForm(true);
  };

  // Helper function to get route name
  const getRouteName = (route) => {
    const names = {
      machame: "Machame Route",
      lemosho: "Lemosho Route",
      marangu: "Marangu Route",
      rongai: "Rongai Route",
      umbwe: "Umbwe Route",
      "northern-circuit": "Northern Circuit",
    };
    return names[route] || "Northern Circuit";
  };

  // Helper function to get route description
  const getRouteDescription = (route) => {
    const descriptions = {
      machame:
        "The Machame hiking trail is the second most popular on Kilimanjaro. It starts in the tropical rainforest on the southern slope of the mountain. Beginners should choose the seven-day option for a better acclimatization profile. Many of the Kilimanjaro Explore's group climbs go via the Machame Route.",

      lemosho:
        "Starting on Kilimanjaro's western side, the Lemosho Route has a remote trailhead. One of the key highlights is the famous Shira Plateau and the Cathedral Peak (3,962m/13,000 feet). The latter is the highest point of Kili's western slope. Lemosho offers the finest acclimatization on Kilimanjaro. Our experts believe it to be the best climbing Kilimanjaro route for group and individual treks. Or at the very least one of the best.",

      marangu:
        "Marangu traverses the eastern slope of Kilimanjaro. Chosen by over 30% of the hikers who climbed Kilimanjaro in 2023, it is the most popular route on Kilimanjaro. Hikers on all other routes spend their nights in tents. But on Marangu, they sleep in shared wooden huts (4-10 people in each). These huts are great for climbing Kilimanjaro during the rainy season. Also, it is the only route that follows the same trail for ascent and descent.",

      rongai:
        "Rongai is the only route on the northern side of the mountain, close to the Kenyan border. The trail goes through a beautiful forest of pine trees. Fewer people go there, making it a great choice to climb Kilimanjaro anytime. The descent follows the eastern Marangu route. This allows the hikers to enjoy the spectacular views of eastern Kilimanjaro.",

      umbwe:
        "The Umbwe Route is more challenging than the other ones because it follows a steeper trail in the beginning. We recommend it to those in good physical shape. Besides, it takes the climbers to higher camps faster than other routes. So having prior acclimatization before the climb is advisable. Like Machame, it passes through a beautiful rainforest. You can see colobuses and blue monkeys there.",

      "northern-circuit":
        "The Northern Circuit is the longest route on Kilimanjaro. Beginning on the western slope, this trail goes around the cone, going up to the summit from the west. Descent is through the southern slope. This wonderful route gives trekkers a four-faced view of the mountain. However, it skips some key attractions, such as Dendrosenecio plants or the Barranco Wall.",
    };
    return descriptions[route] || descriptions["northern-circuit"];
  };

  return (
    <>

      {/* ROUTES SECTION - With Route Descriptions */}
      <section className="routes-section py-5">
        <div className="container">
          <h2 className="mb-4 text-center">Routes and Maps</h2>

          <div className="row">
            <div className="col-md-4">
              {/* Route List */}
              <div className="list-group mb-4 border-0">
                {[
                  { id: "machame", name: "Machame Route" },
                  { id: "lemosho", name: "Lemosho Route" },
                  { id: "marangu", name: "Marangu Route" },
                  { id: "rongai", name: "Rongai Route" },
                  { id: "umbwe", name: "Umbwe Route" },
                  { id: "northern-circuit", name: "Northern Circuit Route" },
                ].map((route) => (
                  <a
                    key={route.id}
                    href={`#${route.id}`}
                    className="list-group-item list-group-item-action border-0 rounded-0 py-3 route-name"
                    style={{
                      borderBottom:
                        route.id === activeRoute
                          ? `2px solid ${primaryColor}`
                          : "none",
                      backgroundColor: "transparent",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveRoute(route.id);
                    }}
                  >
                    <img
                      src="/icons/locations.svg"
                      alt="Location"
                      className="me-2"
                      width="14"
                      height="14"
                    />{" "}
                    {route.name}
                  </a>
                ))}
              </div>

              {/* Desktop Route Description - Using display style */}
              <div
                className="bg-light p-4"
                style={{
                  display: isDesktop ? "block" : "none",
                }}
              >
                <div className="route-info mt-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="route-icon me-2">
                      <div className="d-flex">
                        <img
                          src="/icons/locations.svg"
                          alt="Location"
                          width="18"
                          height="18"
                          className="me-1"
                        />
                        <img
                          src="/icons/locations.svg"
                          alt="Location"
                          width="18"
                          height="18"
                        />
                      </div>
                    </div>
                    <h3 className="mb-0">{getRouteName(activeRoute)}</h3>
                  </div>

                  <p className="route-description">
                    {getRouteDescription(activeRoute)}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              {/* Map */}
              <div className="route-map position-relative">
                <div
                  className="map-container"
                  style={{ maxWidth: "100%", margin: "0 auto" }}
                >
                  <img
                    src="https://pub-a136cf78f7204d5db42f62c03c2e4bab.r2.dev/kilimanjaross.png"
                    alt="Kilimanjaro Map"
                    className="img-fluid w-100"
                  />

                  {activeRoute && (
                    <img
                      src={`https://pub-52b9ad9500f64d9bbe7b895b30666182.r2.dev/${activeRoute}.webp`}
                      alt={`${getRouteName(activeRoute)} Route`}
                      className="position-absolute top-0 start-0 w-100 h-100 route-overlay"
                      style={{ objectFit: "contain" }}
                    />
                  )}

                  {/* Route name in corner */}
                  <div className="position-absolute bottom-0 end-0 p-2 bg-white bg-opacity-75">
                    <small className="text-muted">
                      {getRouteName(activeRoute)} Kilimanjaro Map
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Route Description */}
          <div className="row d-md-none mt-4">
            <div className="col-12">
              <div className="route-info">
                <div className="d-flex align-items-center mb-3">
                  <div className="route-icon me-2">
                    <div className="d-flex">
                      <img
                        src="/icons/locations.svg"
                        alt="Location"
                        width="18"
                        height="18"
                        className="me-1"
                      />
                    </div>
                  </div>
                  <h3 className="mb-0">{getRouteName(activeRoute)}</h3>
                </div>

                <p className="route-description">
                  {getRouteDescription(activeRoute)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Group Trips Section */}
      <section className="trips-section py-5 bg-light">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="mb-3">Kilimanjaro Routes and Packages</h2>
            <p>
              Click on Luxury or Standard to view the details of each package.
            </p>
          </div>

          {/* Trip Cards with Improved Mobile Layout */}
          <div className="trip-listings">
            {loading ? (
              <div className="text-center py-5">
                <div
                  className="spinner-border"
                  role="status"
                  style={{ color: primaryColor }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading Kilimanjaro routes...</p>
              </div>
            ) : routes.length === 0 ? (
              <div className="alert alert-info">
                No Kilimanjaro routes found. Please check back later.
              </div>
            ) : (
              <div className="row justify-content-center">
                <div className="col-md-8">
                  {routes.map((route) => {
                    // Calculate date range
                    const startDate = new Date();
                    const endDate = new Date();
                    endDate.setDate(
                      startDate.getDate() + parseInt(route.number_of_days)
                    );

                    // Format dates
                    const formatDate = (date) => {
                      const day = date.getDate();
                      const month = date.toLocaleString("default", {
                        month: "long",
                      });
                      return `${day} ${month}`;
                    };

                    const dateRange = `${formatDate(startDate)} - ${formatDate(
                      endDate
                    )}`;

                    return (
                      <div
                        key={route.id}
                        className="card mb-4 border-0 shadow-sm hover-shadow transition-all"
                      >
                        <div className="card-body px-4 py-3">
                          <div className="row align-items-center">
                            {/* Left: Route Name */}
                            <div className="col-lg-4 col-md-12 mb-3 mb-lg-0 text-center text-lg-start">
                              <h4 className="mb-1">{route.name}</h4>
                              <div className="text-muted small">
                                <i className="fas fa-calendar-alt me-2"></i>
                                <span>
                                  From {dateRange} | {route.number_of_days} Days
                                </span>
                              </div>
                            </div>

                            <div className="col-lg-8 col-md-12">
                              <div className="d-flex flex-wrap justify-content-center justify-content-lg-end gap-4">
                                {/* Price Options */}
                                {route.standard_price && (
                                  <div className="text-center w-100 w-lg-auto">
                                    <button
                                      className="btn px-3 mb-2 w-100"
                                      style={{
                                        border: `1px solid ${primaryColor}`,
                                        color: primaryColor,
                                        backgroundColor: "transparent",
                                      }}
                                      onClick={() =>
                                        togglePackageDetails(
                                          route.id,
                                          "standard"
                                        )
                                      }
                                    >
                                      <div className="fw-bold">Standard</div>
                                      <div className="fs-5">
                                        ${route.standard_price}
                                      </div>
                                    </button>
                                    <button
                                      className="btn btn-sm text-white text-uppercase w-100 d-none d-lg-block"
                                      style={{
                                        backgroundColor: primaryColor,
                                        padding: "8px 16px",
                                      }}
                                      onClick={() =>
                                        handleJoinClick(route.id, "standard")
                                      }
                                    >
                                      Join Now
                                    </button>
                                  </div>
                                )}
                                {route.luxury_price && (
                                  <div className="text-center w-100 w-lg-auto">
                                    <button
                                      className="btn text-white px-3 mb-2 w-100"
                                      style={{
                                        backgroundColor: primaryColor,
                                      }}
                                      onClick={() =>
                                        togglePackageDetails(route.id, "luxury")
                                      }
                                    >
                                      <div className="fw-bold">Luxury</div>
                                      <div className="fs-5">
                                        ${route.luxury_price}
                                      </div>
                                    </button>
                                    <button
                                      className="btn btn-sm text-white text-uppercase w-100 d-none d-lg-block"
                                      style={{
                                        backgroundColor: primaryColor,
                                        padding: "8px 16px",
                                      }}
                                      onClick={() =>
                                        handleJoinClick(route.id, "luxury")
                                      }
                                    >
                                      Join Now
                                    </button>
                                  </div>
                                )}
                              </div>

                              {/* Mobile view - Full width buttons */}
                              <div className="d-lg-none mt-3 d-flex flex-column gap-2">
                                {route.standard_price && (
                                  <button
                                    className="btn text-white text-uppercase w-100 py-2"
                                    style={{
                                      backgroundColor: primaryColor,
                                    }}
                                    onClick={() =>
                                      handleJoinClick(route.id, "standard")
                                    }
                                  >
                                    Join Standard Package
                                  </button>
                                )}
                                {route.luxury_price && (
                                  <button
                                    className="btn text-white text-uppercase w-100 py-2"
                                    style={{
                                      backgroundColor: primaryColor,
                                    }}
                                    onClick={() =>
                                      handleJoinClick(route.id, "luxury")
                                    }
                                  >
                                    Join Luxury Package
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Package Details Expandable Section */}
                          {activePackage === route.id && (
                            <div className="mt-4 pt-3 border-top animation-fade-in">
                              <h5 className="mb-3">
                                {activeOption === "luxury"
                                  ? "Luxury Package"
                                  : "Standard Package"}{" "}
                                Details
                              </h5>

                              <div className="row">
                                <div className="col-md-6">
                                  <div className="p-3 bg-light rounded-3 h-100">
                                    <h6 className="mb-3 text-success">
                                      <i className="icon-check green-2 me-2"></i>
                                      Includes:
                                    </h6>
                                    <ul className="list-group list-group-flush">
                                      {activeOption === "luxury" &&
                                      route.luxury_includes
                                        ? route.luxury_includes.map(
                                            (item, index) => (
                                              <li
                                                key={index}
                                                className="list-group-item bg-transparent border-0 py-1 px-0"
                                              >
                                                <i className="icon-check green-2 me-2"></i>
                                                {item}
                                              </li>
                                            )
                                          )
                                        : route.standard_includes &&
                                          route.standard_includes.map(
                                            (item, index) => (
                                              <li
                                                key={index}
                                                className="list-group-item bg-transparent border-0 py-1 px-0"
                                              >
                                                <i className="icon-check green-2 me-2"></i>
                                                {item}
                                              </li>
                                            )
                                          )}
                                    </ul>
                                  </div>
                                </div>
                                <div className="col-md-6 mt-3 mt-md-0">
                                  <div className="p-3 bg-light rounded-3 h-100">
                                    <h6 className="mb-3 text-danger">
                                      <i className="icon-cross red me-2"></i>
                                      Excludes:
                                    </h6>
                                    <ul className="list-group list-group-flush">
                                      {activeOption === "luxury" &&
                                      route.luxury_excludes
                                        ? route.luxury_excludes.map(
                                            (item, index) => (
                                              <li
                                                key={index}
                                                className="list-group-item bg-transparent border-0 py-1 px-0"
                                              >
                                                <i className="icon-cross red me-2"></i>
                                                {item}
                                              </li>
                                            )
                                          )
                                        : route.standard_excludes &&
                                          route.standard_excludes.map(
                                            (item, index) => (
                                              <li
                                                key={index}
                                                className="list-group-item bg-transparent border-0 py-1 px-0"
                                              >
                                                <i className="icon-cross red me-2"></i>
                                                {item}
                                              </li>
                                            )
                                          )}
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              <div className="text-center mt-4">
                                <button
                                  className="btn text-white text-uppercase px-4 py-2"
                                  style={{ backgroundColor: primaryColor }}
                                  onClick={() =>
                                    handleJoinClick(route.id, activeOption)
                                  }
                                >
                                  Join This{" "}
                                  {activeOption === "luxury"
                                    ? "Luxury"
                                    : "Standard"}{" "}
                                  Package
                                  <br />
                                  <small>Secure Your Spot Today!</small>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Add the popup form */}
      {showJoinForm && (
        <JoinKilimanjaroGroup
          onClose={() => setShowJoinForm(false)}
          routeDetails={selectedRoute}
        />
      )}
    </>
  );
}
