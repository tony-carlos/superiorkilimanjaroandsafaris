"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Header3 from "@/components/layout/header/Header3";
import FooterOne from "@/components/layout/footers/FooterOne";
import {
  safeParseJSON,
  getYoutubeEmbedUrl,
  getDestinationImageUrl,
  getMediumImagesFromDestination,
} from "@/utils/helpers";

export default function DestinationClient({
  destination,
  relatedDestinations,
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [mediumImages, setMediumImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [commonAnimals, setCommonAnimals] = useState([]);
  const [formattedAnimals, setFormattedAnimals] = useState([]);
  const itemsPerPage = 6;

  // Function to handle pagination
  const handlePagination = (direction) => {
    if (
      direction === "next" &&
      currentPage < Math.ceil(relatedDestinations.length / itemsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get current destinations page
  const getCurrentPageItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return relatedDestinations.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Function to get animal SVG path
  const getAnimalSvgPath = (animalName) => {
    if (!animalName) return null;
    // Convert animal name to match SVG filename format (capitalize first letter)
    const svgName = animalName.charAt(0).toUpperCase() + animalName.slice(1);
    return `/animals/${svgName}.svg`;
  };

  useEffect(() => {
    // Process images for slideshow
    const images = getMediumImagesFromDestination(destination);
    setMediumImages(images);

    // Process common animals
    const animals = safeParseJSON(destination.common_animals, []);
    setCommonAnimals(animals);

    // Format animals for display
    const formatted = Array.isArray(animals)
      ? animals.map((animal) => {
          if (typeof animal === "object" && animal !== null) {
            return animal.name || JSON.stringify(animal);
          }
          return animal;
        })
      : [];
    setFormattedAnimals(formatted);
  }, [destination]);

  // Get the image URL
  const imageUrl = getDestinationImageUrl(destination);
  const title = destination.title || destination.name;
  const seoTitle = destination.seo_title || `Visit ${title} - Travel Guide`;
  const seoDescription =
    destination.seo_description ||
    `Discover the beauty of ${title}, learn about activities, climate, and plan your visit with our comprehensive travel guide.`;

  // Parse JSON fields safely and ensure text content is available
  const activities = safeParseJSON(destination.activities, []);
  const pricingOptions = safeParseJSON(destination.pricing_options, {});

  // Function to sanitize HTML content for safer display
  const sanitizeHtml = (html) => {
    if (!html) return "";
    // Add paragraph margin styling
    return html.replace(
      /<p>/g,
      '<p style="margin-bottom: 1rem; line-height: 1.6;">'
    );
  };

  // Function to format activity name by removing underscores and capitalizing each word
  const formatActivityName = (activity) => {
    if (!activity) return "";
    return activity
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Process activities if they're objects with name and icon properties
  const formattedActivities = Array.isArray(activities)
    ? activities.map((activity) => {
        if (typeof activity === "object" && activity !== null) {
          // If activity is an object with name property, use that
          return activity.name || JSON.stringify(activity);
        }
        // Otherwise format the activity name
        return formatActivityName(activity);
      })
    : [];

  // Format zone and type for display
  const zoneDisplay = (zone) => {
    if (!zone) return "";
    return typeof zone === "object" ? zone?.name : zone;
  };

  const typeDisplay = (type) => {
    if (!type) return "";
    return typeof type === "object" ? type?.name : type;
  };

  return (
    <>
      <Header3 />

      {/* Breadcrumb section */}
      <section
        className="pt-40 pb-40 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${imageUrl})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "400px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div className="row y-gap-10 items-center justify-between">
            <div className="col-auto">
              <div className="row x-gap-10 y-gap-5 items-center">
                <div className="col-auto">
                  <div className="">
                    <Link href="/" className="text-white text-16">
                      Home
                    </Link>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="">
                    <i className="icon-chevron-right text-9 text-white"></i>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="">
                    <Link href="/destinations" className="text-white text-16">
                      Destinations
                    </Link>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="">
                    <i className="icon-chevron-right text-9 text-white"></i>
                  </div>
                </div>
                <div className="col-12 mt-15">
                  <div className="text-white">
                    <h1 className="text-40 fw-600 text-white">{title}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="text-14">
                  {destination.zone && (
                    <span className="d-inline-flex items-center me-10 badge bg-white text-dark fw-500 px-15 py-5 rounded-100">
                      {zoneDisplay(destination.zone)
                        ? zoneDisplay(destination.zone)
                            .charAt(0)
                            .toUpperCase() +
                          zoneDisplay(destination.zone).slice(1)
                        : ""}
                    </span>
                  )}
                  {destination.type && (
                    <span className="d-inline-flex items-center badge bg-accent-1 text-white fw-500 px-15 py-5 rounded-100">
                      {typeDisplay(destination.type)
                        ? typeDisplay(destination.type)
                            .charAt(0)
                            .toUpperCase() +
                          typeDisplay(destination.type).slice(1)
                        : ""}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content section */}
      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row y-gap-30">
            {/* Image slideshow in sidebar on mobile, before main content on desktop */}
            <div className="col-12 d-block d-xl-none">
              {mediumImages && mediumImages.length > 0 ? (
                <div className="w-100 h-300 rounded-8 overflow-hidden">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    onSlideChange={(swiper) =>
                      setCurrentSlide(swiper.activeIndex)
                    }
                    className="h-100"
                  >
                    {mediumImages.map((img, index) => (
                      <SwiperSlide key={index} className="h-100">
                        <div className="h-100 w-100">
                          <Image
                            src={img}
                            alt={`${title} - Image ${index + 1}`}
                            className="img-ratio object-cover"
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                            width={600}
                            height={300}
                            unoptimized={true}
                            loading={index === 0 ? "eager" : "lazy"}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <div className="w-100 h-300 rounded-8 position-relative">
                  <Image
                    src={imageUrl}
                    alt={title}
                    className="w-100 h-100 object-cover rounded-8"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                    width={600}
                    height={300}
                    unoptimized={true}
                  />
                </div>
              )}
            </div>

            {/* Content section with tabs - left column */}
            <div className="col-xl-12">
              <div className="tabs -underline-2 js-tabs">
                <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls md:flex-wrap border-bottom-light pb-10 mb-10">
                  <div className="col-auto">
                    <button
                      className={`tabs__button text-18 lg:text-16 md:text-14 fw-500 ${
                        activeTab === "overview" ? "is-tab-el-active" : ""
                      }`}
                      onClick={() => setActiveTab("overview")}
                    >
                      <i className="icon-info-circle text-16 mr-10 md:mr-5"></i>
                      <span>Overview</span>
                    </button>
                  </div>
                  {destination.climate && (
                    <div className="col-auto">
                      <button
                        className={`tabs__button text-18 lg:text-16 md:text-14 fw-500 ${
                          activeTab === "climate" ? "is-tab-el-active" : ""
                        }`}
                        onClick={() => setActiveTab("climate")}
                      >
                        <i className="icon-sun text-16 mr-10 md:mr-5"></i>
                        <span>Climate</span>
                      </button>
                    </div>
                  )}
                  {destination.getting_there && (
                    <div className="col-auto">
                      <button
                        className={`tabs__button text-18 lg:text-16 md:text-14 fw-500 ${
                          activeTab === "getting_there"
                            ? "is-tab-el-active"
                            : ""
                        }`}
                        onClick={() => setActiveTab("getting_there")}
                      >
                        <i className="icon-route text-16 mr-10 md:mr-5"></i>
                        <span>Getting There</span>
                      </button>
                    </div>
                  )}
                  {destination.when_to_visit && (
                    <div className="col-auto">
                      <button
                        className={`tabs__button text-18 lg:text-16 md:text-14 fw-500 ${
                          activeTab === "when_to_visit"
                            ? "is-tab-el-active"
                            : ""
                        }`}
                        onClick={() => setActiveTab("when_to_visit")}
                      >
                        <i className="icon-calendar text-16 mr-10 md:mr-5"></i>
                        <span>When to Visit</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="tabs__content pt-40 js-tabs-content">
                  {/* Overview Tab */}
                  <div
                    className={`tabs__pane -tab-item-1 ${
                      activeTab === "overview" ? "is-tab-el-active" : ""
                    }`}
                  >
                    <div className="row y-gap-20">
                      <div className="col-12">
                        <h3 className="text-22 fw-500">About {title}</h3>
                        <div
                          className="text-15 text-dark-1 mt-20 leading-relaxed text-justify"
                          dangerouslySetInnerHTML={{
                            __html: sanitizeHtml(
                              destination.overview ||
                                `Explore the beautiful destination of ${title} with our exclusive tour packages.`
                            ),
                          }}
                        />

                        <div className="mt-20 py-15 px-20 bg-green-1-05 rounded-4">
                          <div className="d-flex items-center">
                            <div className="size-40 flex-center -color-accent-1 rounded-full text-white mr-10">
                              <i className="icon-info-circle text-16"></i>
                            </div>
                            <p className="text-15">
                              Find out more about {title} by exploring the other
                              tabs.
                            </p>
                          </div>
                        </div>

                        {destination.youtube_link &&
                          destination.youtube_link.length > 0 && (
                            <div className="mt-30">
                              <h4 className="text-18 fw-500 mb-10">Video</h4>
                              <div className="ratio ratio-16:9">
                                <iframe
                                  src={getYoutubeEmbedUrl(
                                    destination.youtube_link
                                  )}
                                  title={`Video of ${title}`}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                              </div>
                            </div>
                          )}
                      </div>

                      {destination.latitude && destination.longitude && (
                        <div className="col-12 mt-20">
                          <h4 className="text-18 fw-500 mb-10">Location</h4>
                          <div className="rounded-4 overflow-hidden h-350">
                            <iframe
                              width="100%"
                              height="100%"
                              frameBorder="0"
                              scrolling="no"
                              marginHeight="0"
                              marginWidth="0"
                              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                                destination.longitude - 0.1
                              }%2C${destination.latitude - 0.1}%2C${
                                destination.longitude + 0.1
                              }%2C${
                                destination.latitude + 0.1
                              }&layer=mapnik&marker=${destination.latitude}%2C${
                                destination.longitude
                              }`}
                              style={{ border: 0 }}
                            ></iframe>
                            <br />
                            <small>
                              <a
                                href={`https://www.openstreetmap.org/?mlat=${destination.latitude}&mlon=${destination.longitude}#map=12/${destination.latitude}/${destination.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-14 -color-accent-1 mt-10 d-inline-block"
                              >
                                View Larger Map
                              </a>
                            </small>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Climate Tab */}
                  {destination.climate && (
                    <div
                      className={`tabs__pane -tab-item-2 ${
                        activeTab === "climate" ? "is-tab-el-active" : ""
                      }`}
                    >
                      <div className="row y-gap-20">
                        <div className="col-12">
                          <h3 className="text-22 fw-500">Climate</h3>
                          <div
                            className="text-15 text-dark-1 mt-20 leading-relaxed text-justify"
                            dangerouslySetInnerHTML={{
                              __html: sanitizeHtml(destination.climate),
                            }}
                          />

                          <div className="mt-20 py-15 px-20 -color-accent-1 rounded-4">
                            <div className="d-flex items-center">
                              <div className="size-40 flex-center -color-accent-1 rounded-full text-white mr-10">
                                <i className="icon-sun text-16"></i>
                              </div>
                              <p className="text-15">
                                Weather conditions can vary throughout the year
                                at {title}.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Getting There Tab */}
                  {destination.getting_there && (
                    <div
                      className={`tabs__pane -tab-item-3 ${
                        activeTab === "getting_there" ? "is-tab-el-active" : ""
                      }`}
                    >
                      <div className="row y-gap-20">
                        <div className="col-12">
                          <h3 className="text-22 fw-500">Getting There</h3>
                          <div
                            className="text-15 text-dark-1 mt-20 leading-relaxed text-justify"
                            dangerouslySetInnerHTML={{
                              __html: sanitizeHtml(destination.getting_there),
                            }}
                          />

                          <div className="mt-20 py-15 px-20 bg-green-1-05 rounded-4">
                            <div className="d-flex items-center">
                              <div className="size-40 flex-center bg-green-1 rounded-full text-white mr-10">
                                <i className="icon-route text-16"></i>
                              </div>
                              <p className="text-15">
                                We can arrange transportation to {title} as part
                                of your tour package.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* When to Visit Tab */}
                  {destination.when_to_visit && (
                    <div
                      className={`tabs__pane -tab-item-4 ${
                        activeTab === "when_to_visit" ? "is-tab-el-active" : ""
                      }`}
                    >
                      <div className="row y-gap-20">
                        <div className="col-12">
                          <h3 className="text-22 fw-500">Best Time to Visit</h3>
                          <div
                            className="text-15 text-dark-1 mt-20 leading-relaxed text-justify"
                            dangerouslySetInnerHTML={{
                              __html: sanitizeHtml(destination.when_to_visit),
                            }}
                          />

                          <div className="mt-20 py-15 px-20 bg-green-1-05 rounded-4">
                            <div className="d-flex items-center">
                              <div className="size-40 flex-center bg-green-1 rounded-full text-white mr-10">
                                <i className="icon-calendar text-16"></i>
                              </div>
                              <p className="text-15">
                                Book your visit during these recommended times
                                for the best experience.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Activities Section */}
              {formattedActivities?.length > 0 && (
                <div className="border-top-light pt-30 mt-30">
                  <h3 className="text-22 fw-500">Activities in {title}</h3>
                  <div className="row y-gap-15 pt-20">
                    {formattedActivities.map((activity, index) => (
                      <div key={index} className="col-md-6">
                        <div className="d-flex items-center">
                          <div className="size-40 flex-center bg-green-1 rounded-full text-white">
                            <i className="icon-check text-14"></i>
                          </div>
                          <div className="text-15 fw-500 ml-10">{activity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wildlife Section */}
              {formattedAnimals?.length > 0 && (
                <div className="border-top-light pt-30 mt-30">
                  <h3 className="text-22 fw-500">Wildlife You May See</h3>
                  <div className="row y-gap-15 pt-20">
                    {formattedAnimals.map((animal, index) => {
                      const svgPath = getAnimalSvgPath(animal);
                      return (
                        <div key={index} className="col-md-6">
                          <div className="d-flex items-center">
                            <div className="size-40 flex-center rounded-full">
                              {svgPath && (
                                <div className="w-24 h-24 d-flex items-center justify-center">
                                  <Image
                                    src={svgPath}
                                    alt={animal}
                                    width={24}
                                    height={24}
                                    className="w-24 h-24"
                                    style={{
                                      filter:
                                        "brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(90%)",
                                      opacity: 0.7,
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="text-15 fw-500 ml-10">{animal}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* All Other Destinations Section */}
              <div className="border-top-light pt-30 mt-30">
                <div className="col-auto">
                  <h3 className="text-22 fw-500 mb-10">
                    All Other Destinations
                  </h3>
                </div>
              </div>
              <div className="row y-gap-10 x-gap-10">
                {relatedDestinations &&
                Array.isArray(relatedDestinations) &&
                relatedDestinations.length > 0 ? (
                  getCurrentPageItems().map((item, index) => (
                    <div
                      key={index}
                      className="col-6 col-sm-4 col-lg-2 col-xl-2"
                    >
                      <Link
                        href={`/destinations/${item.slug || item.id}`}
                        className="destCard -type-1 d-block"
                      >
                        <div className="destCard__image position-relative">
                          <div className="ratio ratio-4:3">
                            <Image
                              className="img-ratio rounded-4 js-lazy"
                              src={getDestinationImageUrl(item)}
                              alt={item.name || item.title || "destination"}
                              width={100}
                              height={75}
                              loading={index === 0 ? "eager" : "lazy"}
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </div>

                        <div className="destCard__content px-10 py-10">
                          <h4 className="text-dark-1 text-14 lh-14 fw-500 mb-5 text-truncate">
                            {item.name || item.title}
                          </h4>
                          <div className="d-flex items-center">
                            {item.type && (
                              <span className="text-10 text-light-1 mr-5 text-truncate">
                                {typeDisplay(item.type)}
                              </span>
                            )}
                            {item.zone && (
                              <span className="text-10 text-light-1 text-truncate">
                                {zoneDisplay(item.zone)}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-20">
                    <div className="spinner-border text-green-1" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-10">Loading destinations...</p>
                  </div>
                )}
              </div>

              <div className="col-12">
                <div className="d-flex justify-between items-center mt-10">
                  <div className="d-flex items-center">
                    <div className="destination-pagination d-flex justify-center mr-15">
                      <span className="current-page fw-500">{currentPage}</span>
                      <span className="mx-2">/</span>
                      <span className="total-pages">
                        {Math.ceil(
                          relatedDestinations?.length / itemsPerPage
                        ) || 1}
                      </span>
                    </div>
                    <div className="pagination-controls">
                      <button
                        className="btn-prev border-none bg-green-1-05 text-14 fw-500 text-green-1 rounded-4 px-10 py-5"
                        onClick={() => handlePagination("prev")}
                        disabled={currentPage === 1}
                      >
                        <i className="icon-arrow-left text-12"></i>
                        <span className="text-12 ml-5">Prev</span>
                      </button>
                      <button
                        className="btn-next ml-10 border-none bg-green-1-05 text-14 fw-500 text-green-1 rounded-4 px-10 py-5"
                        onClick={() => handlePagination("next")}
                        disabled={
                          currentPage >=
                          Math.ceil(relatedDestinations?.length / itemsPerPage)
                        }
                      >
                        <span className="text-12 mr-5">Next</span>
                        <i className="icon-arrow-right text-12"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - right column */}
            <div className="col-xl-4">
              <div className="ml-50 lg:ml-0">
                {/* Image slideshow in sidebar on desktop */}
                <div className="d-none d-xl-block mb-30">
                  {mediumImages && mediumImages.length > 0 ? (
                    <div className="w-100 h-300 rounded-8 overflow-hidden">
                      <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        loop={true}
                        autoplay={{
                          delay: 3000,
                          disableOnInteraction: false,
                        }}
                        className="h-100"
                      >
                        {mediumImages.map((img, index) => (
                          <SwiperSlide key={index} className="h-100">
                            <div className="h-100 w-100">
                              <Image
                                src={img}
                                alt={`${title} - Image ${index + 1}`}
                                className="img-ratio object-cover"
                                style={{
                                  objectFit: "cover",
                                  width: "100%",
                                  height: "100%",
                                }}
                                width={400}
                                height={300}
                                unoptimized={true}
                                loading={index === 0 ? "eager" : "lazy"}
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  ) : (
                    <div className="w-100 h-300 rounded-8 position-relative">
                      <Image
                        src={imageUrl}
                        alt={title}
                        className="w-100 h-100 object-cover rounded-8"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                        width={400}
                        height={300}
                        unoptimized={true}
                      />
                    </div>
                  )}
                </div>

             
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterOne />
    </>
  );
}
