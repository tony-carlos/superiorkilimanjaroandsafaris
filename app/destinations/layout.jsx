export const metadata = {
  title: "Tanzania's Leading Destinations | Kilimanjaro Explore",
  description:
    "Discover Tanzania's most iconic destinations with Kilimanjaro Explore. From the Serengeti National Park to Zanzibar's pristine beaches, explore the best of Tanzania's wildlife, culture, and natural wonders.",
  keywords:
    "Tanzania destinations, Serengeti National Park, Ngorongoro Crater, Zanzibar, Kilimanjaro, Kilimanjaro Explore, Tanzania safari, African wildlife, Tanzania tourism",
  openGraph: {
    title: "Tanzania's Leading Destinations | Kilimanjaro Explore",
    description:
      "Discover Tanzania's most iconic destinations with Kilimanjaro Explore. From the Serengeti National Park to Zanzibar's pristine beaches, explore the best of Tanzania's wildlife, culture, and natural wonders.",
    type: "website",
    locale: "en_US",
    siteName: "Kilimanjaro Explore",
  },
};

// Static generation configuration
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export default function DestinationsLayout({ children }) {
  return children;
}
