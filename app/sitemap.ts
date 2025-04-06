import type { MetadataRoute } from "next";

import { coreMetadata } from "@/contents/data/site-metadata";
import { articleNav } from "@/contents/generated/article-nav";

export const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: coreMetadata.base_url,
      lastModified: "2025-04-04",
    },
    {
      url: coreMetadata.base_url + "/sozluk",
      lastModified: "2025-04-04",
    },
    {
      url: coreMetadata.base_url + "/yardim",
      lastModified: "2025-04-04",
    },
    ...articleNav.map((article) => ({
      url: coreMetadata.base_url + "/" + article.path,
      lastModified: "2025-04-04",
    })),
  ];
};

export default sitemap;
