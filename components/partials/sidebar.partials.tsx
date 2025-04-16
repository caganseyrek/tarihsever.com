import React from "react";

import { cn } from "@/shared/utils";

const FLEX_STYLES: string = "flex flex-col items-start justify-start";

const SidebarRoot = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <aside
    className={cn(
      "w-[16rem] min-w-[16rem] max-[1200px]:w-[13.5rem] max-[1200px]:min-w-[13.5rem] max-[1050px]:hidden",
      FLEX_STYLES,
      className,
    )}
    {...props}>
    {children}
  </aside>
);

const SidebarContent = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("w-full max-w-full min-h-0 gap-8", FLEX_STYLES, className)} {...props}>
    {children}
  </div>
);

const SidebarGroup = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(FLEX_STYLES, "w-full gap-0.5", className)} {...props}>
    {children}
  </div>
);

const SidebarGroupLabel = ({ children, className }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "truncate flex border bg-container-background rounded-md w-full tracking-tight font-medium items-center gap-1.5 px-2.5 py-1.5 mb-0.5 [&>svg]:size-4",
      className,
    )}>
    {children}
  </span>
);

const SidebarGroupContent = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(FLEX_STYLES, "w-full gap-0.5 items-stretch", className)} {...props}>
    {children}
  </div>
);

const SidebarItem = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("", className)} {...props}>
    {children}
  </div>
);

const SidebarItemSub = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("border-l ml-3 pl-1.5 mb-2 w-[calc(100%-12px)]", className)} {...props}>
    {children}
  </div>
);

export {
  SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarItem,
  SidebarItemSub,
};
