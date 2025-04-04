import { Metadata } from "next";

import { WebSite } from "schema-dts";

export const coreMetadata = {
  base_url: "https://www.tarihsever.com",
  name_or_title: "Tarihsever",
  description:
    "Tarihsever ile keşif çağından imparatorlukların çöküşüne kadar koloniyalizmin karmaşık ve çeşitli tarihini keşfedebilir ve kolonizasyonun kültürel, ekonomik ve politik sonuçları hakkında bilgi edinebilirsiniz.",
  preview_image: {
    absolute_url: "https://www.tarihsever.com/images/logo.png",
    relative_path: "/images/logo.png",
    alt_text: "Tarihsever'in Logosu",
  },
  keywords: [
    "Kolonializm tarihi",
    "Keşifler Çağı",
    "Kolonizasyonun sonuçları",
    "İmparatorlukların çöküşü",
    "Kolonializmin kültürel etkileri",
    "Koloniyalizmin ekonomik sonuçları",
    "Koloniyalizmin politik etkileri",
    "Kolonyal tarih",
    "Tarihsel analizler",
    "Koloniyalizm ve toplum",
    "Tarih meraklıları için kaynaklar",
    "Kolonializmin evrimi",
    "Kolonizasyon dönemi",
    "Kolonyal imparatorluklar",
    "Tarihsel olaylar",
    "Kültürel dönüşümler tarihi",
  ],
};
export const headMetadata: Metadata = {
  description: coreMetadata.description,
  keywords: coreMetadata.keywords,
  authors: [{ name: "Çağan Seyrek", url: "https://caganseyrek.com/" }],
  robots: {
    index: true,
    follow: true,
    noimageindex: true,
  },
  openGraph: {
    type: "website",
    title: coreMetadata.name_or_title,
    description: coreMetadata.description,
    images: [
      {
        url: coreMetadata.preview_image.absolute_url,
        alt: coreMetadata.preview_image.alt_text,
        width: 128,
        height: 128,
      },
    ],
    siteName: coreMetadata.name_or_title,
    url: coreMetadata.base_url,
  },
  twitter: {
    card: "summary_large_image",
    title: coreMetadata.name_or_title,
    description: coreMetadata.description,
    images: [
      {
        url: coreMetadata.preview_image.absolute_url,
        alt: coreMetadata.preview_image.alt_text,
        width: 128,
        height: 128,
      },
    ],
  },
};

export const jsonLd: WebSite = {
  "@type": "WebSite",
  url: coreMetadata.base_url,
  name: coreMetadata.name_or_title,
  description: coreMetadata.description,
  publisher: {
    "@type": "Person",
    name: "Çağan Seyrek",
    url: "https://caganseyrek.com",
    image: "https://caganseyrek.com/images/favicon.png",
    sameAs: ["https://github.com/caganseyrek", "https://www.linkedin.com/in/caganseyrek/"],
  },
  image: {
    "@type": "ImageObject",
    url: coreMetadata.preview_image.absolute_url,
    width: "128",
    height: "128",
  },
  keywords: coreMetadata.keywords,
  inLanguage: ["tr"],
  mainEntityOfPage: coreMetadata.base_url,
  isAccessibleForFree: true,
};
