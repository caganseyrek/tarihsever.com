"use client";

import React from "react";

import { Metadata } from "next";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/base/button";
import TarihseverIcon from "@/components/TarihseverIcon";

export const metadata: Metadata = { title: "Bir hata oluştu..." };

const ErrorPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-3 pb-[70px]">
        <TarihseverIcon variant="large" />
        <h1 className="text-2xl font-semibold tracking-tight">Teknik Tarih Arası...</h1>
        <div className="text-muted-foreground">
          Beklenmedik teknik bir hata ile karşılaştık, ancak endişe edecek bir durum yok.
        </div>
        <Link href="/">
          <Button>
            <ArrowLeft /> Ana Sayfaya Dön
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
