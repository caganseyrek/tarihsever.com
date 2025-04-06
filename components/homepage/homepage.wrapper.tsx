"use client";

import React from "react";

import { Construction } from "lucide-react";

import TarihseverIcon from "@/components/branding/tarihsever-icon";
import TarihseverTitle from "@/components/branding/tarihsever-title";
import {
  HomepageCard,
  HomepageCardDescription,
  HomepageCardIconContainer,
  HomepageCardsContainer,
  HomepageCardTextsContainer,
  HomepageCardTitle,
  HomepageControlsContainer,
  HomepageFooterContainer,
  HomepageHeader,
  HomepageRoot,
  HomepageSubtitle,
  HomepageTitleContainer,
} from "@/components/homepage/homepage.partials";
import { FooterLicenseText } from "@/components/layout/footer.partials";
import SearchDialog from "@/components/search-dialog";
import ThemeButton from "@/components/theme/theme-button";

import { homepageCardDetails } from "@/contents/data/homepage-card-details";

const HomepageWrapper = () => {
  return (
    <HomepageRoot>
      <HomepageHeader>
        <TarihseverIcon variant="large" />
        <HomepageTitleContainer>
          <TarihseverTitle variant="large" className="w-full" />
          <HomepageSubtitle>Her Zaman, Her Yerde Tarih…</HomepageSubtitle>
        </HomepageTitleContainer>
      </HomepageHeader>
      <HomepageControlsContainer>
        <SearchDialog className="w-[450px] border bg-container-background" />
        <ThemeButton className="bg-container-background" />
      </HomepageControlsContainer>
      <HomepageCardsContainer>
        {homepageCardDetails.map((card) => (
          <HomepageCard key={card.key} path={card.get_redirect_path()}>
            <HomepageCardIconContainer>
              <card.icon />
            </HomepageCardIconContainer>
            <HomepageCardTextsContainer>
              <HomepageCardTitle>{card.title}</HomepageCardTitle>
              <HomepageCardDescription>{card.description}</HomepageCardDescription>
            </HomepageCardTextsContainer>
          </HomepageCard>
        ))}
      </HomepageCardsContainer>
      <div className="flex flex-row items-center justify-center gap-3 border rounded-md bg-container-background py-2 px-4 text-center text-muted-foreground">
        <Construction className="size-5 text-primary" />
        <div>Tarihsever&apos;in mobil arayüzü henüz geliştirme aşamasındadır.</div>
      </div>
      <HomepageFooterContainer>
        <FooterLicenseText className="text-primary hover:text-primary-lighter transition-colors" />
      </HomepageFooterContainer>
    </HomepageRoot>
  );
};

export default HomepageWrapper;
