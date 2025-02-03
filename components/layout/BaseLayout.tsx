"use client";

import React from "react";

import Finder from "@/lib/lookup/finder";
import { ArticleMapProps } from "@/lib/mapper/generated/articlesMap";

import { NavigationMapProps, TopicMapProps } from "@/data/staticMaps";

import { userSelectionContext } from "../context/SelectionContext";
import Footer from "./partial/Footer";
import Header from "./partial/Header";

interface LayoutRootProps {
  loadedPageKey: string | null;
  loadedTopicKey: string | null;
  loadedArticleKey: string | null;
  children?: React.ReactNode;
}

/* eslint-disable react-hooks/exhaustive-deps */

const BaseLayout = ({ loadedPageKey, loadedTopicKey, loadedArticleKey, children }: LayoutRootProps) => {
  const { setUserSelection } = React.useContext(userSelectionContext);

  let currentPage: Omit<NavigationMapProps, "icon"> | null = null;
  let currentTopic: TopicMapProps | null = null;
  let currentArticle: ArticleMapProps | null = null;

  if (loadedPageKey) {
    const _page = Finder.findPage(loadedPageKey);
    currentPage = _page ? { key: _page.key, title: _page.title } : null;
  } else if (loadedTopicKey) {
    currentTopic = Finder.findTopic(loadedTopicKey);
    if (loadedArticleKey) {
      currentArticle = Finder.findSinlgeArticleByTopic(loadedTopicKey, loadedArticleKey);
    }
  }

  React.useEffect(() => {
    setUserSelection(() => ({
      currentPage: currentPage,
      currentTopic: currentTopic,
      currentArticle: currentArticle,
    }));
  }, [loadedPageKey, loadedTopicKey, loadedArticleKey]);

  return (
    <main id="top" className="w-dvw h-full min-h-dvh flex flex-col items-center justify-center gap-4">
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default BaseLayout;
