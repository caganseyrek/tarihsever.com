import React from "react";

import { Content } from "@radix-ui/react-dialog";
import type { VariantProps } from "class-variance-authority";
import type { LucideProps } from "lucide-react";

import { buttonVariants } from "@/components/base/button";
import { sheetVariants } from "@/components/base/sheet";

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
    export interface TitleProps {
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
    export interface HomepageCardProps {
      key: string;
      title: string;
      icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
      description: string;
      get_redirect_path: () => string;
    }
  }
}

export namespace Components {
  export interface TableOfContentsProps {
    forMobileToggle?: boolean;
    tocObject: Globals.Data.HeadingNodeProps[];
  }
  export interface BrandingProps {
    variant?: "small" | "large";
    className?: string;
  }
  export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
    asChild?: boolean;
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
  export interface ShareDialogProps {
    shortLinkCode: string;
  }
  export interface ContentSubheaderProps {
    breadcrumbs: string[];
    pagePath: string;
  }
  export interface ArticleListProps {
    forMobileSidebar?: boolean;
  }
  export interface FooterProps {
    licenseTextOnly?: boolean;
  }
  export interface MenuItemProps {
    className?: string;
    linkDetails: Globals.LinkProps;
  }
  export interface PageLayoutProps {
    children?: React.ReactNode;
    tocObject: Globals.Data.HeadingNodeProps[];
  }
  export interface SearchDialogInputProps {
    className?: string;
    iconOnly?: boolean;
  }
  export type SheetContentProps = React.ComponentProps<typeof Content> & VariantProps<typeof sheetVariants>;
  export interface SidebarItemProps {
    className?: string;
    children?: string;
    link: string;
  }
  export interface ContentHeadingProps {
    as: "h1" | "h2" | "h3" | "h4" | "h5";
    hasAnchorLink?: boolean;
    className?: string;
    children?: React.ReactNode;
  }
  export interface SubtopicToggleButtonProps {
    subtopicTitle: string;
  }
  export interface SubtopicToggleArticleProps {
    subtopicArticles: Globals.LinkProps[];
  }
  export interface HomepageCardItemProps {
    cardDetails: Globals.Data.HomepageCardProps;
  }
}

export namespace Pages {
  export interface ArticlePageGenerateProps {
    articlePath?: string[];
  }
  export interface ArticlePageAsyncProps {
    params: Promise<ArticlePageGenerateProps>;
  }
}

export namespace Workflows {
  export namespace Prepublish {
    export interface OutputFileProps {
      articleNavFileName: string;
      articleSetFileName: string;
      shortLinkFileName: string;
      titlesFileName: string;
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
