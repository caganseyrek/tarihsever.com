import React from "react";

import Link from "next/link";

import { Button } from "@/components/base/button";

import { cn } from "@/shared/utils";

import type { Components } from "@/types/globals";

const FLEX_STYLES: string = "flex flex-col items-start justify-start";

const SidebarRoot = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <aside
    className={cn(
      "w-[16rem] min-w-[16rem] max-[1200px]:w-[13.5rem] max-[1200px]:min-w-[13.5rem] max-[1000px]:hidden",
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

const SidebarGroupLabel = ({
  children,
  className,
  title,
}: React.HTMLAttributes<HTMLSpanElement> & { title: string }) => (
  <span
    title={title}
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

const SidebarGroupSub = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("border-l ml-3 pl-1.5 mb-2 w-[calc(100%-12px)]", className)} {...props}>
    {children}
  </div>
);

const SidebarItem = ({ link, children, className }: Components.SidebarItemProps) => (
  <Button
    variant="ghost"
    size="default"
    className={cn("w-full justify-start truncate text-muted-foreground", className)}
    title={children}
    asChild>
    <Link href={link}>
      <span className="truncate">{children}</span>
    </Link>
  </Button>
);

export {
  SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupSub,
  SidebarItem,
};
