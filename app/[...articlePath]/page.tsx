import React from "react";

import NotFoundPage from "@/app/not-found";

import ContentLayout from "@/components/content-layout/ContentLayout";

import { articleSet } from "@/prepublish/generated/article-set";

interface ArticlePageProps {
  params: Promise<{ articlePath?: string[] }>;
}

const ArticlePage = async ({ params }: ArticlePageProps) => {
  const awaitedPathElements: string[] = (await params).articlePath ?? [];
  const pathString: string = awaitedPathElements.join("/");

  if (awaitedPathElements.length !== 4 || awaitedPathElements[0] !== "konular" || !articleSet.has(pathString)) {
    return <NotFoundPage />;
  }

  const { default: Contents, toc } = await import(`@/resources/content/topics/${pathString}.mdx`);

  return (
    <ContentLayout tocObject={toc}>
      <Contents />
    </ContentLayout>
  );
};

export default ArticlePage;
