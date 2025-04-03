import { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/images/", "/link"],
      },
    ],
    sitemap: "https://tarihsever.com/sitemap.xml",
  };
};

export default robots;
