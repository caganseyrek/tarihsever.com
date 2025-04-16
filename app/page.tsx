import React from "react";

import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import {
  HomepageCardItem,
  HomepageCardsContainer,
  HomepageControls,
  HomepageHeader,
  HomepageHeaderSubtitle,
  HomepageHeaderTitleContainer,
  HomepageRoot,
} from "@/components/partials/homepage.partials";
import { SearchDialog } from "@/components/search-dialog";
import { TarihseverIcon, TarihseverTitle } from "@/components/tarihsever";
import { ThemeButton } from "@/components/theme/theme-button";

import { mainNavigation } from "@/content/data/main-navigation";

export const metadata: Metadata = { title: "Ana Sayfa - Tarihsever" };

const RootPage = () => (
  <HomepageRoot>
    <HomepageHeader>
      <TarihseverIcon variant="large" />
      <HomepageHeaderTitleContainer>
        <TarihseverTitle variant="large" className="w-full" />
        <HomepageHeaderSubtitle>Her Zaman, Her Yerde Tarih…</HomepageHeaderSubtitle>
      </HomepageHeaderTitleContainer>
    </HomepageHeader>
    <HomepageControls>
      <SearchDialog
        placeholderText="Tüm sayfa ve yazıları listele..."
        className="w-[425px] border bg-container-background max-[496px]:w-full"
      />
      <ThemeButton className="bg-container-background" />
    </HomepageControls>
    <HomepageCardsContainer>
      {mainNavigation.map((card) => card.path !== "/" && <HomepageCardItem key={card.key} cardDetails={card} />)}
    </HomepageCardsContainer>
    <Footer licenseTextOnly />
  </HomepageRoot>
);

export default RootPage;
