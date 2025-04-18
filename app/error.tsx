"use client";

import React from "react";

import type { Metadata } from "next";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/base/button";

import {
  CustomPageContainer,
  CustomPageDescription,
  CustomPageRoot,
  CustomPageTitle,
} from "@/components/partials/custom-page.partials";
import { TarihseverIcon } from "@/components/tarihsever";

export const metadata: Metadata = { title: "Bir hata oluştu..." };

const ErrorPage = () => {
  return (
    <CustomPageRoot>
      <CustomPageContainer>
        <TarihseverIcon variant="large" />
        <CustomPageTitle>Teknik Tarih Arası...</CustomPageTitle>
        <CustomPageDescription>
          Beklenmedik teknik bir hata ile karşılaştık, ancak endişe edecek bir durum yok.
        </CustomPageDescription>
        <Button asChild>
          <Link href="/">
            <ArrowLeft /> Ana Sayfaya Dön
          </Link>
        </Button>
      </CustomPageContainer>
    </CustomPageRoot>
  );
};

export default ErrorPage;
