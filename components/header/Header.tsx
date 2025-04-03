"use client";

import React from "react";

import { usePathname } from "next/navigation";

import { Moon } from "lucide-react";

import { Button } from "@/components/base/button";
import TarihseverIcon from "@/components/TarihseverIcon";

import { cn } from "@/shared/utils";

import { mainMenuLinks } from "@/resources/data/main-menu-links";

import {
  HeaderNavItem,
  HeaderRightSection,
  HeaderRoot,
  HeaderSearchDialog,
  HeaderTitle,
  HeaderWrapper,
} from "./Header.Partials";

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
              className={cn(item.path === pathname && "bg-primary/10 text-primary-foreground")}
            />
          ))}
          <Button>
            <Moon />
          </Button>
        </HeaderRightSection>
      </HeaderWrapper>
    </HeaderRoot>
  );
};

export default Header;
