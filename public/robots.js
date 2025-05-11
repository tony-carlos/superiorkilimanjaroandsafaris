export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/private"],
    },
    sitemap: "https://www.serengetinexus.com/sitemap.xml",
  };
}
