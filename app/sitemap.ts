import type { MetadataRoute } from "next";

import { coreMetadata } from "@/contents/data/site-metadata";
import { articleSet } from "@/contents/generated/article-set";

export const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: coreMetadata.base_url,
      lastModified: new Date(),
    },
    {
      url: coreMetadata.base_url + "/sozluk",
      lastModified: new Date(),
    },
    {
      url: coreMetadata.base_url + "/yardim",
      lastModified: new Date(),
    },
    ...Array.from(articleSet).map((article) => ({
      url: coreMetadata.base_url + "/" + article,
      lastModified: new Date(),
    })),
  ];
};

export default sitemap;
