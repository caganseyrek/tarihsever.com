import React from "react";

import Link from "next/link";

import { Button } from "@/components/base/button";

import { cn } from "@/shared/utils";

import { Components } from "@/types/globals";

type SidebarItemProps = {
  className?: string;
  children?: string;
  link: string;
};

const FLEX_STYLES: string = "flex flex-col items-start justify-start";

const SidebarRoot = ({ children, className }: Components.BaseWrapperProps) => {
  return <aside className={cn("w-[16rem] min-w-[16rem]", FLEX_STYLES, className)}>{children}</aside>;
};

const SidebarContent = ({ children, className }: Components.BaseWrapperProps) => {
  return <div className={cn("w-full max-w-full min-h-0 gap-8", FLEX_STYLES, className)}>{children}</div>;
};

const SidebarGroup = ({ children, className }: Components.BaseWrapperProps) => {
  return <div className={cn(FLEX_STYLES, "w-full gap-0.5", className)}>{children}</div>;
};

const SidebarGroupLabel = ({ children, className }: Components.BaseWrapperProps) => {
  return (
    <span
      className={cn(
        "flex border bg-container-background rounded-md w-full tracking-tight font-medium items-center gap-1.5 px-2.5 py-1.5 mb-0.5 [&>svg]:size-4",
        className,
      )}>
      {children}
    </span>
  );
};

const SidebarGroupContent = ({ children, className }: Components.BaseWrapperProps) => {
  return <div className={cn(FLEX_STYLES, "w-full gap-0.5 items-stretch", className)}>{children}</div>;
};

const SidebarGroupSub = ({ children, className }: Components.BaseWrapperProps) => {
  return <div className={cn("border-l ml-3 pl-1.5 mb-2 w-[calc(100%-12px)]", className)}>{children}</div>;
};

const SidebarItem = ({ link, children, className }: SidebarItemProps): React.ReactNode => {
  return (
    <Link href={link}>
      <Button
        variant="ghost"
        size="default"
        className={cn("w-full justify-start truncate text-muted-foreground", className)}
        title={children}>
        <span className="truncate">{children}</span>
      </Button>
    </Link>
  );
};

export {
  SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupSub,
  SidebarItem,
};
