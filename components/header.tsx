"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LinkedButton } from "@/components/base/button";

import { MobileSidebar } from "@/components/mobile/mobile-sidebar";
import { SearchDialog } from "@/components/search-dialog";
import { TarihseverIcon, TarihseverTitle } from "@/components/tarihsever";
import { ThemeButton } from "@/components/theme/theme-button";

import { mainNavigation } from "@/content/data/main-navigation";

import { cn } from "@/shared/utils";

const HeaderTitleLink = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
  return (
    <Link href="/" className={cn("flex flex-row items-center justify-center gap-2", className)}>
      {children}
    </Link>
  );
};

const HeaderContainer = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("w-[1344px] m-auto p-4 gap-10 flex flex-row items-center justify-between", className)}
      {...props}>
      {children}
    </div>
  );
};

const DefaultHeaderContents = () => {
  const pathname = usePathname();
  return (
    <HeaderContainer className="max-[1344px]:w-full max-[1050px]:hidden">
      <Link href="/" className="flex flex-row items-center justify-center gap-2">
        <TarihseverIcon />
        <TarihseverTitle />
      </Link>
      <SearchDialog placeholderText="Tarihsever'de Ara..." />
      <div className="flex flex-row items-center justify-center gap-1">
        {mainNavigation.map((item) => (
          <LinkedButton key={item.key} link={item.path} toggled={item.path === pathname}>
            {item.title}
          </LinkedButton>
        ))}
        <ThemeButton />
      </div>
    </HeaderContainer>
  );
};

const MobileHeaderContents = () => {
  return (
    <HeaderContainer className="hidden w-full max-[1050px]:flex">
      <MobileSidebar />
      <HeaderTitleLink>
        <TarihseverIcon />
        <TarihseverTitle />
      </HeaderTitleLink>
      <ThemeButton />
    </HeaderContainer>
  );
};

const Header = () => {
  return (
    <header className="w-full bg-container-background border-b">
      <DefaultHeaderContents />
      <MobileHeaderContents />
    </header>
  );
};

export { Header };
