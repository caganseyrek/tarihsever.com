import { BookMarked, Dices, Home, LetterText } from "lucide-react";

import type { MainNavigationProps } from "@/types/globals";

const mainNavigation: MainNavigationProps[] = [
  {
    key: "ana-sayfa",
    title: "Ana Sayfa",
    path: "/",
    icon: Home, // Not used
    description: "", // Not used
  },
  {
    key: "sozluk",
    title: "Tarih Sözlüğü",
    path: "/sozluk",
    icon: BookMarked,
    description: "Tarihle ilgili kavramları, terimleri ve tanımları kısa açıklamalarla öğrenin",
  },
  {
    key: "site-rehberi",
    title: "Site Rehberi",
    path: "/site-rehberi",
    icon: LetterText,
    description: "Bu siteyi nasıl kullanabileceğini, içeriklere nasıl ulaşacağını adım adım öğrenin",
  },
  {
    key: "rastgele",
    title: "Rastgele Yazı",
    path: "/rastgele",
    icon: Dices,
    description: "Arama yapmadan keşfetmek istiyorsanız, rastgele bir yazıya göz atın",
  },
];

export { mainNavigation };
