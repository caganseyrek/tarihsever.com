"use client";

import React from "react";

import { usePathname } from "next/navigation";

import { Menu } from "lucide-react";

import { Button, LinkedButton } from "@/components/base/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/base/sheet";

import { ArticleList } from "@/components/article-list";
import { SidebarContent, SidebarGroup, SidebarGroupLabel } from "@/components/partials/sidebar.partials";
import { SearchDialog } from "@/components/search-dialog";
import { TarihseverIcon, TarihseverTitle } from "@/components/tarihsever";

import { mainNavigation } from "@/content/data/main-navigation";

import { cn } from "@/shared/utils";

const MobileSidebar = ({ className, ...props }: React.ComponentProps<typeof Button>) => {
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
            <span className="sr-only">Mobil Menü</span>
          </SheetTitle>
          <SheetDescription className="sr-only">Mobile menü</SheetDescription>
          <SheetClose />
        </SheetHeader>
        <SearchDialog className="w-full" placeholderText="Tarihsever'de Ara..." />
        <SidebarContent className="w-full gap-6">
          <SidebarGroup>
            <SidebarGroupLabel className="bg-container-inner-item-background" title="Sayfalar">
              Sayfalar
            </SidebarGroupLabel>
            <div className="w-full flex flex-col items-start justify-start gap-1">
              {mainNavigation.map((item) => (
                <LinkedButton key={item.key} link={item.path} toggled={item.path === pathname} className="truncate">
                  {item.title}
                </LinkedButton>
              ))}
            </div>
          </SidebarGroup>
          <ArticleList mobile />
        </SidebarContent>
      </SheetContent>
    </Sheet>
  );
};

export { MobileSidebar };
