"use client";

import React from "react";

import Link from "next/link";

import { ChevronRight, Search } from "lucide-react";

import { Button } from "@/components/base/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/base/command";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/base/dialog";

import { mainMenuLinks } from "@/content/data/main-menu-links";
import { articleNav } from "@/content/generated/article-nav";

import { cn } from "@/shared/utils";

import { Components } from "@/types/globals";

const HeaderRoot = ({ children, className }: Components.BaseWrapperProps) => {
  return (
    <header id="top" className={cn("w-full bg-container-background border-b border-border", className)}>
      {children}
    </header>
  );
};

const HeaderWrapper = ({ children, className }: Components.BaseWrapperProps) => {
  return (
    <div className={cn("w-[1344px] m-auto p-4 gap-10 flex flex-row items-center justify-between", className)}>
      {children}
    </div>
  );
};

const HeaderTitle = ({ children, className }: Components.BaseWrapperProps) => {
  return (
    <div
      className={cn(
        "[&>h1]:text-3xl [&>h1]:font-semibold [&>h1]:tracking-tighter [&>h1]:select-none",
        "[&>h1>span]:text-primary",
        "flex flex-row items-center justify-center gap-2",
        className,
      )}>
      {children}
    </div>
  );
};

const HeaderRightSection = ({ children, className }: Components.BaseWrapperProps) => {
  return <div className={cn("flex flex-row items-center justify-center gap-1", className)}>{children}</div>;
};

const HeaderNavItem = ({ className, linkDetails }: Components.HeaderNavItemProps) => {
  return (
    <Link href={linkDetails.path} className="w-full">
      <Button variant="ghost" className={cn("w-full justify-start", className)}>
        {linkDetails.title}
      </Button>
    </Link>
  );
};

const HeaderSearchDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="justify-start items-center w-[500px] bg-container-inner-item-background border-0">
          <Search /> Tarihsever&apos;de Ara...
        </Button>
      </DialogTrigger>
      <DialogContent hasCloseButton={false} className="p-0">
        <DialogTitle className="sr-only">Arama Kutusu</DialogTitle>
        <Command>
          <CommandInput placeholder="Sayfa veya makale ara..." />
          <CommandList>
            <CommandEmpty>Sonuç bulunamadı...</CommandEmpty>
            <CommandGroup heading="Sayfalar">
              {mainMenuLinks.map((item) => (
                <Link href={item.path} key={item.key}>
                  <CommandItem>{item.title}</CommandItem>
                </Link>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Yazılar">
              {articleNav.map((topic) =>
                topic.subtopics.map((subtopic) =>
                  subtopic.articles.map((article) => (
                    <Link key={article.key} href={article.path}>
                      <CommandItem>
                        <span>{article.title}</span>
                        <span className="w-full text-xs text-muted-foreground/70 flex items-start justify-end">
                          {topic.title} <ChevronRight /> {subtopic.title}
                        </span>
                      </CommandItem>
                    </Link>
                  )),
                ),
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export { HeaderRoot, HeaderWrapper, HeaderTitle, HeaderRightSection, HeaderNavItem, HeaderSearchDialog };
