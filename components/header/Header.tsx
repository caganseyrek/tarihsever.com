"use client";

import React from "react";

import { usePathname } from "next/navigation";

import {
  HeaderNavItem,
  HeaderRightSection,
  HeaderRoot,
  HeaderSearchDialog,
  HeaderThemeSelector,
  HeaderTitle,
  HeaderWrapper,
} from "@/components/header/Header.Partials";
import TarihseverIcon from "@/components/TarihseverIcon";

import { cn } from "@/shared/utils";

import { mainMenuLinks } from "@/resources/data/main-menu-links";

const Header = () => {
  const pathname = usePathname();

  return (
    <HeaderRoot>
      <HeaderWrapper>
        <HeaderTitle>
          <TarihseverIcon />
          <h1>
            Tarih<span>sever</span>
          </h1>
        </HeaderTitle>
        <HeaderSearchDialog />
        <HeaderRightSection>
          {mainMenuLinks.map((item) => (
            <HeaderNavItem
              key={item.key}
              linkDetails={item}
              className={cn(item.path === pathname && "bg-primary-hover-background text-primary-lighter")}
            />
          ))}
          <HeaderThemeSelector />
        </HeaderRightSection>
      </HeaderWrapper>
    </HeaderRoot>
  );
};

export default Header;
