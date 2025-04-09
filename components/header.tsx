"use client";

import React from "react";

import { usePathname } from "next/navigation";

import { MenuItem } from "@/components/menu-item";
import { LeftMenuSheet } from "@/components/mobile-sidebar";
import {
  HeaderContainer,
  HeaderMenuContainer,
  HeaderRoot,
  HeaderTitleLink,
} from "@/components/partials/header.partials";
import { SearchDialog } from "@/components/search-dialog";
import { TarihseverIcon, TarihseverTitle } from "@/components/tarihsever";
import { ThemeButton } from "@/components/theme/theme-button";

import { mainMenuLinks } from "@/contents/data/main-menu-links";

import { cn } from "@/shared/utils";

const Header = () => {
  const pathname = usePathname();

  return (
    <HeaderRoot>
      <HeaderContainer className="max-[1344px]:w-full max-[1000px]:hidden">
        <HeaderTitleLink>
          <TarihseverIcon />
          <TarihseverTitle />
        </HeaderTitleLink>
        <SearchDialog />
        <HeaderMenuContainer>
          {mainMenuLinks.map((item) => (
            <MenuItem
              key={item.key}
              linkDetails={item}
              className={cn(item.path === pathname && "bg-primary-hover-background text-primary-lighter")}
            />
          ))}
          <ThemeButton />
        </HeaderMenuContainer>
      </HeaderContainer>
      <HeaderContainer className="hidden w-full max-[1000px]:flex">
        <LeftMenuSheet />
        <HeaderTitleLink>
          <TarihseverIcon />
          <TarihseverTitle />
        </HeaderTitleLink>
        <ThemeButton />
      </HeaderContainer>
    </HeaderRoot>
  );
};

export { Header };
