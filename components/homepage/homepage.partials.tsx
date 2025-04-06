import React from "react";

import Link from "next/link";

import { cn } from "@/shared/utils";

import type { Components } from "@/types/globals";

const HomepageRoot = ({ children, className }: Components.BaseWrapperProps) => {
  return (
    <div className={cn("w-full h-dvh flex flex-col items-center justify-center gap-6", className)}>{children}</div>
  );
};

const HomepageHeader = ({ children, className }: Components.BaseWrapperProps) => {
  return <div className={cn("flex flex-row items-center justify-center gap-2", className)}>{children}</div>;
};

const HomepageTitleContainer = ({ children, className }: Components.BaseWrapperProps) => {
  return <div className={cn("flex flex-col items-start justify-center", className)}>{children}</div>;
};

const HomepageSubtitle = ({ children, className }: Components.BaseWrapperProps) => {
  return (
    <span className={cn("w-full tracking-tight text-muted-foreground text-xs pl-1 select-none", className)}>
      {children}
    </span>
  );
};

const HomepageControlsContainer = ({ children, className }: Components.BaseWrapperProps) => {
  return <div className={cn("flex flex-row items-start justify-start gap-2", className)}>{children}</div>;
};

const HomepageCardsContainer = ({ children, className }: Components.BaseWrapperProps) => {
  return <div className={cn("flex flex-row items-start justify-start gap-2", className)}>{children}</div>;
};

const HomepageCard = ({ path, children, className }: Components.HomepageCardProps) => {
  return (
    <Link
      href={path}
      className={cn(
        "w-[220px] group border bg-container-background rounded-md flex flex-col items-start justify-start gap-2 p-4",
        className,
      )}>
      {children}
    </Link>
  );
};

const HomepageCardIconContainer = ({ children, className }: Components.BaseWrapperProps) => {
  return (
    <div
      className={cn(
        "bg-container-inner-item-background rounded-sm border flex items-center justify-center text-primary group-hover:text-primary-lighter transition-colors size-9 [&>svg]:size-5",
        className,
      )}>
      {children}
    </div>
  );
};

const HomepageCardTextsContainer = ({ children, className }: Components.BaseWrapperProps) => {
  return <div className={cn("flex flex-col items-start justify-start gap-1", className)}>{children}</div>;
};

const HomepageCardTitle = ({ children, className }: Components.BaseWrapperProps) => {
  return <span className={cn("text-lg font-semibold tracking-tight", className)}>{children}</span>;
};

const HomepageCardDescription = ({ children, className }: Components.BaseWrapperProps) => {
  return <span className={cn("text-muted-foreground text-xs", className)}>{children}</span>;
};

const HomepageFooterContainer = ({ children, className }: Components.BaseWrapperProps) => {
  return <div className={cn("text-muted-foreground", className)}>{children}</div>;
};

export {
  HomepageRoot,
  HomepageHeader,
  HomepageTitleContainer,
  HomepageSubtitle,
  HomepageControlsContainer,
  HomepageCardsContainer,
  HomepageCard,
  HomepageCardIconContainer,
  HomepageCardTextsContainer,
  HomepageCardTitle,
  HomepageCardDescription,
  HomepageFooterContainer,
};
