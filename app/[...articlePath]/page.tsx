import React from "react";

import type { Metadata } from "next";

import NotFoundPage from "@/app/not-found";

import { PageLayout } from "@/components/page-layout";

import { useLoadPage } from "@/hooks/use-load-page";

import { contentTreeArticles, contentTreeLookup } from "@/content/data/__generated__/content-tree";

import type { ArticlePageAsyncProps, ArticlePageGenerateProps } from "@/types/globals";

export const generateMetadata = async ({ params }: ArticlePageAsyncProps): Promise<Metadata> => {
  const awaitedPathElements: string[] = (await params).articlePath ?? [];
  if (awaitedPathElements.length !== 4) {
    return { title: "Sayfa bulunamadı - Tarihsever" }; // Fallback
  }

  const articlePath: string = awaitedPathElements.join("/");
  const articleTitle: string = contentTreeArticles[articlePath];

  return { title: articleTitle };
};

export const dynamicParams: boolean = true;

export const generateStaticParams = (): ArticlePageGenerateProps[] => {
  return Array.from(contentTreeLookup).map((article) => ({ articlePath: article.split("/") }));
};

const ArticlePage = async ({ params }: ArticlePageAsyncProps) => {
  const awaitedPathElements: string[] = (await params).articlePath ?? [];
  const { content: Content, toc, notFound } = await useLoadPage(awaitedPathElements);

  if (notFound) return <NotFoundPage />;

  return (
    <PageLayout tocObject={toc}>
      <Content />
    </PageLayout>
  );
};

export default ArticlePage;
