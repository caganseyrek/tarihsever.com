import { type MetadataRoute } from "next";

import { coreMetadata } from "@/content/data/metadata";

const manifest = (): MetadataRoute.Manifest => {
  return {
    id: coreMetadata.base_url,
    name: coreMetadata.name_or_title,
    short_name: coreMetadata.name_or_title,
    description: coreMetadata.description,
    scope: coreMetadata.base_url,
    start_url: "/",
    display: "standalone",
    background_color: "#171717",
    theme_color: "#171717",
    icons: [
      {
        src: "/images/logo.png",
        sizes: "27x27",
        type: "image/x-icon",
      },
      {
        src: "/images/logo.png",
        sizes: "27x27",
        type: "image/png",
      },
    ],
  };
};

export default manifest;
