import React from "react";

import Link from "next/link";

import { Search } from "lucide-react";

import { Button } from "@/components/base/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/base/dialog";
import {
  CommandArticleItem,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandRoot,
  CommandSeparator,
} from "@/components/partials/search-dialog.partials";

import { articleNav } from "@/contents/__generated__/article-nav";
import { mainMenuLinks } from "@/contents/data/main-menu-links";

import { cn } from "@/shared/utils";

import type { Components } from "@/types/globals";

const SearchDialog = ({ className, iconOnly }: Components.SearchDialogInputProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "items-center bg-container-inner-item-background",
            iconOnly ? "justify-center" : "w-[500px] justify-start",
            className,
          )}>
          <Search /> {iconOnly ? <span className="sr-only">Arama penceresini aç</span> : "Tarihsever'de Ara..."}
        </Button>
      </DialogTrigger>
      <DialogContent hasCloseButton={false} className="p-0">
        <DialogTitle className="sr-only">Arama Kutusu</DialogTitle>
        <CommandRoot>
          <CommandInput placeholder="Sayfa veya yazı ara..." />
          <CommandList>
            <CommandEmpty>Sonuç bulunamadı...</CommandEmpty>
            <CommandGroup heading="Sayfalar">
              {mainMenuLinks.map((item) => (
                <CommandItem key={item.key} asChild>
                  <Link href={item.path} className="truncate" title={item.title}>
                    {item.title}
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Yazılar">
              {articleNav.map((topic) =>
                topic.subtopics.map((subtopic) =>
                  subtopic.articles.map((article) => (
                    <CommandArticleItem
                      key={article.key}
                      topicTitle={topic.title}
                      subtopicTitle={subtopic.title}
                      article={article}
                    />
                  )),
                ),
              )}
            </CommandGroup>
          </CommandList>
        </CommandRoot>
      </DialogContent>
    </Dialog>
  );
};

export { SearchDialog };
