import React from "react";

import { BookMarked, CircleHelp, Home, LucideProps, Scroll } from "lucide-react";

interface BaseMapProps {
  key: string;
  title: string;
}

export interface NavigationMapProps extends BaseMapProps {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

export interface TopicMapProps extends BaseMapProps {
  subtitle: string;
}

export const navigationMap: NavigationMapProps[] = [
  {
    title: "Ana Sayfa",
    key: "ana-sayfa",
    icon: Home,
  },
  {
    title: "Konular",
    key: "konular",
    icon: Scroll,
  },
  {
    title: "Tarih Sözlüğü",
    key: "sozluk",
    icon: BookMarked,
  },
  {
    title: "Yardım",
    key: "yardim",
    icon: CircleHelp,
  },
];

export const topicsMap: TopicMapProps[] = [
  {
    key: "kesif-cagi",
    title: "Keşif Çağı",
    subtitle: "1400-1600",
  },
  {
    key: "amerikada-kolonicilik",
    title: "Amerika'da Kolonicilik",
    subtitle: "1500-1800",
  },
  {
    key: "asyada-kolonicilik",
    title: "Asya'da Kolonicilik",
    subtitle: "1700-1900",
  },
  {
    key: "pasifikte-kolonicilik",
    title: "Pasifik'te Kolonicilik",
    subtitle: "1600-1900",
  },
  {
    key: "afrikada-kolonicilik",
    title: "Afrika'da Kolonicilik",
    subtitle: "1800-1900",
  },
  {
    key: "direnisler-ve-isyanlar",
    title: "Direnişler ve İsyanlar",
    subtitle: "1700-1900",
  },
  {
    key: "dekolonizasyon",
    title: "Dekolonizasyon",
    subtitle: "1900",
  },
  {
    key: "imparatorluklar",
    title: "İmparatorluklar",
    subtitle: "Avrupalı Güçler",
  },
];
