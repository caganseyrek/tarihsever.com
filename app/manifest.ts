import { type MetadataRoute } from "next";

import { description } from "@/shared/data/metadata";

function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tarihsever",
    short_name: "Tarihsever",
    description: description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
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
}

export default manifest;
