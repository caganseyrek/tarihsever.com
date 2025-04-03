import React from "react";

import NotFoundPage from "@/app/not-found";

import ContentLayout from "@/components/content-layout/ContentLayout";

import { articleSet } from "@/prepublish/generated/article-set";

interface ArticlePageProps {
  params: Promise<{ articlePath?: string[] }>;
}

const ArticlePage = async ({ params }: ArticlePageProps) => {
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
