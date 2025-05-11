import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Hero1 from "@/components/blogs/Hero1";
import BlogList3 from "@/components/blogs/BlogList3";
import { fetchBlogs } from "@/utils/api";
import Hero2 from "@/components/homes/heros/Hero2";
import HeroBlogs from "@/components/blogs/HeroBlogs";
import Header3 from "@/components/layout/header/Header3";

export async function generateMetadata() {
  return {
    title: "Tanzania Travel Blog & Guide | Kilimanjaro Explore",
    description:
      "Your Ultimate Tanzania Travel Resource - Dive into Our Tanzania Travel Blog & Guide. Get Insider Tips, Itineraries, and Inspiration for Your Journey to East Africa's Heartland.",
    keywords:
      "tanzania travel blog, tanzania safari guide, serengeti blog, tanzania travel tips, east africa travel, tanzania itineraries, african safari blog",
    openGraph: {
      title: "Tanzania Travel Blog & Guide | Kilimanjaro Explore",
      description:
        "Your Ultimate Tanzania Travel Resource - Dive into Our Tanzania Travel Blog & Guide. Get Insider Tips, Itineraries, and Inspiration for Your Journey to East Africa's Heartland.",
      url: "https://www.serengetinexus.com/blog",
      siteName: "Kilimanjaro Explore",
      images: [
        {
          url: "https://www.serengetinexus.com/img/blog-hero.jpg", // Update with your actual hero image
          width: 1200,
          height: 630,
          alt: "Tanzania Travel Blog",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Tanzania Travel Blog & Guide | Kilimanjaro Explore",
      description:
        "Your Ultimate Tanzania Travel Resource - Dive into Our Tanzania Travel Blog & Guide. Get Insider Tips, Itineraries, and Inspiration for Your Journey to East Africa's Heartland.",
      images: ["https://www.serengetinexus.com/img/blog-hero.jpg"], // Update with your actual hero image
    },
    alternates: {
      canonical: "https://www.serengetinexus.com/blog",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    authors: [{ name: "Kilimanjaro Explore" }],
    publisher: "Kilimanjaro Explore",
  };
}

export default async function Page() {
  // Fetch blogs data
  const response = await fetchBlogs();
  const blogs = response.data.data;

  return (
    <>
      <main>
        <Header3 />
        <HeroBlogs />
        <BlogList3 blogs={blogs} />
        <FooterOne />
      </main>
    </>
  );
}
