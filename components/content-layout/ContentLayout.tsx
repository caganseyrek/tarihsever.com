"use client";

import React from "react";

import Footer from "@/components/footer/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import TableOfContents from "@/components/table-of-contents/TableOfContents";

import { ContentArticle, ContentRightSection, ContentRoot, ContentWrapper } from "./ContentLayout.Partials";

interface LayoutRootProps {
  children: React.ReactNode;
}

const ContentLayout = ({ children }: LayoutRootProps) => {
  return (
    <ContentRoot>
      <ContentWrapper>
        <Sidebar />
        <ContentRightSection>
          <ContentArticle>{children}</ContentArticle>
          <TableOfContents />
        </ContentRightSection>
      </ContentWrapper>
      <Footer />
    </ContentRoot>
  );
};

export default ContentLayout;
