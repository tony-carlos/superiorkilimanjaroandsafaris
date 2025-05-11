"use client";

import Calender from "@/components/common/dropdownSearch/Calender";
import Location from "@/components/common/dropdownSearch/Location";
import TourType from "@/components/common/dropdownSearch/TourType";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
export default function Hero1() {
  const router = useRouter();
  const [currentActiveDD, setCurrentActiveDD] = useState("");
  const [location, setLocation] = useState("");
  const [calender, setCalender] = useState("");
  const [tourType, setTourType] = useState("");
  useEffect(() => {
    setCurrentActiveDD("");
  }, [location, calender, tourType, setCurrentActiveDD]);

  const dropDownContainer = useRef();
  useEffect(() => {
    const handleClick = (event) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target)
      ) {
        setCurrentActiveDD("");
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <section className="hero -type-1 h-screen w-full relative overflow-hidden">
      <div className="hero__bg absolute inset-0 w-full h-full">
        <iframe
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="https://www.youtube.com/embed/JvyoLZ037mk?autoplay=1&mute=1&loop=1&playlist=JvyoLZ037mk&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
          title="Background Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
        <Image
          width="1800"
          height="40"
          src="/img/hero/1/shape.svg"
          alt="image"
          style={{ height: "auto" }}
          className="absolute bottom-0 w-full z-20"
        />
      </div>

      <div className="container relative z-20 h-full flex items-center">
        <div className="row justify-center w-full">
          <div className="col-xl-8 col-lg-10">
            <div className="hero__content">
              <h1
                data-aos={"fade-up"}
                data-aos-delay="100"
                className="hero__title text-green-500"
              >
                Your world of joy
              </h1>

              <p
                data-aos={"fade-up"}
                data-aos-delay="300"
                className="hero__text"
              >
                Explore the Heart of Africa
              </p>

              <div
                ref={dropDownContainer}
                data-aos={"fade-up"}
                data-aos-delay="300"
                className="mt-60 md:mt-35"
              >
                <div className="">
                  <button
                    onClick={() => router.push("/plan-your-trip")}
                    className="text-white px-4 py-2 rounded-md hover:opacity-90 transition-all font-large text-base shadow-sm"
                    style={{ backgroundColor: "var(--color-accent-1)" }}
                  >
                    Start planning your trip
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
