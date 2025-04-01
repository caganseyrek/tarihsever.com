import { BookMarked, CircleHelp, HomeIcon, type LucideProps } from "lucide-react";

import type { Globals } from "@/types/globals";

export interface NavigationLinkProps extends Globals.LinkProps {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

export const navigationLinks: NavigationLinkProps[] = [
  {
    key: "ana-sayfa",
    title: "Ana Sayfa",
    path: "/",
    icon: HomeIcon,
  },
  {
    key: "sozluk",
    title: "Tarih Sözlüğü",
    path: "/sozluk",
    icon: BookMarked,
  },
  {
    key: "yardim",
    title: "Yardım",
    path: "/yardim",
    icon: CircleHelp,
  },
];
