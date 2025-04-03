import type { MetadataRoute } from "next";

import { coreMetadata } from "@/resources/data/metadata";

export const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: coreMetadata.base_url,
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: coreMetadata.base_url + "/sozluk",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: coreMetadata.base_url + "/yardim",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    // TODO add articles here
  ];
};

export default sitemap;
