import React from "react";
import Firstpage from "./(homes)/home/page";

export const metadata = {
  title: "Leading Travel Agency in Tanzania - Book your Tanzania Vacation",
  description:
    "Tailor-made Tanzania vacation ✓ Best safari, beach and climbing itineraries ✓ 100% Tanzania Specialist ✓ Private Trips ✓ Free Quote",
  openGraph: {
    title: "Leading Travel Agency in Tanzania - Book your Tanzania Vacation",
    description:
      "Tailor-made Tanzania vacation ✓ Best safari, beach and climbing itineraries ✓ 100% Tanzania Specialist ✓ Private Trips ✓ Free Quote",
    url: "https://www.serengetinexus.com",
    siteName: "Kilimanjaro Explore",
    images: [
      {
        url: "https://pub-52b9ad9500f64d9bbe7b895b30666182.r2.dev/bgmain.png",
        width: 1200,
        height: 630,
        alt: "Superior Kilimanjaro And Safaris- Tanzania Travel Specialists",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://www.serengetinexus.com",
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
    title: "Leading Travel Agency in Tanzania - Book your Tanzania Vacation",
    description:
      "Tailor-made Tanzania vacation ✓ Best safari, beach and climbing itineraries ✓ 100% Tanzania Specialist ✓ Private Trips ✓ Free Quote",
    images: ["https://pub-52b9ad9500f64d9bbe7b895b30666182.r2.dev/bgmain.png"],
  },
};

export default function page() {
  return (
    <>
      <Firstpage />
    </>
  );
}
