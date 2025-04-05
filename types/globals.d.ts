import React from "react";

import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/base/button";

export namespace Globals {
  export interface LinkProps {
    key: string;
    title: string;
    path: string;
  }
  export namespace Data {
    export interface ArticleNavProps extends LinkProps {
      subtopics: {
        key: string;
        title: string;
        path: string;
        articles: LinkProps[];
      }[];
    }
    export interface ArticleTitleProps {
      [key: string]: {
        originalTitle: string;
        formattedTitle: string;
      };
    }
    export interface ShortLinkProps {
      shortLinkCode: string;
      redirectsTo: string;
    }
    export interface HeadingProps {
      text: string;
      level: number;
    }
    export interface HeadingNodeProps extends HeadingProps {
      id: string;
      children: HeadingNodeProps[];
    }
  }
}

export namespace Pages {
  export interface ArticlePageProps {
    params: { articlePath?: string[] };
  }
  export interface ArticlePageAsyncProps {
    params: Promise<{ articlePath?: string[] }>;
  }
}

export namespace Components {
  export interface BaseWrapperProps {
    children?: React.ReactNode;
    className?: string;
  }
  export interface PageLayoutProps extends Pick<BaseWrapperProps, "children"> {
    tocObject: HeadingNodeProps[];
  }
  export type PageLayoutWrapperProps = PageLayoutProps;
  export interface TarihseverIconProps {
    variant?: "small" | "large";
  }
  export interface HeaderNavItemProps extends Pick<BaseWrapperProps, "className"> {
    linkDetails: Globals.LinkProps;
  }
  export interface TableOfContentsProps {
    tocObject: Globals.Data.HeadingNodeProps[];
  }
  export interface SubtopicToggleProps {
    subtopicTitle: string;
  }
  export interface SubtopicArticlesProps {
    articles: Globals.LinkProps[];
  }
  export interface ContentSubheaderProps {
    breadcrumbs: string[];
    pagePath: string;
  }
  export type BreadcrumbsProps = Pick<ContentSubheaderProps, "breadcrumbs">;
  export namespace MDX {
    export interface ContentHeadingProps extends BaseWrapperProps {
      as: "h1" | "h2" | "h3" | "h4" | "h5";
      hasAnchorLink?: boolean;
    }
    export interface ContentSourcesProps {
      sources: {
        sourceOrigin: string;
        sourceAnchor: string;
        sourceName: string;
        sourceWebsiteName: string;
        links: {
          sourceWebsiteLink: string;
          historicalDocument?: string;
        };
      }[];
    }
    export interface SourcesItemProps extends BaseWrapperProps {
      id: string;
    }
    export interface SourcesLinkContainerItemProps {
      prefix: string;
      link: string;
    }
    export interface BackToHeadingProps extends Pick<BaseWrapperProps, "className"> {
      sourceOrigin: string;
      hoverTitle: string;
    }
  }
  export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
    asChild?: boolean;
  }
}

export namespace Workflows {
  export namespace Prepublish {
    export interface OutputFileProps {
      articleNavFileName: string;
      articleTitlesFileName: string;
      articleSetFileName: string;
      shortLinkFileName: string;
    }
    export interface DirToProcessProps {
      path: string;
      options: {
        addToArticleSet: boolean;
        addToArticleNav: boolean;
        generateShortLink: boolean;
        generateToc: boolean;
        addSubheader: boolean;
      };
    }
  }
}
