import React from "react";

import { ArrowUp } from "lucide-react";

import Footer from "@/components/layout/footer";
import HeaderComponentWrapper from "@/components/layout/header.wrapper";
import {
  BackToTopButton,
  PageArticle,
  PageRightSection,
  PageRoot,
  PageWrapper,
} from "@/components/layout/page-layout.partials";
import ArticleNavComponentWrapper from "@/components/sidebars/article-nav.wrapper";
import TableOfContents from "@/components/sidebars/table-of-contents";

import type { Components } from "@/types/globals";

const PageLayout = ({ children, tocObject }: Components.PageLayoutProps) => {
  return (
    <PageRoot>
      <HeaderComponentWrapper />
      <PageWrapper>
        <ArticleNavComponentWrapper />
        <PageRightSection>
          <PageArticle>{children}</PageArticle>
          <TableOfContents tocObject={tocObject} />
        </PageRightSection>
      </PageWrapper>
      <BackToTopButton>
        <ArrowUp /> Başa Dön
      </BackToTopButton>
      <Footer />
    </PageRoot>
  );
};

export default PageLayout;
