import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Header3 from "@/components/layout/header/Header3";
import ContactForm from "@/components/pages/contact/ContactForm";
import Locations from "@/components/pages/contact/Locations";
import Map from "@/components/pages/contact/Map";
import React from "react";

export const metadata = {
  title: "Contact || Superior Kilimanjaro And Safaris- Tanzania Travel Specialists",
  description: "Superior Kilimanjaro And Safaris- Tanzania Travel Specialists",
};

export default function page() {
  return (
    <>
      <main>
        <Header3 />
        <Map />
        <ContactForm />

        <FooterOne />
      </main>
    </>
  );
}
