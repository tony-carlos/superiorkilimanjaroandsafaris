import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Hero1 from "@/components/blogs/Hero1";
import BlogSingle from "@/components/blogs/BlogSingle";
import { fetchBlogs } from "@/utils/api";
import Header3 from "@/components/layout/header/Header3";

// Generate dynamic metadata
export async function generateMetadata({ params }) {
  const slug = params.id;
  const response = await fetchBlogs();
  const blogs = response.data.data;
  const blog = blogs.find((item) => item.slug === slug) || blogs[0];

  return {
    title: blog.seo_title || `${blog.title} | Kilimanjaro Explore`,
    description: blog.seo_description || blog.title,
    keywords: blog.seo_keywords || "tanzania travel, serengeti, safari",
    openGraph: {
      title: blog.seo_title || blog.title,
      description: blog.seo_description,
      url: `https://www.serengetinexus.com/blog/${blog.slug}`,
      siteName: "Kilimanjaro Explore",
      images: [
        {
          url: blog.featured_image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.seo_title || blog.title,
      description: blog.seo_description,
      images: [blog.featured_image],
    },
    alternates: {
      canonical: `https://www.serengetinexus.com/blog/${blog.slug}`,
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
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const response = await fetchBlogs();
  const blogs = response.data.data;

  return blogs.map((blog) => ({
    id: blog.slug,
  }));
}

export default async function Page({ params }) {
  const slug = params.id;
  const response = await fetchBlogs();
  const blogs = response.data.data;
  const blog = blogs.find((item) => item.slug === slug) || blogs[0];

  return (
    <>
      <main>
        <Header3 />
        <Hero1 blog={blog} />
        <BlogSingle blog={blog} />
        <FooterOne />
      </main>
    </>
  );
}
