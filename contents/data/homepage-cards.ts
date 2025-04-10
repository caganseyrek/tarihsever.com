import { BookMarked, Dices, LetterText } from "lucide-react";

import { articleLookup } from "@/contents/__generated__/article-lookup";

import type { Globals } from "@/types/globals";

export const homepageCards: Globals.Data.HomepageCardProps[] = [
  {
    key: "sozluk",
    title: "Tarih Sözlüğü",
    icon: BookMarked,
    description: "Tarihle ilgili kavramları, terimleri ve tanımları kısa açıklamalarla öğrenin",
    get_redirect_path: () => "/sozluk",
  },
  {
    key: "site-rehberi",
    title: "Site Rehberi",
    icon: LetterText,
    description: "Bu siteyi nasıl kullanabileceğini, içeriklere nasıl ulaşacağını adım adım öğrenin",
    get_redirect_path: () => "/site-rehberi",
  },
  {
    key: "rastgele",
    title: "Rastgele",
    icon: Dices,
    description: "Arama yapmadan keşfetmek istiyorsanız, rastgele bir yazıya göz atın",
    get_redirect_path: () => {
      "use client";
      const articlesArrayFromSet: string[] = Array.from(articleLookup);
      const randomIndex: number = Math.floor(Math.random() * articlesArrayFromSet.length);
      return articlesArrayFromSet[randomIndex];
    },
  },
];
