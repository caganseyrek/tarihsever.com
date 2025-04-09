import React from "react";

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

import { homepageCards } from "@/contents/data/homepage-cards";

const Homepage = () => {
  return (
    <HomepageRoot>
      <HomepageHeader>
        <TarihseverIcon variant="large" />
        <HomepageHeaderTitleContainer>
          <TarihseverTitle variant="large" className="w-full" />
          <HomepageHeaderSubtitle>Her Zaman, Her Yerde Tarih…</HomepageHeaderSubtitle>
        </HomepageHeaderTitleContainer>
      </HomepageHeader>
      <HomepageControls>
        <SearchDialog className="w-[425px] border bg-container-background max-[496px]:w-full" />
        <ThemeButton className="bg-container-background" />
      </HomepageControls>
      <HomepageCardsContainer>
        {homepageCards.map((card) => (
          <HomepageCardItem key={card.key} cardDetails={card} />
        ))}
      </HomepageCardsContainer>
      <Footer licenseTextOnly />
    </HomepageRoot>
  );
};

export { Homepage };
