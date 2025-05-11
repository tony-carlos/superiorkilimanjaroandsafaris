"use client";

import { useEffect } from "react";

// Component to add Organization JSON-LD structured data to the website
export default function OrganizationSchema() {
  useEffect(() => {
    const baseUrl = "https://www.superiorkilimanjaroandsafaris.com";

    // Create the structured data object for the organization
    const organizationData = {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: "Superior Kilimanjaro And Safaris",
      url: baseUrl,
      logo: `${baseUrl}/img/logo.png`,
      sameAs: [
        "https://www.facebook.com/profile.php?id=61564606604159",
        "https://www.tiktok.com/@superior.kilimanj?lang=en",
      ],
      description:
        "Superior Kilimanjaro And Safarisoffers luxury safari tours and travel experiences in Tanzania, specializing in wildlife tours, Kilimanjaro treks, and Zanzibar beach holidays.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Safari Avenue",
        addressLocality: "Arusha",
        addressRegion: "Arusha",
        postalCode: "00000",
        addressCountry: "TZ",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "-3.3869824",
        longitude: "36.6821972",
      },
      telephone: "+447772162477",
      email: "info@superiorkilimanjaroandsafaris.com",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "09:00",
          closes: "16:00",
        },
      ],
      priceRange: "$$$",
    };

    // Add the script tag to the document
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(organizationData);
    document.head.appendChild(script);

    // Clean up function
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}
