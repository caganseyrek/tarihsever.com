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

export const metadata: Metadata = { title: "Sayfa bulunamadı - Tarihsever" };

const NotFoundPage = () => {
  return (
    <CustomPageRoot>
      <CustomPageContainer>
        <TarihseverIcon variant="large" />
        <CustomPageTitle>Bu Sayfa Tarihe Karışmış...</CustomPageTitle>
        <CustomPageDescription>Bu sayfayı bulamadık. Belki de yanlış bir yoldan gelmişizdir?</CustomPageDescription>
        <Button asChild>
          <Link href="/">
            <ArrowLeft /> Ana Sayfaya Dön
          </Link>
        </Button>
      </CustomPageContainer>
    </CustomPageRoot>
  );
};

export default NotFoundPage;
