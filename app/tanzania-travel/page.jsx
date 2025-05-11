// app/frontend/destinations/page.jsx

"use client";

import React from "react";
import FooterOne from "@/components/layout/footers/FooterOne";
import PageHeader from "@/components/common/PageHeader";
import DestinationsPageClient from "./DestinationsPageClient";
import Header3 from "@/components/layout/header/Header3";

export default function Page() {
  return (
    <main>
      <Header3 />
      <PageHeader />
      <DestinationsPageClient />
      <FooterOne />
    </main>
  );
}
