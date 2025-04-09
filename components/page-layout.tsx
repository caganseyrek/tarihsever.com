import React from "react";

import Link from "next/link";

import { ArrowUp } from "lucide-react";

import { ArticleList } from "@/components/article-list";
import { Button } from "@/components/base/button";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import {
  PageLayoutArticle,
  PageLayoutMain,
  PageLayoutRightSection,
  PageLayoutRoot,
} from "@/components/partials/page-layout.partials";
import { TableOfContents } from "@/components/table-of-contents";

import type { Components } from "@/types/globals";

const PageLayout = ({ children, tocObject }: Components.PageLayoutProps) => {
  return (
    <PageLayoutRoot>
      <Header />
      <PageLayoutMain>
        <ArticleList />
        <PageLayoutRightSection>
          <PageLayoutArticle>
            <TableOfContents tocObject={tocObject} forMobileToggle />
            {children}
            <Button asChild className="text-primary hover:text-primary-lighter">
              <Link href="#top" className="w-[720px] max-[1344px]:w-full">
                <ArrowUp /> Başa Dön
              </Link>
            </Button>
          </PageLayoutArticle>
          <TableOfContents tocObject={tocObject} />
        </PageLayoutRightSection>
      </PageLayoutMain>
      <Footer />
    </PageLayoutRoot>
  );
};

export { PageLayout };
