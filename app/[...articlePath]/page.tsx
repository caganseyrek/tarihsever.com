import React from "react";

import NotFoundPage from "@/app/not-found";

import ContentLayout from "@/components/content-layout/ContentLayout";

import { articleSet } from "@/prepublish/generated/article-set";

interface ArticlePageProps {
  params: { articlePath?: string[] };
}

interface ArticlePageAsyncProps {
  params: Promise<{ articlePath?: string[] }>;
}

export const dynamicParams: boolean = true;

export const generateStaticParams = (): ArticlePageProps["params"][] => {
  return Array.from(articleSet).map((article) => ({ articlePath: article.split("/") }));
};

const ArticlePage = async ({ params }: ArticlePageAsyncProps) => {
  const awaitedPathElements: string[] = (await params).articlePath ?? [];

  if (
    awaitedPathElements.length !== 4 ||
    awaitedPathElements[0] !== "konular" ||
    !articleSet.has(awaitedPathElements.join("/"))
  ) {
    return <NotFoundPage />;
  }
  const filePath: string = awaitedPathElements.slice(1).join("/");

  // FIXME toc doesnt seem to import when building
  const { default: Contents } = await import(`@/resources/content/topics/${filePath}.mdx`);

  return (
    <ContentLayout tocObject={[]}>
      <Contents />
    </ContentLayout>
  );
};

export default ArticlePage;
