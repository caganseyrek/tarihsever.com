import type { MetadataRoute } from "next";

import { contentTreeLookup } from "@/content/data/__generated__/content-tree";

import { absoluteLink } from "@/shared/utils";

export const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: absoluteLink(),
      lastModified: new Date(),
    },
    {
      url: absoluteLink("/sozluk"),
      lastModified: new Date(),
    },
    {
      url: absoluteLink("/site-rehberi"),
      lastModified: new Date(),
    },
    ...Array.from(contentTreeLookup).map((article) => ({
      url: absoluteLink(`/${article}`),
      lastModified: new Date(),
    })),
  ];
};

export default sitemap;
