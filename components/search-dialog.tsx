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

import { cn } from "@/shared/utils";

import type { Components } from "@/types/globals";

import { mainMenuLinks } from "@/contents/data/main-menu-links";
import { articleNav } from "@/contents/generated/article-nav";

const SearchDialog = ({ className }: Components.SearchDialogInputProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn("w-[500px] justify-start items-center bg-container-inner-item-background", className)}>
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

export default SearchDialog;
