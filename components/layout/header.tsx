"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  HeaderNavItem,
  HeaderRightSection,
  HeaderRoot,
  HeaderSearchDialog,
  HeaderTitle,
  HeaderWrapper,
} from "@/components/layout/header.partials";
import TarihseverIcon from "@/components/tarihsever-icon";
import ThemeButton from "@/components/theme/theme-button";

import { mainMenuLinks } from "@/content/data/main-menu-links";

import { cn } from "@/shared/utils";

const Header = () => {
  const pathname = usePathname();

  return (
    <HeaderRoot>
      <HeaderWrapper>
        <Link href="/">
          <HeaderTitle>
            <TarihseverIcon />
            <h1>
              Tarih<span>sever</span>
            </h1>
          </HeaderTitle>
        </Link>
        <HeaderSearchDialog />
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
