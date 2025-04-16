import React from "react";

import type { LucideProps } from "lucide-react";

export interface LinkProps {
  key: string;
  title: string;
  path: string;
}
export interface ContentTreeProps {
  key: string;
  title: string;
  subtopics: {
    key: string;
    title: string;
    articles: LinkProps[];
  }[];
}
export interface HeadingProps {
  text: string;
  level: number;
}
export interface HeadingNodeProps extends HeadingProps {
  id: string;
  children: HeadingNodeProps[];
}
export interface MainNavigationProps {
  key: string;
  title: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  description: string;
  path: string;
}
export interface TableOfContentsProps {
  tocObject: HeadingNodeProps[];
}
export interface ArticlePageGenerateProps {
  articlePath?: string[];
}
export interface ArticlePageAsyncProps {
  params: Promise<ArticlePageGenerateProps>;
}
export interface OutputFileProps {
  contentTreeOutput: string;
  shortlinkOutput: string;
}
export interface DirToProcessProps {
  path: string;
  options: {
    addToContentTree: boolean;
    generateShortlink: boolean;
    generateTableOfContents: boolean;
  };
}
