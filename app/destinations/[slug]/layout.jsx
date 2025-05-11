import { fetchDestinationBySlug } from "@/utils/api";
import { getDestinationImageUrl } from "@/utils/helpers";

export async function generateMetadata({ params }) {
  try {
    const destination = await fetchDestinationBySlug(params.slug);

    if (!destination) {
      return {
        title: "Destination Not Found",
        description:
          "The destination you're looking for doesn't exist or has been removed.",
      };
    }

    const title = destination.title || destination.name;
    const seoTitle = destination.seo_title || `Visit ${title} - Travel Guide`;
    const seoDescription =
      destination.seo_description ||
      `Discover the beauty of ${title}, learn about activities, climate, and plan your visit with our comprehensive travel guide.`;
    const imageUrl = getDestinationImageUrl(destination);

    return {
      title: seoTitle,
      description: seoDescription,
      keywords:
        destination.keywords || `${title}, travel, destination, tour, vacation`,
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        type: "website",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: seoTitle,
        description: seoDescription,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("Error fetching destination metadata:", error);
    return {
      title: "Destination",
      description: "Explore amazing destinations around the world.",
    };
  }
}

export default function DestinationLayout({ children }) {
  return <>{children}</>;
}
