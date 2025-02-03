import React from "react";

import { Metadata } from "next";

import NotFoundPage from "@/app/not-found";

import MarkdownPageLayout from "@/components/layout/MarkdownPageLayout";

import { ArticleFileProps, Loader } from "@/lib/file-manager/loader";
import Finder from "@/lib/lookup/finder";
import { ArticleMapProps } from "@/lib/mapper/generated/articlesMap";

interface ArticlePageProps {
  params: Promise<{ topicKey: string; articleKey: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const awaitedTopicKey: string = (await params).topicKey;
  const awaitedArticleKey: string = (await params).articleKey;
  const article: ArticleMapProps | null = Finder.findArticle(awaitedTopicKey, awaitedArticleKey);
  if (!article) {
    return { title: "Sayfa bulunamadı" };
  }
  return { title: article.title };
}

const ArticlePage = async ({ params }: ArticlePageProps) => {
  const awaitedTopicKey: string = (await params).topicKey;
  const awaitedArticleKey: string = (await params).articleKey;

  const article: ArticleFileProps = Loader.loadArticle(awaitedTopicKey, awaitedArticleKey);

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <MarkdownPageLayout loadedPageKey={null} loadedTopicKey={awaitedTopicKey} loadedArticleKey={awaitedArticleKey}>
      {article.content}
    </MarkdownPageLayout>
  );
};

export default ArticlePage;
