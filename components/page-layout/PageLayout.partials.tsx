import React from "react";

import Link from "next/link";

import { cn } from "@/shared/utils";

import type { Components } from "@/types/globals";

const PageRoot = ({ children, className }: Components.BaseWrapperProps) => {
  return (
    <div className={cn("h-full min-h-dvh flex flex-col items-center justify-center gap-y-6", className)}>
      {children}
    </div>
  );
};

const PageWrapper = ({ children, className }: Components.BaseWrapperProps) => {
  return <main className={cn("flex flex-row items-start justify-start gap-10", className)}>{children}</main>;
};

const PageRightSection = ({ children, className }: Components.BaseWrapperProps) => {
  return <section className={cn("flex flex-row items-stretch justify-start gap-10", className)}>{children}</section>;
};

const PageArticle = ({ children, className }: Components.BaseWrapperProps) => {
  return <article className={cn("w-[45rem] text-pretty min-h-[calc(100vh-259px)]", className)}>{children}</article>;
};

const BackToTopButton = ({ children, className }: Components.BaseWrapperProps) => {
  return (
    <Link
      href={"#top"}
      className={cn(
        "w-[720px] border bg-container-background m-auto p-2 rounded-md",
        "text-primary hover:text-primary-lighter transition-colors text-[0.965rem] text-center",
        "flex flex-row items-center justify-center gap-2 [&>svg]:size-4",
        className,
      )}>
      {children}
    </Link>
  );
};

export { PageRoot, PageWrapper, PageRightSection, PageArticle, BackToTopButton };
