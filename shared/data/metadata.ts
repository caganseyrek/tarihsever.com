// FIXME - Needs updating
import { Metadata } from "next";

import { WebSite } from "schema-dts";

export const baseURL: string = "https://www.tarihsever.com/";

const imageURL: string = baseURL + "images/logo.png";
const imageAlt: string = "Tarihsever's Logo";

export const nameOrTitle: string = "Colonial History - A Deep Dive into Global Colonization";
export const description: string =
  "Explore the complex and diverse history of colonialism from the Age of Exploration to the decline of empires. Learn about the cultural, economic, and political consequences of colonization.";

const keywords: { string: string; array: string[] } = {
  string:
    "colonial history, exploration, European empires, Africa, Asia, Americas, Pacific, decolonization, resistance, revolutions",
  array: [
    "colonial history",
    "exploration",
    "European empires",
    "Africa",
    "Asia",
    "Americas",
    "decolonization",
    "resistance",
    "revolutions",
  ],
};

export const jsonLd: WebSite = {
  "@type": "WebSite",
  url: baseURL,
  name: nameOrTitle,
  description: description,
  publisher: {
    "@type": "Person",
    name: "Çağan Seyrek",
    url: "https://caganseyrek.com",
    image: "https://caganseyrek.com/images/general_cat.webp",
    sameAs: [
      "https://github.com/caganseyrek",
      "https://www.npmjs.com/~caganseyrek",
      "https://www.linkedin.com/in/caganseyrek/",
    ],
  },
  image: {
    "@type": "ImageObject",
    url: imageURL,
    width: "128",
    height: "128",
  },
  keywords: keywords.string,
  inLanguage: ["tr"],
  mainEntityOfPage: baseURL,
  isAccessibleForFree: true,
};

export const headMetadata: Metadata = {
  description: description,
  keywords: keywords.array,
  authors: [
    {
      name: "Çağan Seyrek",
      url: "https://caganseyrek.com/",
    },
  ],
  openGraph: {
    title: nameOrTitle,
    description: description,
    images: [
      {
        url: imageURL,
        alt: imageAlt,
        width: 128,
        height: 128,
      },
    ],
    url: baseURL,
  },
  twitter: {
    card: "summary_large_image",
    title: nameOrTitle,
    description: description,
    images: [
      {
        url: imageURL,
        alt: imageAlt,
        width: 128,
        height: 128,
      },
    ],
  },
};
