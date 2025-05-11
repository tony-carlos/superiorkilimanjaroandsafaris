import ArticlesThree from "@/components/homes/articles/ArticlesThree";
import Banner from "@/components/homes/banners/Banner";
import BannerOne from "@/components/homes/banners/BannerOne";
import DestinationsOne from "@/components/homes/destinations/DestinationsOne";
import DestinationsThree from "@/components/homes/destinations/DestinationsThree";
import FeaturesOne from "@/components/homes/features/FeaturesOne";
import Hero7 from "@/components/homes/heros/Hero7";
import TestimonialOne from "@/components/homes/testimonials/TestimonialOne";
import TourTypeOne from "@/components/homes/tourTypes/TourTypeOne";
import CityTour from "@/components/homes/tours/CityTour";
import Safaris from "@/components/homes/tours/Safaris";
import Tour1 from "@/components/homes/tours/Tour1";
import TourSlderOne from "@/components/homes/tours/DayTrips";
import TourSlider2 from "@/components/homes/tours/HikingTours";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Header3 from "@/components/layout/header/Header3";
import FeaturedTours from "@/components/tourSingle/FeaturedTours";
import TourSlider3 from "@/components/tourSingle/TourSlider3";
import HikingTours from "@/components/homes/tours/HikingTours";
import DayTrips from "@/components/homes/tours/DayTrips";
import WhatWeOffer from "@/components/pages/about/WhatWeOffer";
import Hero3 from "@/components/homes/heros/Hero3";
import Hero6 from "@/components/homes/heros/Hero6";
export const metadata = {
  title: "Superior Kilimanjaro And Safaris",
  description:
    "Tailor-made Tanzania vacation ✓ Best safari, beach and climbing itineraries ✓ 100% Tanzania Specialist ✓ Private Trips ✓ Free Quote",
  openGraph: {
    title: "Superior Kilimanjaro And Safaris",
    description:
      "Tailor-made Tanzania vacation ✓ Best safari, beach and climbing itineraries ✓ 100% Tanzania Specialist ✓ Private Trips ✓ Free Quote",
    url: "https://www.superiorkilimanjaroandsafaris.com",
    siteName: "Superior Kilimanjaro And Safaris",
    images: [
      {
        url: "https://pub-52b9ad9500f64d9bbe7b895b30666182.r2.dev/bgmain.png",
        width: 1200,
        height: 630,
        alt: "Superior Kilimanjaro And Safaris Tanzania Travel Specialists",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://www.superiorkilimanjaroandsafaris.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Superior Kilimanjaro And Safaris",
    description:
      "Tailor-made Tanzania vacation ✓ Best safari, beach and climbing itineraries ✓ 100% Tanzania Specialist ✓ Private Trips ✓ Free Quote",
    images: ["https://pub-52b9ad9500f64d9bbe7b895b30666182.r2.dev/bgmain.png"],
  },
};
export default function Home() {
  return (
    <main>
      <Header3 />
      <Hero7 />
      <DestinationsThree />
      <FeaturedTours />
      <WhatWeOffer />
      <Safaris />
      <DayTrips />
      <Tour1 />
      <ArticlesThree />
      <FooterOne />
    </main>
  );
}
