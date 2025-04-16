import React from "react";

import Link from "next/link";

import { Search } from "lucide-react";

import { Button } from "@/components/base/button";
import {
  CommandArticleItem,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandRoot,
  CommandSeparator,
} from "@/components/base/command";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/base/dialog";

import { contentTree } from "@/content/data/__generated__/content-tree";
import { mainNavigation } from "@/content/data/main-navigation";

import { cn } from "@/shared/utils";

interface SearchDialogInputProps {
  className?: string;
  iconOnly?: boolean;
  placeholderText: string;
}

const SearchDialog = ({ className, placeholderText }: SearchDialogInputProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn("items-center bg-container-inner-item-background w-[450px] justify-start", className)}>
          <Search /> {placeholderText}
        </Button>
      </DialogTrigger>
      <DialogContent hasCloseButton={false} className="p-0">
        <DialogTitle className="sr-only">Arama Kutusu</DialogTitle>
        <CommandRoot>
          <CommandInput placeholder={placeholderText} />
          <CommandList>
            <CommandEmpty>Sonuç bulunamadı...</CommandEmpty>
            <CommandGroup heading="Sayfalar">
              {mainNavigation.map((item) => (
                <CommandItem key={item.key} asChild>
                  <Link href={item.path} className="truncate" title={item.title}>
                    {item.title}
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Yazılar">
              {contentTree.map((topic) =>
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
