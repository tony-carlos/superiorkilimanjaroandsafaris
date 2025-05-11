"use client";
import Calender from "@/components/common/dropdownSearch/Calender";
import Location from "@/components/common/dropdownSearch/Location";
import TourType from "@/components/common/dropdownSearch/TourType";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Hero6() {
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
    <section className="hero -type-6">
      <div className="hero__bg">
        <div className="bg-image-wrapper">
          <Image
            src="https://pub-a136cf78f7204d5db42f62c03c2e4bab.r2.dev/ghjk.png"
            alt="background"
            priority
            quality={90}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      </div>

      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-10 col-lg-11">
            <div className="hero__content text-center">
              <h1
                data-aos="fade-up"
                data-aos-delay="100"
                className="hero__title responsive-title"
              >
                <span className="top-text">GET TO THE TOP WITH A</span>
                <br className="md:d-none" /> <br />
                <span className="text-accent-1">SUPERIOR TEAM!</span>
              </h1>

              <p
                data-aos="fade-up"
                data-aos-delay="250"
                className="mt-20 mx-auto responsive-text"
                style={{ maxWidth: "700px" }}
              >
               
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero__bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }

        .bg-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .responsive-title {
          font-size: 48px;
          line-height: 1.2;
          font-weight: 700;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .top-text {
          display: inline-block;
        }

        .responsive-text {
          font-size: 18px;
          line-height: 1.5;
        }

        @media screen and (max-width: 991px) {
          .responsive-title {
            font-size: 36px;
          }
          .responsive-text {
            font-size: 16px;
          }
        }

        @media screen and (max-width: 767px) {
          .responsive-title {
            font-size: 28px;
          }
          .responsive-text {
            font-size: 15px;
          }
        }

        @media screen and (max-width: 479px) {
          .responsive-title {
            font-size: 16px;
          }
          .top-text {
            font-size: 14px;
          }
          .text-accent-1 {
            font-size: 18px;
          }
          .responsive-text {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}
