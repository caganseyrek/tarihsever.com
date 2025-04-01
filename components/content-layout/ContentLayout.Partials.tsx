import React from "react";

import { cn } from "@/shared/twUtils";

import type { ComponentTypes } from "@/types/globals";

const ContentRoot = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return <div className={cn("h-full min-h-dvh flex flex-col items-center justify-center", className)}>{children}</div>;
};

const ContentWrapper = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return <main className={cn("flex flex-row items-start justify-start gap-10 p-4", className)}>{children}</main>;
};

const ContentRightSection = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return <section className={cn("flex flex-row items-stretch justify-start gap-10", className)}>{children}</section>;
};

const ContentArticle = ({ children, className }: ComponentTypes.BaseWrapperProps) => {
  return (
    <article className={cn("w-[46rem] text-pretty py-1 min-h-[calc(100vh-259px)]", className)}>{children}</article>
  );
};

export { ContentRoot, ContentWrapper, ContentRightSection, ContentArticle };
