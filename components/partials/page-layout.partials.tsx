import React from "react";

import { cn } from "@/shared/utils";

const PageLayoutRoot = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("h-full min-h-dvh flex flex-col items-center justify-center gap-y-6", className)} {...props}>
      {children}
    </div>
  );
};

const PageLayoutMain = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <main
      className={cn(
        "flex flex-row items-start justify-start flex-1 gap-10 px-4",
        "max-[1344px]:w-full max-[1050px]:px-6 max-[1050px]:w-[780px] max-[780px]:w-full",
        className,
      )}
      {...props}>
      {children}
    </main>
  );
};

const PageLayoutRightSection = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <section
      className={cn("flex flex-row items-stretch justify-start gap-10", "max-[1344px]:w-full", className)}
      {...props}>
      {children}
    </section>
  );
};

const PageLayoutArticle = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <article className={cn("w-[45rem] text-pretty", "max-[1344px]:w-full", className)} {...props}>
      {children}
    </article>
  );
};

export { PageLayoutRoot, PageLayoutMain, PageLayoutRightSection, PageLayoutArticle };
