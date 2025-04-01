import React from "react";

import NotFoundPage from "@/app/not-found";

import ContentLayout from "@/components/content-layout/ContentLayout";

interface ArticlePageProps {
  params: Promise<{ pathElements?: string[] }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const awaitedPathElements: string[] = (await params).pathElements ?? [];
  if (awaitedPathElements.length !== 3) {
    return <NotFoundPage />;
  }

  return <ContentLayout>123</ContentLayout>;
}
