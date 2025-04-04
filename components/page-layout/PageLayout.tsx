"use client";

import React from "react";

import { ArrowUp } from "lucide-react";

import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import {
  BackToTopButton,
  PageArticle,
  PageRightSection,
  PageRoot,
  PageWrapper,
} from "@/components/page-layout/PageLayout.partials";
import ArticleNav from "@/components/sidebars/article-nav/ArticleNav";
import TableOfContents from "@/components/sidebars/table-of-contents/TableOfContents";

import { Components } from "@/types/globals";

const ContentLayout = ({ children, tocObject }: Components.ContentLayoutProps) => {
  return (
    <PageRoot>
      <Header />
      <PageWrapper>
        <ArticleNav />
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

export default ContentLayout;
