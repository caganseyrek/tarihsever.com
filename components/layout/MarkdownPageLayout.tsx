"use client";

import React from "react";
import Markdown from "react-markdown";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import BaseLayout from "./BaseLayout";
import BackToTop from "./partial/BackToTop";
import NavSidebar from "./sidebars/NavSidebar";
import TocSidebar from "./sidebars/TocSidebar";

interface MarkdownPageProps {
  loadedPageKey: string | null;
  loadedTopicKey: string | null;
  loadedArticleKey: string | null;
  children?: string;
}

const MarkdownPageLayout = ({ loadedPageKey, loadedTopicKey, loadedArticleKey, children = "" }: MarkdownPageProps) => {
  return (
    <BaseLayout loadedPageKey={loadedPageKey} loadedTopicKey={loadedTopicKey} loadedArticleKey={loadedArticleKey}>
      <section className="w-[76rem] min-h-[calc(100vh-259px)] flex flex-row items-start justify-center gap-8">
        <NavSidebar />
        <article className="w-[40rem] max-[1248px]:w-[50rem] text-pretty py-1 text-[0.95rem]">
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeSanitize,
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
              [rehypeExternalLinks, { target: "_blank" }],
            ]}>
            {children}
          </Markdown>
          <BackToTop />
        </article>
        <TocSidebar pageContent={children} />
      </section>
    </BaseLayout>
  );
};

export default MarkdownPageLayout;
