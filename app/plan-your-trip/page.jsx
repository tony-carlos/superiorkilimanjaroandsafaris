import { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header3 from "@/components/layout/header/Header3";
import PlanTripForm from "./PlanTripForm";

export const metadata = {
  title:
    "Complete Guide To Planning Your Trip To Tanzania | Kilimanjaro Explore",
  description:
    "Tanzania is the place to be for those who love travel and adventure. This beautiful East African country, which borders the Indian Ocean, offers a perfect blend of wildlife, culture, and natural wonders. Plan your Tanzania safari with our comprehensive guide.",
  keywords:
    "Tanzania travel planning, Serengeti safari guide, Tanzania specialist, East African travel, Tanzania adventure planning, Kilimanjaro Explore, Tanzania safari tips",
  openGraph: {
    title:
      "Complete Guide To Planning Your Trip To Tanzania | Kilimanjaro Explore",
    description:
      "Tanzania is the place to be for those who love travel and adventure. This beautiful East African country, which borders the Indian Ocean, offers a perfect blend of wildlife, culture, and natural wonders.",
    type: "website",
    locale: "en_US",
    siteName: "Kilimanjaro Explore",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Complete Guide To Planning Your Trip To Tanzania | Kilimanjaro Explore",
    description:
      "Tanzania is the place to be for those who love travel and adventure. This beautiful East African country, which borders the Indian Ocean, offers a perfect blend of wildlife, culture, and natural wonders.",
  },
  alternates: {
    canonical: "https://serengetinexus.com/plan-your-trip",
  },
};

export default function PlanYourTripPage() {
  return (
    <>
      <Header3 />
      <PageHeader />
      <PlanTripForm />
      <FooterOne />
    </>
  );
}
