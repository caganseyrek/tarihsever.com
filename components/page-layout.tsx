import React from "react";

import Link from "next/link";

import { ArrowUp } from "lucide-react";

import { Button } from "@/components/base/button";

import { ArticleList } from "@/components/article-list";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileTableOfContents } from "@/components/mobile/mobile-table-of-contents";
import {
  PageLayoutArticle,
  PageLayoutMain,
  PageLayoutRightSection,
  PageLayoutRoot,
} from "@/components/partials/page-layout.partials";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarRoot,
} from "@/components/partials/sidebar.partials";
import { TableOfContents } from "@/components/table-of-contents";

import type { HeadingNodeProps, TableOfContentsProps } from "@/types/globals";

interface PageLayoutProps {
  children?: React.ReactNode;
  tocObject: HeadingNodeProps[];
}

const ArticleListSidebar = () => {
  return (
    <SidebarRoot>
      <SidebarContent>
        <ArticleList />
      </SidebarContent>
    </SidebarRoot>
  );
};

const TableOfContentsSidebar = ({ tocObject }: TableOfContentsProps) => {
  return (
    <SidebarRoot>
      <SidebarContent className="sticky top-4 gap-1">
        <SidebarGroup>
          <SidebarGroupLabel title="İçindekiler">Bu Yazıdaki Başlıklar</SidebarGroupLabel>
          <SidebarGroupContent className="max-h-[calc(100dvh-4.5rem)] overflow-auto">
            <TableOfContents tocObject={tocObject} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarRoot>
  );
};

const BackToTop = () => {
  return (
    <Button asChild className="text-primary hover:text-primary-lighter">
      <Link href="#top" className="w-[720px] max-[1344px]:w-full">
        <ArrowUp /> Başa Dön
      </Link>
    </Button>
  );
};

const PageLayout = ({ children, tocObject }: PageLayoutProps) => {
  return (
    <PageLayoutRoot>
      <Header />
      <PageLayoutMain>
        <ArticleListSidebar />
        <PageLayoutRightSection>
          <PageLayoutArticle>
            <MobileTableOfContents tocObject={tocObject} />
            {children}
            <BackToTop />
          </PageLayoutArticle>
          <TableOfContentsSidebar tocObject={tocObject} />
        </PageLayoutRightSection>
      </PageLayoutMain>
      <Footer />
    </PageLayoutRoot>
  );
};

export { PageLayout };
