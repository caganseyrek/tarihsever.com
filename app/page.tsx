import React from "react";

import { Metadata } from "next";

import { SearchIcon } from "lucide-react";

import { Button } from "@/components/base/button";
import HomePageLayout from "@/components/layout/HomePageLayout";
import TarihseverIcon from "@/components/TarihseverIcon";

export const metadata: Metadata = { title: "Ana Sayfa" };

const RootPage = () => {
  return (
    <HomePageLayout>
      <div className="flex flex-col items-center justify-center gap-4 p-4 pb-8 my-8">
        <TarihseverIcon variant="large" />
        <h1 className="text-3xl font-semibold tracking-tight">Her Zaman, Her Yerde Tarih…</h1>
        <Button className="w-[30rem] text-[0.95rem] text-muted-foreground justify-start">
          <SearchIcon />
          Tarihsever&apos;de Ara...
        </Button>
        <span className="w-[25rem] text-muted-foreground text-[0.95rem] text-center">
          Anahtar kelime girerek arama yapabilir veya konular sayfasına giderek tüm konulara göz atabilirsiniz.
        </span>
      </div>
    </HomePageLayout>
  );
};

export default RootPage;
