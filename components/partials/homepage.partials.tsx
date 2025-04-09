import React from "react";

import Link from "next/link";

import { cn } from "@/shared/utils";

import type { Components } from "@/types/globals";

const HomepageRoot = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "w-full h-dvh flex flex-col items-center justify-center gap-6 p-4 max-[496px]:justify-start",
        className,
      )}
      {...props}>
      {children}
    </div>
  );
};

const HomepageHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex flex-row items-center justify-center gap-2 max-[496px]:py-4", className)} {...props}>
      {children}
    </div>
  );
};

const HomepageHeaderTitleContainer = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex flex-col items-start justify-center", className)} {...props}>
      {children}
    </div>
  );
};

const HomepageHeaderSubtitle = ({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={cn("w-full tracking-tight text-muted-foreground text-xs pl-1 select-none", className)} {...props}>
      {children}
    </span>
  );
};

const HomepageControls = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex flex-row items-start justify-start gap-2 max-[496px]:w-full", className)} {...props}>
      {children}
    </div>
  );
};

const HomepageCardsContainer = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "flex flex-row items-stretch justify-start gap-2 max-[692px]:w-full max-[496px]:flex-col",
        className,
      )}
      {...props}>
      {children}
    </div>
  );
};

const HomepageCardItem = ({ cardDetails }: Components.HomepageCardItemProps) => {
  return (
    <Link
      href={cardDetails.get_redirect_path()}
      className="w-[220px] group border bg-container-background rounded-md flex flex-col items-start justify-start gap-2 p-4 max-[496px]:w-full max-[496px]:flex-row max-[496px]:gap-4">
      <span className="shrink-0 bg-container-inner-item-background rounded-sm border flex items-center justify-center text-primary group-hover:text-primary-lighter transition-colors size-9 [&>svg]:size-5">
        <cardDetails.icon />
      </span>
      <div className="flex flex-col items-start justify-start gap-1">
        <span className="text-lg font-semibold tracking-tight">{cardDetails.title}</span>
        <span className="flex flex-1 text-muted-foreground text-xs">{cardDetails.description}</span>
      </div>
    </Link>
  );
};

export {
  HomepageRoot,
  HomepageHeader,
  HomepageHeaderTitleContainer,
  HomepageHeaderSubtitle,
  HomepageControls,
  HomepageCardsContainer,
  HomepageCardItem,
};
