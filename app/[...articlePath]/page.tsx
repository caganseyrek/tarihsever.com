import React from "react";

import NotFoundPage from "@/app/not-found";

import ContentLayout from "@/components/page-layout/PageLayout";

import { articleSet } from "@/resources/generated/article-set";

import { Pages } from "@/types/globals";

export const dynamicParams: boolean = true;

export const generateStaticParams = (): Pages.ArticlePageProps["params"][] => {
  return Array.from(articleSet).map((article) => ({ articlePath: article.split("/") }));
};

const ArticlePage = async ({ params }: Pages.ArticlePageAsyncProps) => {
  const awaitedPathElements: string[] = (await params).articlePath ?? [];

  if (!articleSet.has(awaitedPathElements.join("/"))) return <NotFoundPage />;
  const filePath: string = awaitedPathElements.slice(1).join("/");

  const { default: Contents } = await import(`@/resources/content/${filePath}.mdx`);
  const { toc } = await import(`@/resources/content/${filePath}.toc.ts`);

  return (
    <ContentLayout tocObject={toc}>
      <Contents />
    </ContentLayout>
  );
};

export default ArticlePage;
