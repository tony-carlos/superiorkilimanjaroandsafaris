"use client";
import { Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { clients } from "@/data/clients";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function BrandsOne() {
  return (
    <section className="layout-pt-xl layout-pb-xl">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <h2 data-aos="fade-up" data-aos-delay="" className="text-30">
              Social Media & Our Partners
            </h2>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-delay="" className="pt-40 sm:pt-20">
          <Swiper
            spaceBetween={30}
            className="w-100"
            modules={[Autoplay]}
            autoplay
            loop={true}
            breakpoints={{
              300: {
                slidesPerView: 2,
              },
              500: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1200: {
                slidesPerView: 6,
              },
            }}
          >
            {clients.map((client, i) => (
              <SwiperSlide key={i}>
                {client.url ? (
                  <Link
                    href={client.url}
                    className="d-flex justify-center items-center cursor-pointer hover:opacity-75 transition-opacity"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      width={140}
                      height={90}
                      style={{
                        height: "30px",
                        width: "100px",
                        objectFit: "contain",
                      }}
                      src={client.image || client}
                      alt="brand logo"
                    />
                  </Link>
                ) : (
                  <div className="d-flex justify-center items-center">
                    <Image
                      width={140}
                      height={90}
                      style={{
                        height: "30px",
                        width: "100px",
                        objectFit: "contain",
                      }}
                      src={client.image || client}
                      alt="brand logo"
                    />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
