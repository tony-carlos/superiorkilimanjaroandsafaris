import MissionVision from "@/components/pages/about/MissionVision";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import WhatWeOffer from "@/components/pages/about/WhatWeOffer";
import PageHeader from "@/components/common/PageHeader";
import Header3 from "@/components/layout/header/Header3";

export const metadata = {
  title:
    "Superior Kilimanjaro And Safaris| Premier Safari and Hiking Adventures in Tanzania",
  description:
    "Learn more about Kilimanjaro Explore, your trusted local tour operator in Tanzania. Discover our mission, offerings, and why travelers choose us for unforgettable safari and hiking experiences.",
  keywords:
    "Tanzania Safari, Serengeti Tours, Hiking in Tanzania, African Safaris, Great Migration, Wildlife Conservation, Custom Safari Packages, Kilimanjaro Hiking, Ngorongoro Conservation, Cultural Tours Tanzania",
  authors: [
    { name: "Kilimanjaro Explore", url: "https://www.serengetinexus.com" },
  ],
  creator: "Kilimanjaro Explore",
  openGraph: {
    title:
      "About Us | Superior Kilimanjaro And Safaris| Premier Safari and Hiking Adventures in Tanzania",
    description:
      "Learn more about Kilimanjaro Explore, your trusted local tour operator in Tanzania. Discover our mission, offerings, and why travelers choose us for unforgettable safari and hiking experiences.",
    url: "https://www.serengetinexus.com/about-us",
    type: "website",
    siteName: "Kilimanjaro Explore",
    images: [
      {
        url: "https://www.serengetinexus.com/images/about-us-og.jpg",
        width: 1200,
        height: 630,
        alt: "Superior Kilimanjaro And Safaris- Premier Safari and Hiking Adventures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "About Us | Superior Kilimanjaro And Safaris| Premier Safari and Hiking Adventures in Tanzania",
    description:
      "Learn more about Kilimanjaro Explore, your trusted local tour operator in Tanzania. Discover our mission, offerings, and why travelers choose us for unforgettable safari and hiking experiences.",
    images: ["https://www.serengetinexus.com/images/about-us-twitter.jpg"],
    creator: "@SerengetiNexus",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function page() {
  return (
    <>
      <main>
        <Header3 />
        <PageHeader />

        <WhatWeOffer />
        <MissionVision />
        <FooterOne />
      </main>
    </>
  );
}
