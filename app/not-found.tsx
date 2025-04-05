import React from "react";

import { Metadata } from "next";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/base/button";
import TarihseverIcon from "@/components/tarihsever-icon";

export const metadata: Metadata = { title: "Sayfa bulunamadı" };

const NotFoundPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-3 pb-[70px]">
        <TarihseverIcon variant="large" />
        <h1 className="text-2xl font-semibold tracking-tight">Bu Sayfa Tarihe Karışmış...</h1>
        <div className="text-muted-foreground">Bu sayfayı bulamadık. Belki de yanlış bir yoldan gelmişizdir?</div>
        <Link href="/">
          <Button>
            <ArrowLeft /> Ana Sayfaya Dön
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
