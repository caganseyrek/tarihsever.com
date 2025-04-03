"use client";

import React from "react";

import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import TableOfContents from "@/components/table-of-contents/TableOfContents";

import { HeadingNodeProps } from "@/prepublish/tasks/generate-toc";

import { ContentArticle, ContentRightSection, ContentRoot, ContentWrapper } from "./ContentLayout.partials";

interface LayoutRootProps {
  children: React.ReactNode;
  tocObject: HeadingNodeProps[];
}

const ContentLayout = ({ children, tocObject }: LayoutRootProps) => {
  return (
    <ContentRoot>
      <Header />
      <ContentWrapper>
        <Sidebar />
        <ContentRightSection>
          <ContentArticle>{children}</ContentArticle>
          <TableOfContents tocObject={tocObject} />
        </ContentRightSection>
      </ContentWrapper>
      <Footer />
    </ContentRoot>
  );
};

export default ContentLayout;
