import React from "react";

import NotFoundPage from "@/app/not-found";

import PageLayout from "@/components/layout/page-layout";

import type { Pages } from "@/types/globals";

import { articleSet } from "@/contents/generated/article-set";

export const dynamicParams: boolean = true;

export const generateStaticParams = (): Pages.ArticlePageProps["params"][] => {
  return Array.from(articleSet).map((article) => ({ articlePath: article.split("/") }));
};

const ArticlePage = async ({ params }: Pages.ArticlePageAsyncProps) => {
  const awaitedPathElements: string[] = (await params).articlePath ?? [];

  if (!articleSet.has(awaitedPathElements.join("/"))) return <NotFoundPage />;
  const filePath: string = awaitedPathElements.slice(1).join("/");

  const { default: Contents } = await import(`@/contents/topics/${filePath}.mdx`);
  const { toc } = await import(`@/contents/topics/${filePath}.toc.ts`);

  return (
    <PageLayout tocObject={toc}>
      <Contents />
    </PageLayout>
  );
};

export default ArticlePage;
