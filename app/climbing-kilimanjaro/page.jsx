import React from "react";
import Image from "next/image";
import Header3 from "@/components/layout/header/Header3";
import Faq from "@/components/tourSingle/Faq";
import Link from "next/link";
import { metadata } from "./metadata";
import Script from "next/script";

// Import the client component
import ClimbingKilimanjaroClient from "./ClimbingKilimanjaroClient";

// Import the CSS Module
import styles from "./page.module.css";
import CityTour from "@/components/homes/tours/CityTour";
import FooterOne from "@/components/layout/footers/FooterOne";

// Export the metadata for Next.js to use
export { metadata };

export default function ClimbingKilimanjaro() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Mount Kilimanjaro",
    description:
      "Mount Kilimanjaro is Africa's highest peak and the world's tallest free-standing mountain, offering one of the most accessible high-altitude treks in the world.",
    image: "https://kilimanjaroexplore.com/images/kilimanjaro-summit.jpg",
    height: "5895",
    address: {
      "@type": "PostalAddress",
      addressCountry: "Tanzania",
    },
    touristType: "Adventure tourists",
    availableLanguage: ["English", "Swahili"],
    isAccessibleForFree: false,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  };

  return (
    <div className="climbing-kilimanjaro-page">
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Use the existing Header3 component */}
      <Header3 />

      {/* Header/Hero Section */}
      <section
        className="hero-section position-relative text-white text-center d-flex flex-column justify-content-center"
        style={{
          minHeight: "500px",
          marginTop: "80px",
          backgroundImage:
            "url('https://pub-a136cf78f7204d5db42f62c03c2e4bab.r2.dev/ghjk.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100 bg-dark"
          style={{ opacity: "0.4" }}
        ></div>

        <div className="hero-content position-relative container">
          <p className="m-0 text-white fw-bold">
            Superior Kilimanjaro And Safaris • Climbing Kilimanjaro Guide
          </p>

          <h1 className="text-white fw-bold h2 h3-sm h4-xs">
            Climbing Kilimanjaro: Everything a Beginner Needs to Know
          </h1>
        </div>
      </section>

      {/* Insert the client-side interactive component */}
      <ClimbingKilimanjaroClient />

      <CityTour />

      <FooterOne />
    </div>
  );
}
