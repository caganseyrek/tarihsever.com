import React from "react";

import { Metadata } from "next";

import { ArrowLeft } from "lucide-react";

import LinkedButton from "@/components/LinkedButton";
import TarihseverIcon from "@/components/TarihseverIcon";

export const metadata: Metadata = { title: "Sayfa bulunamadı" };

const NotFoundPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-3 pb-[70px]">
        <TarihseverIcon variant="large" />
        <h1 className="text-2xl font-semibold tracking-tight">Bu Sayfa Tarihe Karışmış...</h1>
        <div className="text-muted-foreground">Bu sayfayı bulamadık. Belki de yanlış bir yoldan gelmişizdir?</div>
        <LinkedButton link={{ href: "/" }}>
          <ArrowLeft /> Ana Sayfaya Dön
        </LinkedButton>
      </div>
    </div>
  );
};

export default NotFoundPage;
