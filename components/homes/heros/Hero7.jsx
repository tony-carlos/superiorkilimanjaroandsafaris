"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Hero7() {
  const router = useRouter();
  const [currentActiveDD, setCurrentActiveDD] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const dropDownContainer = useRef();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Convert Shorts URL to standard embed format
  const mobileVideoId = "7DF66qtfops";
  const desktopVideoId = "JvyoLZ037mk";
  const videoId = isMobile ? mobileVideoId : desktopVideoId;

  return (
    <section className="hero -type-7 h-screen w-full relative overflow-hidden">
      <div className="hero__bg absolute inset-0 w-full h-full">
        <iframe
          className="absolute top-0 left-0 w-full h-full z-0 video-background"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&version=3&playerapiid=ytplayer&iv_load_policy=3`}
          title="Background Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            transform: isMobile ? "scale(1.01)" : "scale(1.5)",
            pointerEvents: "none",
            filter: "sepia(0.3) brightness(0.8)",
          }}
        ></iframe>
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(101, 67, 33, 0.6), rgba(101, 67, 33, 0.4))",
          }}
        ></div>
      </div>

      <div className="container relative z-20 h-full flex items-center">
        <div className="row justify-center w-full">
          <div className="col-xl-8 col-lg-10">
            <div className="hero__content text-center">
              <h1
                data-aos={"fade-up"}
                data-aos-delay="100"
                className="text-white text-7xl md:text-8xl font-bold mb-6 tracking-wider"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "4px",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                GET TO THE TOP WITH A
              </h1>

              <p
                data-aos={"fade-up"}
                data-aos-delay="300"
                className="text-white text-xl md:text-2xl mb-12 italic"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  letterSpacing: "1px",
                }}
              >
                SUPERIOR TEAM!
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Anton&family=Playfair+Display:ital@0;1&family=Montserrat:wght@400;600&display=swap");
      `}</style>

      <style jsx>{`
        @media (max-width: 768px) {
          .video-background {
            width: 100vw !important;
            height: 100vh !important;
            object-fit: cover !important;
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) scale(1.01) !important;
          }
        }
      `}</style>
    </section>
  );
}
