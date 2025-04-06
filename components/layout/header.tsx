"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import TarihseverIcon from "@/components/branding/tarihsever-icon";
import TarihseverTitle from "@/components/branding/tarihsever-title";
import {
  HeaderNavItem,
  HeaderRightSection,
  HeaderRoot,
  HeaderTitle,
  HeaderWrapper,
} from "@/components/layout/header.partials";
import SearchDialog from "@/components/search-dialog";
import ThemeButton from "@/components/theme/theme-button";

import { cn } from "@/shared/utils";

import { mainMenuLinks } from "@/contents/data/main-menu-links";

const Header = () => {
  const pathname = usePathname();

  return (
    <HeaderRoot>
      <HeaderWrapper>
        <Link href="/">
          <HeaderTitle>
            <TarihseverIcon />
            <TarihseverTitle />
          </HeaderTitle>
        </Link>
        <SearchDialog />
        <HeaderRightSection>
          {mainMenuLinks.map((item) => (
            <HeaderNavItem
              key={item.key}
              linkDetails={item}
              className={cn(item.path === pathname && "bg-primary-hover-background text-primary-lighter")}
            />
          ))}
          <ThemeButton />
        </HeaderRightSection>
      </HeaderWrapper>
    </HeaderRoot>
  );
};

export default Header;
