"use client";

import React from "react";

import { Search } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/base/dialog";
import { Input } from "@/components/base/input";

import Finder from "@/lib/lookup/finder";
import { ArticleMapProps } from "@/lib/mapper/generated/articlesMap";
import Searcher from "@/lib/searcher/searcher";

import { Button } from "../../base/button";

const SearchDialog = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const results: ArticleMapProps[] = Searcher.search(searchQuery)
    .map((result) => {
      const article = Finder.findArticle(result);
      if (article) {
        return {
          topic: article.topic,
          key: article.key,
          title: article.title,
        };
      }
      return null;
    })
    .filter((result) => result !== null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="justify-start text-[0.95rem]">
          <Search />
          Tarihsever&apos;de Ara...
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sayfayı Paylaş</DialogTitle>
          <DialogDescription>Aşağıdaki kısa link ile bu sayfaya kolayca ulaşabilirsiniz.</DialogDescription>
        </DialogHeader>
        <Input
          className="justify-start text-[0.95rem]"
          placeholder="Tarihsever'de Ara..."
          onKeyUp={(e) => setSearchQuery(e.currentTarget.value)}
        />
        <div className="flex flex-col items-center justify-start gap-2">
          {results.length > 0 ? (
            results.map((result) => (
              <div key={result.key}>
                <h3>{result.title}</h3>
                <p>{result.topic}</p>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
