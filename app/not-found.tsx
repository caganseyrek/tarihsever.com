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

export const metadata: Metadata = { title: "Sayfa bulunamadı" };

const NotFoundPage = () => {
  return (
    <CustomPageRoot>
      <CustomPageContainer>
        <TarihseverIcon variant="large" />
        <CustomPageTitle>Bu Sayfa Tarihe Karışmış...</CustomPageTitle>
        <CustomPageDescription>Bu sayfayı bulamadık. Belki de yanlış bir yoldan gelmişizdir?</CustomPageDescription>
        <Link href="/">
          <Button>
            <ArrowLeft /> Ana Sayfaya Dön
          </Button>
        </Link>
      </CustomPageContainer>
    </CustomPageRoot>
  );
};

export default NotFoundPage;
