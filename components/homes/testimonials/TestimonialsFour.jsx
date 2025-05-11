"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination } from "swiper/modules";

import React, { useEffect, useRef, useState } from "react";
import { testimonialsThree } from "@/data/testimonials";
import Image from "next/image";

export default function TestimonialsFour() {
  const swiperRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0); // Set the initial slide to index 0
    }
  }, []);

  const handlePaginationClick = (index) => {
    setCurrentSlideIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const handleSlideChange = (swiper) => {
    setCurrentSlideIndex(swiper.activeIndex);

    if (swiper.activeIndex >= 5) {
      setCurrentSlideIndex(swiper.activeIndex - 5);
    }
  };
  return (
    <section className="layout-pt-xl layout-pb-xl bg-light-3">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <h2 data-aos="fade-up" data-aos-delay="" className="text-30">
              Customer Reviews
            </h2>
          </div>
        </div>

        <div className="row justify-center pt-60 md:pt-30">
          <div className="col-lg-8 col-md-9">
            <div className="overflow-hidden js-testimonialsSlider_1">
              <div
                data-aos="fade-up"
                data-aos-delay=""
                className="swiper-wrapper"
              >
                <Swiper
                  spaceBetween={30}
                  className="w-100"
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper; // Store the Swiper instance in the ref
                  }}
                  onSlideChange={handleSlideChange}
                  modules={[Pagination]}
                  breakpoints={{
                    500: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 1,
                    },
                    1024: {
                      slidesPerView: 1,
                    },
                    1200: {
                      slidesPerView: 1,
                    },
                  }}
                >
                  {testimonialsThree.map((elm, i) => (
                    <SwiperSlide key={i}>
                      <div className="testimonials -type-2 text-center">
                        <div className="testimonials__icon">
                          <svg
                            width="60"
                            height="43"
                            viewBox="0 0 60 43"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.837 42.9651C11.0326 42.9651 7.6087 41.4434 4.56522 38.3999C1.52174 35.2477 0 30.6282 0 24.5412C0 17.5847 1.84783 11.9325 5.54348 7.58468C9.34783 3.12816 14.7283 0.899902 21.6848 0.899902C24.1848 0.899902 26.1413 1.06294 27.5543 1.38902V8.88902C26.0326 8.67163 24.0761 8.56294 21.6848 8.56294C17.9891 8.56294 15 9.81294 12.7174 12.3129C10.5435 14.4869 9.29348 17.3673 8.96739 20.9542C10.3804 19.2151 12.663 18.3455 15.8152 18.3455C19.0761 18.3455 21.8478 19.4869 24.1304 21.7695C26.413 23.9434 27.5543 26.8238 27.5543 30.4108C27.5543 34.1064 26.3587 37.1499 23.9674 39.5412C21.5761 41.8238 18.5326 42.9651 14.837 42.9651ZM47.2826 42.9651C43.4783 42.9651 40.0543 41.4434 37.0109 38.3999C33.9674 35.2477 32.4456 30.6282 32.4456 24.5412C32.4456 17.5847 34.2935 11.9325 37.9891 7.58468C41.7935 3.12816 47.1739 0.899902 54.1304 0.899902C56.6304 0.899902 58.587 1.06294 60 1.38902V8.88902C58.4783 8.67163 56.5217 8.56294 54.1304 8.56294C50.4348 8.56294 47.4456 9.81294 45.163 12.3129C42.9891 14.4869 41.7391 17.3673 41.413 20.9542C42.8261 19.2151 45.1087 18.3455 48.2609 18.3455C51.5217 18.3455 54.2935 19.4869 56.5761 21.7695C58.8587 23.9434 60 26.8238 60 30.4108C60 34.1064 58.8043 37.1499 56.413 39.5412C54.0217 41.8238 50.9783 42.9651 47.2826 42.9651Z"
                              fill="#4A43C4"
                            />
                          </svg>
                        </div>

                        <div className="text-20 lh-18 md:text-18 fw-500 mt-60 md:mt-30">
                          {elm.comment}
                        </div>

                        <div className="mt-60 md:mt-30">
                          <div className="text-16 fw-500 lh-14">{elm.name}</div>
                          <div className="lh-14">{elm.role}</div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div
              data-aos="fade-up"
              data-aos-delay=""
              className="testimonialsPagination -type-2 -blue pt-30 testimonialsSlider_2-pagination js-testimonialsSlider_1-pagination"
            >
              {testimonialsThree.map((elm, i) => (
                <div
                  onClick={() => handlePaginationClick(i)}
                  key={i}
                  className={`testimonialsPagination__item ${
                    currentSlideIndex == i ? "is-active" : ""
                  } `}
                >
                  <div>
                    <Image
                      width={70}
                      height={71}
                      src={elm.imgSrc}
                      style={{ height: "auto" }}
                      alt="person"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
