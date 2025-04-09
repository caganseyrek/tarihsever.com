"use client";

import React from "react";

import { usePathname } from "next/navigation";

import { Menu } from "lucide-react";

import { ArticleList } from "@/components/article-list";
import { Button } from "@/components/base/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/base/sheet";
import { SidebarContent, SidebarGroup, SidebarGroupLabel } from "@/components/base/sidebar";
import { MenuItem } from "@/components/menu-item";
import { SearchDialog } from "@/components/search-dialog";
import { TarihseverIcon, TarihseverTitle } from "@/components/tarihsever";

import { mainMenuLinks } from "@/contents/data/main-menu-links";

import { cn } from "@/shared/utils";

const LeftMenuSheet = ({ className, ...props }: React.ComponentProps<typeof Button>) => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className={cn("bg-container-inner-item-background", className)} {...props}>
          <Menu /> <span className="sr-only">Menüyü aç</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85%]">
        <SheetHeader className="gap-2 max-[270px]:flex-col-reverse max-[270px]:items-start">
          <SheetTitle>
            <TarihseverIcon />
            <TarihseverTitle asChild />
            <span className="sr-only">Menü</span>
          </SheetTitle>
          <SheetDescription className="sr-only">Mobile menü</SheetDescription>
          <SheetClose />
        </SheetHeader>
        <SearchDialog className="w-full" />
        <SidebarContent className="w-full gap-6">
          <SidebarGroup>
            <SidebarGroupLabel className="bg-container-inner-item-background" title="Sayfalar">
              Sayfalar
            </SidebarGroupLabel>
            <div className="w-full flex flex-col items-start justify-start gap-1">
              {mainMenuLinks.map((item) => (
                <MenuItem
                  key={item.key}
                  linkDetails={item}
                  className={cn(
                    "truncate",
                    item.path === pathname && "bg-primary-hover-background text-primary-lighter",
                  )}
                />
              ))}
            </div>
          </SidebarGroup>
          <ArticleList forMobileSidebar />
        </SidebarContent>
      </SheetContent>
    </Sheet>
  );
};

export { LeftMenuSheet };
