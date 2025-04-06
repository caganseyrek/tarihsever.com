"use client";

import React from "react";

import type { Metadata } from "next";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/base/button";
import TarihseverIcon from "@/components/branding/tarihsever-icon";
import {
  CustomPageContainer,
  CustomPageDescription,
  CustomPageRoot,
  CustomPageTitle,
} from "@/components/custom-page.partials";

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
        <Link href="/">
          <Button>
            <ArrowLeft /> Ana Sayfaya Dön
          </Button>
        </Link>
      </CustomPageContainer>
    </CustomPageRoot>
  );
};

export default ErrorPage;
